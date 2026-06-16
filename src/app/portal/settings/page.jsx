import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SettingsView from '@/components/portal/SettingsView';

export const metadata = {
  title: 'Settings · DAO Marketing Portal',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/portal/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return <SettingsView user={user} profile={profile} />;
}
