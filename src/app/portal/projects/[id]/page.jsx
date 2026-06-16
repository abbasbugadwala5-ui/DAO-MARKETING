// src/app/portal/projects/[id]/page.jsx
import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProjectDetailAdmin from '@/components/portal/ProjectDetailAdmin';
import ProjectDetailClient from '@/components/portal/ProjectDetailClient';

export const dynamic = 'force-dynamic';

const VALID_TABS = ['overview', 'updates', 'milestones', 'files', 'chat'];

export default async function ProjectDetailPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const initialTab = VALID_TABS.includes(sp?.tab) ? sp.tab : 'overview';
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/portal/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // One query works for both roles — RLS returns the row to an admin, or to the
  // owning client only. For updates, RLS also hides any visible_to_client = false
  // rows from clients automatically, so the client view never has to filter.
  const { data: project } = await supabase
    .from('projects')
    .select(`
      *,
      client:profiles!projects_client_id_fkey(id, full_name, company, email, phone),
      milestones(*),
      updates(*, author:profiles!updates_posted_by_fkey(full_name))
    `)
    .eq('id', id)
    .maybeSingle();

  // Null = no access (client opened someone else's project) or doesn't exist.
  if (!project) notFound();

  const milestones = [...(project.milestones || [])].sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );
  const updates = [...(project.updates || [])].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const isAdmin = profile?.role === 'admin';

  return isAdmin ? (
    <ProjectDetailAdmin project={project} milestones={milestones} updates={updates} profile={profile} initialTab={initialTab} />
  ) : (
    <ProjectDetailClient project={project} milestones={milestones} updates={updates} profile={profile} initialTab={initialTab} />
  );
}
