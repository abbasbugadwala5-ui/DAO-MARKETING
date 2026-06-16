// src/app/api/portal/clients/[id]/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

const CLIENT_SELECT = `
  *,
  projects:projects!projects_client_id_fkey(
    id, name, status, progress_percentage, target_date, updated_at, created_at
  )
`;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EDITABLE_FIELDS = ['full_name', 'company', 'email', 'phone'];

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

// GET — fetch a client with their projects
export async function GET(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const auth = await requireAdmin(supabase);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { data: client, error } = await supabase
    .from('profiles')
    .select(CLIENT_SELECT)
    .eq('id', id)
    .in('role', ['client', 'inactive'])
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

  return NextResponse.json({ client });
}

// PATCH — edit client fields (full_name, company, email, phone)
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
  for (const key of EDITABLE_FIELDS) {
    if (!(key in body)) continue;
    let val = body[key];
    if (typeof val === 'string') val = val.trim();
    if (key === 'email') {
      val = val.toLowerCase();
      if (!val) {
        return NextResponse.json({ error: 'Email cannot be empty' }, { status: 422 });
      }
      if (!EMAIL_REGEX.test(val)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 422 });
      }
    }
    if (key === 'full_name' && !val) {
      return NextResponse.json({ error: 'Full name cannot be empty' }, { status: 422 });
    }
    // Empty strings on company/phone become null
    if (val === '' && (key === 'company' || key === 'phone')) val = null;
    patch[key] = val;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'No editable fields provided' }, { status: 400 });
  }

  const admin = createAdminClient();

  // If email is changing, check uniqueness + update auth.users too
  if ('email' in patch) {
    const { data: existing } = await admin
      .from('profiles')
      .select('id')
      .eq('email', patch.email)
      .neq('id', id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: `Email ${patch.email} is already used by another user` },
        { status: 409 }
      );
    }

    // Update auth.users email via admin API
    const { error: authError } = await admin.auth.admin.updateUserById(id, { email: patch.email });
    if (authError) {
      return NextResponse.json(
        { error: `Failed to update auth email: ${authError.message}` },
        { status: 400 }
      );
    }
  }

  const { data: client, error } = await admin
    .from('profiles')
    .update(patch)
    .eq('id', id)
    .select(CLIENT_SELECT)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });
  return NextResponse.json({ client });
}

// DELETE — delete client (refuses if projects exist)
export async function DELETE(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const auth = await requireAdmin(supabase);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const admin = createAdminClient();

  // Check if client has any projects
  const { count, error: countError } = await admin
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('client_id', id);

  if (countError) return NextResponse.json({ error: countError.message }, { status: 400 });
  if (count > 0) {
    return NextResponse.json(
      {
        error: `Cannot delete: this client has ${count} project${count === 1 ? '' : 's'}. Delete or reassign all projects first.`,
      },
      { status: 409 }
    );
  }

  // Delete auth user — this cascades to profile via FK (or we manually delete profile too)
  const { error: authError } = await admin.auth.admin.deleteUser(id);
  if (authError) {
    return NextResponse.json(
      { error: `Failed to delete auth user: ${authError.message}` },
      { status: 400 }
    );
  }

  // Defensive: also try profile delete (in case FK cascade isn't set)
  await admin.from('profiles').delete().eq('id', id);

  return NextResponse.json({ ok: true });
}
