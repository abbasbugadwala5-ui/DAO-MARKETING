// src/app/api/portal/messages/[id]/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const MESSAGE_SELECT = '*, sender:profiles!messages_sender_id_fkey(id, full_name, role, email)';

// PATCH — sender can edit their own message within the 15-min window
// (enforced by RLS policy "messages_update_sender").
export async function PATCH(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const content = (body.content || '').trim();
  if (!content) return NextResponse.json({ error: 'Message cannot be empty' }, { status: 422 });
  if (content.length > 4000) {
    return NextResponse.json({ error: 'Message too long (max 4000 chars)' }, { status: 422 });
  }

  const { data: message, error } = await supabase
    .from('messages')
    .update({ content })
    .eq('id', id)
    .select(MESSAGE_SELECT)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!message) {
    return NextResponse.json(
      { error: 'Cannot edit — message not found, not yours, or older than 15 minutes' },
      { status: 404 }
    );
  }
  return NextResponse.json({ message });
}

// DELETE — admin can delete any; sender can delete own within 15 min
// (enforced by RLS policies "messages_delete_admin" + "messages_delete_sender").
export async function DELETE(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { error, count } = await supabase
    .from('messages')
    .delete({ count: 'exact' })
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!count) {
    return NextResponse.json(
      { error: 'Cannot delete — message not found or not permitted' },
      { status: 404 }
    );
  }
  return NextResponse.json({ ok: true });
}
