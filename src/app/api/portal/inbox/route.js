// src/app/api/portal/inbox/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET — for current user, list unread messages grouped by project.
// RLS auto-scopes: admin sees all projects; client sees only their own + non-internal.
export async function GET() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  const isAdmin = profile?.role === 'admin';

  // Pull all unread messages NOT sent by me.
  // "not contains" array check: read_by !@> [user.id]
  const { data: messages, error } = await supabase
    .from('messages')
    .select(`
      id,
      project_id,
      content,
      is_internal,
      created_at,
      sender:profiles!messages_sender_id_fkey(id, full_name, role),
      project:projects!messages_project_id_fkey(
        id,
        name,
        client:profiles!projects_client_id_fkey(id, full_name, company)
      )
    `)
    .neq('sender_id', user.id)
    .not('read_by', 'cs', `{${user.id}}`)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Group by project
  const byProject = new Map();
  for (const m of messages || []) {
    if (!m.project) continue;
    const key = m.project.id;
    if (!byProject.has(key)) {
      byProject.set(key, {
        project_id: m.project.id,
        project_name: m.project.name,
        client_name: isAdmin ? (m.project.client?.full_name || null) : null,
        client_company: isAdmin ? (m.project.client?.company || null) : null,
        unread_count: 0,
        latest: null,
        items: [],
      });
    }
    const entry = byProject.get(key);
    entry.unread_count += 1;
    entry.items.push({
      id: m.id,
      content: m.content,
      is_internal: m.is_internal,
      created_at: m.created_at,
      sender_name: m.sender?.full_name || null,
      sender_role: m.sender?.role || null,
    });
    // first item in list is the latest because we ordered desc
    if (!entry.latest) entry.latest = entry.items[entry.items.length - 1];
  }

  const conversations = Array.from(byProject.values()).sort(
    (a, b) => new Date(b.latest?.created_at || 0) - new Date(a.latest?.created_at || 0)
  );

  return NextResponse.json({
    total: messages?.length || 0,
    conversations,
  });
}
