// src/app/api/portal/files/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  validateFile,
  buildStoragePath,
  sanitizeFilename,
  STORAGE_BUCKET,
} from '@/lib/portal/file-helpers';

async function requireAuth(supabase) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized', status: 401 };
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single();
  if (!profile) return { error: 'Profile not found', status: 403 };
  return { user, profile };
}

// POST — admin uploads a file to a project
export async function POST(request) {
  const supabase = await createClient();

  const auth = await requireAuth(supabase);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  if (auth.profile.role !== 'admin') {
    return NextResponse.json({ error: 'Only admins can upload files' }, { status: 403 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file');
  const project_id = formData.get('project_id');
  const visibleToClientRaw = formData.get('visible_to_client');
  const visible_to_client = visibleToClientRaw === null
    ? true
    : visibleToClientRaw === 'true' || visibleToClientRaw === '1';

  if (!project_id) {
    return NextResponse.json({ error: 'project_id required' }, { status: 422 });
  }

  const validation = validateFile(file);
  if (validation.error) {
    return NextResponse.json({ error: validation.error }, { status: 422 });
  }

  // Verify project exists
  const { data: project } = await supabase
    .from('projects')
    .select('id, client_id')
    .eq('id', project_id)
    .maybeSingle();

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const storagePath = buildStoragePath(project_id, file.type);
  const cleanFilename = sanitizeFilename(file.name);

  // Convert File to ArrayBuffer for Supabase upload
  const fileBuffer = await file.arrayBuffer();

  // Use admin client for storage operations (bypasses RLS for our explicit policy checks above)
  const admin = createAdminClient();

  // Step 1: Upload to storage
  const { error: uploadError } = await admin.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, fileBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: `Storage upload failed: ${uploadError.message}` },
      { status: 500 }
    );
  }

  // Step 2: Insert metadata row
  const insertRow = {
    project_id,
    uploaded_by: auth.user.id,
    filename: cleanFilename,
    storage_path: storagePath,
    file_type: file.type,
    size_bytes: file.size,
    visible_to_client,
  };

  const { data: fileRow, error: insertError } = await admin
    .from('files')
    .insert(insertRow)
    .select()
    .single();

  if (insertError) {
    // Rollback: delete the uploaded file from storage
    await admin.storage.from(STORAGE_BUCKET).remove([storagePath]);
    return NextResponse.json(
      { error: `Metadata insert failed: ${insertError.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ file: fileRow }, { status: 201 });
}

// GET — list files for a project
// Admin sees all; client sees only files where visible_to_client = true AND project.client_id = self
export async function GET(request) {
  const supabase = await createClient();

  const auth = await requireAuth(supabase);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { searchParams } = new URL(request.url);
  const project_id = searchParams.get('project_id');

  if (!project_id) {
    return NextResponse.json({ error: 'project_id query parameter required' }, { status: 422 });
  }

  // Verify project exists and access
  const { data: project } = await supabase
    .from('projects')
    .select('id, client_id')
    .eq('id', project_id)
    .maybeSingle();

  if (!project) {
    return NextResponse.json({ error: 'Project not found or no access' }, { status: 404 });
  }

  // If client, verify project belongs to them
  if (auth.profile.role !== 'admin' && project.client_id !== auth.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let query = supabase
    .from('files')
    .select('id, filename, file_type, size_bytes, visible_to_client, created_at, uploaded_by')
    .eq('project_id', project_id)
    .order('created_at', { ascending: false });

  // Client filter: only visible files
  if (auth.profile.role !== 'admin') {
    query = query.eq('visible_to_client', true);
  }

  const { data: files, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ files: files || [] });
}
