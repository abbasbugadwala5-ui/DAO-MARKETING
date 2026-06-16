// src/app/api/portal/projects/[id]/messages/mark-read/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// POST — mark all messages in this project as read by the current user.
// Appends user.id to read_by for any unread rows the current user can see.
export async function POST(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Use admin client so we can update read_by on rows the user has SELECT access to
  // but no UPDATE policy on (we're not changing any other column).
  const admin = createAdminClient();

  // Find all messages in this project NOT sent by current user AND not yet read by them.
  // RLS isn't on admin client, so first scope to messages user can SEE:
  // - if user is admin (sees all)
  // - if user is owner of the project (client)
  // Simplest: only mark non-internal messages OR messages where user is admin

  const { data: profile } = await admin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  const isAdmin = profile?.role === 'admin';

  // Verify access: admin can access any project; client only their own
  if (!isAdmin) {
    const { data: proj } = await admin
      .from('projects')
      .select('client_id')
      .eq('id', id)
      .maybeSingle();
    if (!proj || proj.client_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  // Build the filter: client cannot mark internal messages
  let query = admin
    .from('messages')
    .select('id, read_by')
    .eq('project_id', id)
    .neq('sender_id', user.id)
    .not('read_by', 'cs', `{${user.id}}`);
  if (!isAdmin) query = query.eq('is_internal', false);

  const { data: rows, error: findError } = await query;
  if (findError) return NextResponse.json({ error: findError.message }, { status: 400 });

  if (!rows || rows.length === 0) {
    return NextResponse.json({ ok: true, marked: 0 });
  }

  // Append user.id to read_by for each row
  // (small batch — fine to loop; for scale use a function)
  let marked = 0;
  for (const row of rows) {
    const newReadBy = [...(row.read_by || []), user.id];
    const { error: updateError } = await admin
      .from('messages')
      .update({ read_by: newReadBy })
      .eq('id', row.id);
    if (!updateError) marked += 1;
  }

  return NextResponse.json({ ok: true, marked });
}
