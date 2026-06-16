// src/app/api/portal/projects/[id]/updates/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const UPDATE_SELECT = '*, author:profiles!updates_posted_by_fkey(full_name)';

// POST — admin posts a new update to this project.
export async function POST(request, { params }) {
  const { id } = await params; // project id
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const title = (body.title || '').trim();
  const content = (body.content || '').trim();
  // Defaults to visible. Pass false to keep an update internal-only.
  const visible_to_client = body.visible_to_client !== false;

  if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 422 });
  if (!content) return NextResponse.json({ error: 'Content is required' }, { status: 422 });

  const { data: update, error } = await supabase
    .from('updates')
    .insert({ project_id: id, posted_by: user.id, title, content, visible_to_client })
    .select(UPDATE_SELECT)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ update }, { status: 201 });
}
