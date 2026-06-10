'use client';

import StatusBadge from './StatusBadge';
import MilestoneTimeline from './MilestoneTimeline';
import UpdatesFeed from './UpdatesFeed';

export default function ClientDashboard({ projects, profile }) {
  const serifItalic = { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' };
  const display = { fontFamily: "'Bodoni Moda', serif" };
  const sans = { fontFamily: "'Schibsted Grotesk', sans-serif" };

  const primaryProject = projects[0];
  const firstName = profile.full_name?.split(' ')[0] || 'there';

  if (!primaryProject) {
    return (
      <div className="p-12 lg:p-16">
        <div style={sans} className="text-[10px] uppercase tracking-[0.3em] text-[#D4B27A] mb-3">
          Your portal
        </div>
        <h1 style={serifItalic} className="text-4xl text-[#F5E9D1] mb-6">
          Welcome, {firstName}<span className="text-[#D4B27A]">.</span>
        </h1>
        <p style={{ ...serifItalic, color: 'rgba(245, 233, 209, 0.6)' }} className="text-xl">
          No active projects yet. We'll set one up shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#D4B27A]/15">
        <div style={sans} className="text-[10px] uppercase tracking-[0.3em] text-[#D4B27A] mb-3">
          {profile.company || 'Your project'}
        </div>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h1 style={serifItalic} className="text-4xl md:text-5xl text-[#F5E9D1]">
            {primaryProject.name}
          </h1>
          <StatusBadge status={primaryProject.status} large />
        </div>
        {primaryProject.description && (
          <p style={sans} className="text-[#F5E9D1]/65 mt-4 max-w-3xl leading-relaxed">
            {primaryProject.description}
          </p>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-12 p-8 border border-[#D4B27A]/15 bg-gradient-to-br from-[#D4B27A]/5 to-transparent">
        <div className="flex justify-between items-end mb-4 flex-wrap gap-4">
          <div>
            <div style={sans} className="text-[10px] uppercase tracking-[0.25em] text-[#D4B27A] mb-2">
              Overall progress
            </div>
            <div style={{ ...display, fontStyle: 'italic' }} className="text-5xl text-[#F5E9D1]">
              {primaryProject.progress_percentage}%
            </div>
          </div>
          {primaryProject.target_date && (
            <div className="text-right">
              <div style={sans} className="text-[10px] uppercase tracking-[0.2em] text-[#F5E9D1]/40 mb-1">
                Target delivery
              </div>
              <div style={serifItalic} className="text-lg text-[#F5E9D1]">
                {new Date(primaryProject.target_date).toLocaleDateString('en-AE', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          )}
        </div>
        <div className="h-1 bg-[#F5E9D1]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D4B27A] to-[#E5BB5C] transition-all duration-1000"
            style={{ width: `${primaryProject.progress_percentage}%` }}
          />
        </div>
      </div>

      {/* Timeline + Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <h2 style={serifItalic} className="text-2xl text-[#F5E9D1] mb-6">Timeline</h2>
          <MilestoneTimeline milestones={primaryProject.milestones || []} />
        </div>

        <div className="lg:col-span-2">
          <h2 style={serifItalic} className="text-2xl text-[#F5E9D1] mb-6">Recent updates</h2>
          <UpdatesFeed updates={primaryProject.updates || []} />
        </div>
      </div>
    </div>
  );
}
