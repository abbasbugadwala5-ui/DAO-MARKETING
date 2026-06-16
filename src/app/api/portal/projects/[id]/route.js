// src/app/api/portal/projects/[id]/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { PROJECT_STATUSES } from '@/lib/portal/constants';
import { STORAGE_BUCKET } from '@/lib/portal/file-helpers';

const PROJECT_SELECT = `
  *,
  client:profiles!projects_client_id_fkey(id, full_name, company, email, phone),
  milestones(*),
  updates(*, author:profiles!updates_posted_by_fkey(full_name))
`;

async function requireAdmin(supabase) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized', status: 401 };
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin') return { error: 'Forbidden', status: 403 };
  return { user };
}

// GET — RLS scopes the row automatically: admin sees any, client only their own.
export async function GET(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: project, error } = await supabase
    .from('projects')
    .select(PROJECT_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ project });
}

const EDITABLE = [
  'name', 'description', 'service_type', 'status',
  'progress_percentage', 'start_date', 'target_date', 'completed_date',
  'budget_range', 'budget_currency', 'notes_internal', 'cover_image_url',
];
const DATE_FIELDS = ['start_date', 'target_date', 'completed_date'];

// PATCH — admin-only inline edit of project fields.
export async function PATCH(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const auth = await requireAdmin(supabase);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const patch = {};
  for (const key of EDITABLE) {
    if (!(key in body)) continue;
    let val = body[key];

    if (key === 'status') {
      if (!PROJECT_STATUSES.includes(val)) {
        return NextResponse.json({ error: `Invalid status: ${val}` }, { status: 422 });
      }
    } else if (key === 'progress_percentage') {
      val = Math.max(0, Math.min(100, parseInt(val, 10) || 0));
    } else if (DATE_FIELDS.includes(key)) {
      val = val === '' || val == null ? null : val;
    } else {
      if (typeof val === 'string') val = val.trim();
      if (val === '' && key !== 'name') val = null;
    }
    patch[key] = val;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'No editable fields provided' }, { status: 400 });
  }
  if ('name' in patch && (!patch.name || !patch.name.trim())) {
    return NextResponse.json({ error: 'Project name cannot be empty' }, { status: 422 });
  }

  const { data: project, error } = await supabase
    .from('projects')
    .update(patch)
    .eq('id', id)
    .select(PROJECT_SELECT)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ project });
}

// DELETE — admin-only. Cascades: storage files → files rows → updates → milestones → project.
export async function DELETE(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const auth = await requireAdmin(supabase);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const admin = createAdminClient();

  // Confirm project exists
  const { data: project, error: findError } = await admin
    .from('projects')
    .select('id, name')
    .eq('id', id)
    .maybeSingle();
  if (findError) return NextResponse.json({ error: findError.message }, { status: 400 });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // 1. Delete files from Storage (collect storage_paths first)
  const { data: fileRows, error: filesListError } = await admin
    .from('files')
    .select('storage_path')
    .eq('project_id', id);
  if (filesListError) {
    return NextResponse.json({ error: `Failed to list files: ${filesListError.message}` }, { status: 400 });
  }

  if (fileRows && fileRows.length > 0) {
    const paths = fileRows.map((r) => r.storage_path).filter(Boolean);
    if (paths.length > 0) {
      const { error: storageError } = await admin.storage.from(STORAGE_BUCKET).remove(paths);
      if (storageError) {
        return NextResponse.json(
          { error: `Failed to delete storage objects: ${storageError.message}` },
          { status: 400 }
        );
      }
    }
  }

  // 2. Delete DB rows in cascade-safe order (children before parent)
  const childTables = ['files', 'updates', 'milestones'];
  for (const table of childTables) {
    const { error: childError } = await admin.from(table).delete().eq('project_id', id);
    if (childError) {
      return NextResponse.json(
        { error: `Failed to delete ${table}: ${childError.message}` },
        { status: 400 }
      );
    }
  }

  // 3. Delete the project itself
  const { error: projectError } = await admin.from('projects').delete().eq('id', id);
  if (projectError) {
    return NextResponse.json({ error: projectError.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, deleted: { id, name: project.name } });
}
