// src/app/portal/projects/new/page.jsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import NewProjectForm from '@/components/portal/NewProjectForm';

export const metadata = {
  title: 'New Project · DAO Marketing Portal',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function NewProjectPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/portal/login');

  // Check admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/portal/dashboard');

  // Fetch clients for dropdown
  const { data: clients } = await supabase
    .from('profiles')
    .select('id, full_name, company, email')
    .eq('role', 'client')
    .order('full_name', { ascending: true });

  return <NewProjectForm clients={clients || []} />;
}
