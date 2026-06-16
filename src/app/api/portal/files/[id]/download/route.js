// src/app/api/portal/files/[id]/download/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { STORAGE_BUCKET, SIGNED_URL_EXPIRY_SECONDS } from '@/lib/portal/file-helpers';

export async function GET(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 403 });
  }

  // Fetch file with project info for access check
  const { data: file } = await supabase
    .from('files')
    .select(`
      id,
      filename,
      storage_path,
      visible_to_client,
      project:projects!files_project_id_fkey(id, client_id)
    `)
    .eq('id', id)
    .maybeSingle();

  if (!file) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  // Access check:
  // - Admin: always allowed
  // - Client: must own the project AND file must be visible_to_client
  if (profile.role !== 'admin') {
    if (file.project?.client_id !== profile.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    if (!file.visible_to_client) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  // Generate signed URL
  const admin = createAdminClient();
  const { data: signed, error } = await admin.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(file.storage_path, SIGNED_URL_EXPIRY_SECONDS, {
      download: file.filename,
    });

  if (error || !signed?.signedUrl) {
    return NextResponse.json(
      { error: `Failed to generate download URL: ${error?.message || 'unknown'}` },
      { status: 500 }
    );
  }

  return NextResponse.json({
    url: signed.signedUrl,
    filename: file.filename,
    expires_in: SIGNED_URL_EXPIRY_SECONDS,
  });
}
