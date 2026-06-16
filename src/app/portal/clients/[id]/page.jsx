// src/app/portal/clients/[id]/page.jsx
import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ClientDetailAdmin from '@/components/portal/ClientDetailAdmin';

export const metadata = {
  title: 'Client · DAO Marketing Portal',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function ClientDetailPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/portal/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin') redirect('/portal/dashboard');

  const { data: client } = await supabase
    .from('profiles')
    .select(`
      *,
      projects:projects!projects_client_id_fkey(
        id, name, status, progress_percentage, target_date, updated_at, created_at
      )
    `)
    .eq('id', id)
    .in('role', ['client', 'inactive'])
    .maybeSingle();

  if (!client) notFound();

  return <ClientDetailAdmin client={client} />;
}
