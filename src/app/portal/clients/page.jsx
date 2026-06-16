// src/app/portal/clients/page.jsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ClientsList from '@/components/portal/ClientsList';

export const metadata = {
  title: 'Clients · DAO Marketing Portal',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function ClientsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/portal/login');

  // Defensive: middleware should have caught non-admin, but double-check
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/portal/dashboard');

  // Fetch all clients with their projects in one query
  // RLS allows admin to read all profiles + all projects
  const { data: clients } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      company,
      email,
      phone,
      created_at,
      projects:projects!projects_client_id_fkey(id, status, updated_at)
    `)
    .in('role', ['client', 'inactive'])
    .order('full_name', { ascending: true });

  // Compute stats client-side from the data
  const enriched = (clients || []).map((c) => {
    const projects = c.projects || [];
    const activeStatuses = ['proposal', 'discovery', 'in_progress', 'review'];
    const activeCount = projects.filter((p) => activeStatuses.includes(p.status)).length;
    const lastActivity = projects.length > 0
      ? projects.reduce((latest, p) => {
          const updated = new Date(p.updated_at);
          return updated > latest ? updated : latest;
        }, new Date(0))
      : null;
    return {
      ...c,
      project_count: projects.length,
      active_count: activeCount,
      last_activity: lastActivity && lastActivity.getTime() > 0 ? lastActivity.toISOString() : null,
      is_active: activeCount > 0,
    };
  });

  // Aggregate stats for the header
  const totalClients = enriched.length;
  const activeClients = enriched.filter((c) => c.is_active).length;
  const totalProjects = enriched.reduce((sum, c) => sum + c.project_count, 0);
  const avgPerClient = totalClients > 0 ? (totalProjects / totalClients).toFixed(1) : '0.0';

  return (
    <ClientsList
      clients={enriched}
      stats={{ totalClients, activeClients, totalProjects, avgPerClient }}
    />
  );
}
