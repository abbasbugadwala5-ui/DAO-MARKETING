// src/app/api/portal/projects/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PROJECT_STATUSES } from '@/lib/portal/constants';

const PROJECT_SELECT = `
  *,
  client:profiles!projects_client_id_fkey(id, full_name, company, email, phone)
`;

const DATE_FIELDS = ['start_date', 'target_date', 'completed_date'];

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

// POST — admin creates a new project.
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

  // Required fields
  const name = (body.name || '').trim();
  const client_id = body.client_id;

  if (!name) return NextResponse.json({ error: 'Project name is required' }, { status: 422 });
  if (!client_id) return NextResponse.json({ error: 'Client is required' }, { status: 422 });

  // Verify client_id is actually a client (not admin or invalid)
  const { data: clientProfile, error: clientErr } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', client_id)
    .maybeSingle();

  if (clientErr) return NextResponse.json({ error: clientErr.message }, { status: 400 });
  if (!clientProfile) return NextResponse.json({ error: 'Selected client does not exist' }, { status: 422 });
  if (clientProfile.role !== 'client') return NextResponse.json({ error: 'Selected user is not a client' }, { status: 422 });

  // Build insert payload — only writeable fields
  const insert = { name, client_id };

  // Optional fields
  if ('description' in body) {
    const v = (body.description || '').trim();
    insert.description = v || null;
  }
  if ('service_type' in body) {
    const v = (body.service_type || '').trim();
    insert.service_type = v || null;
  }
  if ('status' in body) {
    if (body.status && !PROJECT_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: `Invalid status: ${body.status}` }, { status: 422 });
    }
    insert.status = body.status || 'proposal';
  } else {
    insert.status = 'proposal';
  }
  if ('progress_percentage' in body) {
    insert.progress_percentage = Math.max(0, Math.min(100, parseInt(body.progress_percentage, 10) || 0));
  } else {
    insert.progress_percentage = 0;
  }
  for (const f of DATE_FIELDS) {
    if (f in body) {
      insert[f] = body[f] === '' || body[f] == null ? null : body[f];
    }
  }
  if ('budget_range' in body) {
    const v = (body.budget_range || '').trim();
    insert.budget_range = v || null;
  }
  if ('budget_currency' in body) {
    const v = (body.budget_currency || '').trim();
    insert.budget_currency = v || 'AED';
  } else {
    insert.budget_currency = 'AED';
  }
  if ('notes_internal' in body) {
    const v = (body.notes_internal || '').trim();
    insert.notes_internal = v || null;
  }

  const { data: project, error } = await supabase
    .from('projects')
    .insert(insert)
    .select(PROJECT_SELECT)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ project }, { status: 201 });
}
