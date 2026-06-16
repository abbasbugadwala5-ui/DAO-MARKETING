// src/app/portal/inbox/page.jsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import InboxView from '@/components/portal/InboxView';

export const dynamic = 'force-dynamic';

export default async function InboxPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/portal/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.role === 'admin';

  return <InboxView isAdmin={isAdmin} currentUserId={user.id} />;
}
