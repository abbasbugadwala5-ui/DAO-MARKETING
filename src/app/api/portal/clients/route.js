// src/app/api/portal/clients/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Word lists for memorable password generation
// Curated for: easy to spell, easy to pronounce, no offensive/ambiguous words, all positive/neutral
const PASSWORD_ADJECTIVES = [
  'bright', 'happy', 'quick', 'smooth', 'gold', 'royal', 'noble', 'sharp',
  'swift', 'calm', 'bold', 'kind', 'wise', 'fair', 'pure', 'true',
  'free', 'strong', 'clear', 'clean', 'fresh', 'warm', 'cool', 'safe',
  'rich', 'firm', 'soft', 'fine', 'rare', 'open', 'silver', 'crystal',
];

const PASSWORD_NOUNS = [
  'lion', 'eagle', 'falcon', 'tiger', 'pearl', 'river', 'mountain', 'star',
  'moon', 'sun', 'mango', 'lotus', 'sword', 'crown', 'forest', 'ocean',
  'thunder', 'phoenix', 'comet', 'meadow', 'harbor', 'castle', 'arrow', 'temple',
  'garden', 'dragon', 'pearl', 'amber', 'cedar', 'maple', 'breeze', 'horizon',
];

function generateSecurePassword() {
  const adj = PASSWORD_ADJECTIVES[crypto.randomInt(0, PASSWORD_ADJECTIVES.length)];
  const noun = PASSWORD_NOUNS[crypto.randomInt(0, PASSWORD_NOUNS.length)];
  const num = crypto.randomInt(10, 99); // 2-digit number (10-98)

  // Capitalize first letter of each word for readability
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  return `${cap(adj)}${cap(noun)}${num}`;
}

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

// Simple email regex — server-side validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const full_name = (body.full_name || '').trim();
  const email = (body.email || '').trim().toLowerCase();
  const company = (body.company || '').trim();
  const phone = (body.phone || '').trim();

  if (!full_name) return NextResponse.json({ error: 'Full name is required' }, { status: 422 });
  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 422 });
  if (!EMAIL_REGEX.test(email)) return NextResponse.json({ error: 'Invalid email format' }, { status: 422 });

  const admin = createAdminClient();

  // Check email uniqueness in profiles
  const { data: existingProfile } = await admin
    .from('profiles')
    .select('id, email')
    .eq('email', email)
    .maybeSingle();

  if (existingProfile) {
    return NextResponse.json(
      { error: `A user with email ${email} already exists` },
      { status: 409 }
    );
  }

  // Generate secure password
  const password = generateSecurePassword();

  // Step 1: Create auth user via admin API
  // email_confirm: true skips the verification step
  // The admin API properly initializes confirmation_token, recovery_token, etc. to empty strings
  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name },
  });

  if (authError) {
    // Common errors: email already exists in auth (but not in profiles — orphan)
    return NextResponse.json(
      { error: authError.message || 'Failed to create auth user' },
      { status: 400 }
    );
  }

  if (!authData?.user?.id) {
    return NextResponse.json({ error: 'Auth user creation returned no user' }, { status: 500 });
  }

  const newUserId = authData.user.id;

  // Step 2: Create matching profile row
  const profileInsert = {
    id: newUserId,
    email,
    full_name,
    role: 'client',
  };
  if (company) profileInsert.company = company;
  if (phone) profileInsert.phone = phone;

  const { data: profile, error: profileError } = await admin
    .from('profiles')
    .insert(profileInsert)
    .select()
    .single();

  if (profileError) {
    // Rollback: delete the orphan auth user
    await admin.auth.admin.deleteUser(newUserId);
    return NextResponse.json(
      { error: `Profile creation failed: ${profileError.message}` },
      { status: 400 }
    );
  }

  // Success — return profile + the generated password (one-time display)
  return NextResponse.json(
    {
      profile,
      credentials: {
        email,
        password, // Only sent in this response, never stored or logged
      },
    },
    { status: 201 }
  );
}
