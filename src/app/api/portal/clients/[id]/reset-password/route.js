// src/app/api/portal/clients/[id]/reset-password/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Replicated from Phase 4b — keep modules independent
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
  'garden', 'dragon', 'amber', 'cedar', 'maple', 'breeze', 'horizon', 'ember',
];

function generateMemorablePassword() {
  const adj = PASSWORD_ADJECTIVES[crypto.randomInt(0, PASSWORD_ADJECTIVES.length)];
  const noun = PASSWORD_NOUNS[crypto.randomInt(0, PASSWORD_NOUNS.length)];
  const num = crypto.randomInt(10, 99);
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  return `${cap(adj)}${cap(noun)}${num}`;
}

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
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const admin = createAdminClient();

  // Verify target user exists + get email
  const { data: targetProfile } = await admin
    .from('profiles')
    .select('id, email')
    .eq('id', id)
    .in('role', ['client', 'inactive'])
    .maybeSingle();

  if (!targetProfile) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 });
  }

  // Generate new password
  const newPassword = generateMemorablePassword();

  // Update password via admin API
  const { error: updateError } = await admin.auth.admin.updateUserById(id, {
    password: newPassword,
  });

  if (updateError) {
    return NextResponse.json(
      { error: `Failed to reset password: ${updateError.message}` },
      { status: 400 }
    );
  }

  // Invalidate all existing sessions for this user (force re-login)
  // Note: admin.auth.admin.signOut() requires a JWT; instead we just rely on
  // password change naturally invalidating sessions on next token refresh.
  // For explicit invalidation, we'd need a separate call which isn't critical here.

  return NextResponse.json({
    credentials: {
      email: targetProfile.email,
      password: newPassword,
    },
  });
}
