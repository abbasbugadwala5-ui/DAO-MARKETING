// src/app/api/portal/milestones/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { MILESTONE_STATUSES } from '@/lib/portal/constants';

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

export async function POST(request) {
  const supabase = await createClient();

  const auth = await requireAdmin(supabase);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const project_id = body.project_id;
  const title = (body.title || '').trim();

  if (!project_id) return NextResponse.json({ error: 'project_id required' }, { status: 422 });
  if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 422 });

  // Compute next order_index for this project
  const { data: existing } = await supabase
    .from('milestones')
    .select('order_index')
    .eq('project_id', project_id)
    .order('order_index', { ascending: false })
    .limit(1);

  const nextOrder = existing && existing.length > 0 ? existing[0].order_index + 1 : 1;

  const insert = { project_id, title, order_index: nextOrder };

  if ('description' in body) {
    const d = (body.description || '').trim();
    insert.description = d || null;
  }
  if ('status' in body && body.status) {
    if (!MILESTONE_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: `Invalid status: ${body.status}` }, { status: 422 });
    }
    insert.status = body.status;
    if (body.status === 'completed') {
      insert.completed_at = new Date().toISOString();
    }
  }
  if ('due_date' in body) {
    insert.due_date = body.due_date || null;
  }

  const { data: milestone, error } = await supabase
    .from('milestones')
    .insert(insert)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ milestone }, { status: 201 });
}
