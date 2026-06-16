// src/app/api/portal/updates/[id]/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const UPDATE_SELECT = '*, author:profiles!updates_posted_by_fkey(full_name)';

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

// PATCH — edit an existing update.
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
  if ('title' in body) {
    const t = (body.title || '').trim();
    if (!t) return NextResponse.json({ error: 'Title cannot be empty' }, { status: 422 });
    patch.title = t;
  }
  if ('content' in body) {
    const c = (body.content || '').trim();
    if (!c) return NextResponse.json({ error: 'Content cannot be empty' }, { status: 422 });
    patch.content = c;
  }
  if ('visible_to_client' in body) {
    patch.visible_to_client = !!body.visible_to_client;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const { data: update, error } = await supabase
    .from('updates')
    .update(patch)
    .eq('id', id)
    .select(UPDATE_SELECT)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!update) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ update });
}

// DELETE — remove an update.
export async function DELETE(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const auth = await requireAdmin(supabase);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { error } = await supabase.from('updates').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
