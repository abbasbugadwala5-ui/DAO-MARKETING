'use client';

import Link from 'next/link';
import StatusBadge from './StatusBadge';

export default function AdminDashboard({ projects, profile }) {
  const serifItalic = { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' };
  const display = { fontFamily: "'Bodoni Moda', serif" };
  const sans = { fontFamily: "'Schibsted Grotesk', sans-serif" };

  const activeCount = projects.filter(p => ['proposal', 'discovery', 'in_progress', 'review'].includes(p.status)).length;
  const completedCount = projects.filter(p => p.status === 'completed' || p.status === 'delivered').length;
  const onHoldCount = projects.filter(p => p.status === 'on_hold').length;

  const stats = [
    { label: 'Active projects', value: activeCount },
    { label: 'Delivered / completed', value: completedCount },
    { label: 'On hold', value: onHoldCount },
    { label: 'All projects', value: projects.length },
  ];

  const firstName = profile.full_name?.split(' ')[0] || 'Admin';

  return (
    <div className="p-8 lg:p-12">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-[#D4B27A]/15">
        <div style={sans} className="text-[10px] uppercase tracking-[0.3em] text-[#D4B27A] mb-3">
          Admin · Dashboard
        </div>
        <h1 style={serifItalic} className="text-4xl md:text-5xl text-[#F5E9D1] mb-2">
          Welcome back, {firstName}<span className="text-[#D4B27A]">.</span>
        </h1>
        <p style={sans} className="text-[#F5E9D1]/60">
          Everything happening across DAO right now.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#D4B27A]/15 border border-[#D4B27A]/15 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#0A0908] p-6">
            <div style={sans} className="text-[10px] uppercase tracking-[0.2em] text-[#F5E9D1]/40 mb-3">
              {stat.label}
            </div>
            <div style={{ ...display, fontStyle: 'italic' }} className="text-5xl text-[#D4B27A]">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Projects header */}
      <div className="flex justify-between items-end mb-6">
        <h2 style={serifItalic} className="text-2xl text-[#F5E9D1]">All projects</h2>
        <button
          disabled
          title="Coming in Phase 3"
          style={sans}
          className="text-xs uppercase tracking-[0.2em] text-[#D4B27A]/40 border border-[#D4B27A]/20 px-5 py-2.5 cursor-not-allowed"
        >
          + New project (Phase 3)
        </button>
      </div>

      {/* Projects list */}
      <div className="space-y-px bg-[#D4B27A]/10">
        {projects.length === 0 && (
          <div className="bg-[#0A0908] p-16 text-center">
            <p style={{ ...serifItalic, color: 'rgba(245, 233, 209, 0.4)' }} className="text-xl">
              No projects yet.
            </p>
          </div>
        )}

        {projects.map((project, i) => (
          <Link
            key={project.id}
            href={`/portal/projects/${project.id}`}
            className="block bg-[#0A0908] hover:bg-[#13110D] transition-colors p-6 group"
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              <div style={sans} className="col-span-1 text-xs text-[#D4B27A]/60">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="col-span-12 md:col-span-4">
                <div style={serifItalic} className="text-xl text-[#F5E9D1] group-hover:text-[#D4B27A] transition-colors mb-1">
                  {project.name}
                </div>
                <div style={sans} className="text-[10px] uppercase tracking-[0.2em] text-[#F5E9D1]/50">
                  {project.client?.company || project.client?.full_name || 'Unknown client'}
                </div>
              </div>

              <div className="col-span-6 md:col-span-2">
                <StatusBadge status={project.status} />
              </div>

              <div className="col-span-6 md:col-span-3">
                <div style={sans} className="text-[10px] uppercase tracking-[0.2em] text-[#F5E9D1]/40 mb-1">
                  Progress
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-[#F5E9D1]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4B27A] to-[#E5BB5C] transition-all duration-1000"
                      style={{ width: `${project.progress_percentage || 0}%` }}
                    />
                  </div>
                  <div style={sans} className="text-xs text-[#D4B27A]">
                    {project.progress_percentage || 0}%
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-2 md:text-right">
                <div style={sans} className="text-[10px] uppercase tracking-[0.2em] text-[#F5E9D1]/40">
                  Updated
                </div>
                <div style={serifItalic} className="text-sm text-[#F5E9D1]/70">
                  {new Date(project.updated_at).toLocaleDateString('en-AE', { day: 'numeric', month: 'short' })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
