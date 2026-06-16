// src/app/api/portal/milestones/[id]/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { MILESTONE_STATUSES } from '@/lib/portal/constants';

const EDITABLE = ['title', 'description', 'status', 'due_date', 'order_index'];

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

  const { data: existing, error: fetchErr } = await supabase
    .from('milestones')
    .select('id, status')
    .eq('id', id)
    .maybeSingle();

  if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 400 });
  if (!existing) return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });

  const patch = {};
  for (const key of EDITABLE) {
    if (!(key in body)) continue;
    let val = body[key];
    if (key === 'title') {
      val = (val || '').trim();
      if (!val) return NextResponse.json({ error: 'Title cannot be empty' }, { status: 422 });
    }
    if (key === 'description') {
      val = val ? val.trim() : '';
      if (val === '') val = null;
    }
    if (key === 'status') {
      if (!MILESTONE_STATUSES.includes(val)) {
        return NextResponse.json({ error: `Invalid status: ${val}` }, { status: 422 });
      }
    }
    if (key === 'due_date') {
      if (val === '' || val == null) val = null;
    }
    if (key === 'order_index') {
      val = parseInt(val, 10);
      if (Number.isNaN(val)) {
        return NextResponse.json({ error: 'order_index must be integer' }, { status: 422 });
      }
    }
    patch[key] = val;
  }

  if ('status' in patch) {
    if (patch.status === 'completed' && existing.status !== 'completed') {
      patch.completed_at = new Date().toISOString();
    } else if (patch.status !== 'completed' && existing.status === 'completed') {
      patch.completed_at = null;
    }
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'No editable fields provided' }, { status: 400 });
  }

  const { data: milestone, error } = await supabase
    .from('milestones')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ milestone });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const auth = await requireAdmin(supabase);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { error } = await supabase
    .from('milestones')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
