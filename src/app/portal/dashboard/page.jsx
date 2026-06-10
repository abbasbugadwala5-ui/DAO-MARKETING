import { createClient } from '@/lib/supabase/server';
import AdminDashboard from '@/components/portal/AdminDashboard';
import ClientDashboard from '@/components/portal/ClientDashboard';

export const metadata = {
  title: 'Dashboard · DAO Marketing Portal',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role === 'admin') {
    const { data: projects } = await supabase
      .from('projects')
      .select(`
        *,
        client:profiles!projects_client_id_fkey(id, full_name, company, email),
        milestones(id, status),
        updates(id, created_at)
      `)
      .order('updated_at', { ascending: false });

    return <AdminDashboard projects={projects || []} profile={profile} />;
  }

  // Client view
  const { data: projects } = await supabase
    .from('projects')
    .select(`
      *,
      milestones(*),
      updates(*, posted_by:profiles!updates_posted_by_fkey(full_name))
    `)
    .eq('client_id', user.id)
    .order('updated_at', { ascending: false });

  return <ClientDashboard projects={projects || []} profile={profile} />;
}
