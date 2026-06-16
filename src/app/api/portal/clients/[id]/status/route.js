// src/app/api/portal/clients/[id]/status/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function PATCH(request, { params }) {
  const { id } = await params;
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

  const action = body.action; // 'deactivate' or 'reactivate'
  if (!['deactivate', 'reactivate'].includes(action)) {
    return NextResponse.json({ error: 'action must be "deactivate" or "reactivate"' }, { status: 422 });
  }

  const newRole = action === 'deactivate' ? 'inactive' : 'client';

  const admin = createAdminClient();
  const { data: updated, error } = await admin
    .from('profiles')
    .update({ role: newRole })
    .eq('id', id)
    .in('role', ['client', 'inactive']) // only toggle clients, never admins
    .select()
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!updated) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

  return NextResponse.json({ client: updated });
}
