// src/app/portal/clients/new/page.jsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import NewClientForm from '@/components/portal/NewClientForm';

export const metadata = {
  title: 'New Client · DAO Marketing Portal',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function NewClientPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/portal/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/portal/dashboard');

  return <NewClientForm />;
}
