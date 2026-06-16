// src/app/api/portal/files/[id]/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { STORAGE_BUCKET } from '@/lib/portal/file-helpers';

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

// PATCH — toggle visibility (admin-only)
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

  if (typeof body.visible_to_client !== 'boolean') {
    return NextResponse.json(
      { error: 'visible_to_client must be a boolean' },
      { status: 422 }
    );
  }

  const admin = createAdminClient();
  const { data: file, error } = await admin
    .from('files')
    .update({ visible_to_client: body.visible_to_client })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!file) return NextResponse.json({ error: 'File not found' }, { status: 404 });

  return NextResponse.json({ file });
}

// DELETE — remove file from storage + DB (admin-only)
export async function DELETE(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const auth = await requireAdmin(supabase);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const admin = createAdminClient();

  // Fetch file to get storage_path
  const { data: file } = await admin
    .from('files')
    .select('id, storage_path')
    .eq('id', id)
    .maybeSingle();

  if (!file) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  // Step 1: Delete from storage
  const { error: storageError } = await admin.storage
    .from(STORAGE_BUCKET)
    .remove([file.storage_path]);

  if (storageError) {
    return NextResponse.json(
      { error: `Storage deletion failed: ${storageError.message}` },
      { status: 500 }
    );
  }

  // Step 2: Delete DB row
  const { error: dbError } = await admin
    .from('files')
    .delete()
    .eq('id', id);

  if (dbError) {
    // Storage already deleted — log but don't roll back (orphan storage is safer than orphan row)
    return NextResponse.json(
      { error: `DB row deletion failed (storage already removed): ${dbError.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
