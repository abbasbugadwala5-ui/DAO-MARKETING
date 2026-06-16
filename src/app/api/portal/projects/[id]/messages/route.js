// src/app/api/portal/projects/[id]/messages/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const MESSAGE_SELECT = '*, sender:profiles!messages_sender_id_fkey(id, full_name, role, email)';

// GET — list all messages for a project (RLS auto-scopes admin vs client).
export async function GET(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: messages, error } = await supabase
    .from('messages')
    .select(MESSAGE_SELECT)
    .eq('project_id', id)
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ messages: messages || [] });
}

// POST — send a message in this project.
//   Admin: may set is_internal=true (note hidden from client).
//   Client: is_internal always forced false.
export async function POST(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  const isAdmin = profile?.role === 'admin';

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

  const is_internal = isAdmin ? !!body.is_internal : false;

  const { data: message, error } = await supabase
    .from('messages')
    .insert({
      project_id: id,
      sender_id: user.id,
      content,
      is_internal,
      read_by: [user.id], // sender has implicitly "read" their own message
    })
    .select(MESSAGE_SELECT)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message }, { status: 201 });
}
