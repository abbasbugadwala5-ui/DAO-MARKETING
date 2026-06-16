// src/components/portal/projectDetailParts.jsx
// Pure presentational helpers shared by the admin + client project detail views.
// No hooks, no 'use client' — safe to import from server or client components.
import { STATUS_META, MILESTONE_META } from '@/lib/portal/constants';

export function fmtDate(d) {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function StatusPill({ status }) {
  const m = STATUS_META[status] || { label: status || 'Unknown', color: '#D4B27A' };
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
      style={{ backgroundColor: `${m.color}22`, color: m.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: m.color }} />
      {m.label}
    </span>
  );
}

export function ProgressBar({ value }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F5E9D1]/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#D4B27A] to-[#E5BB5C] transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function MilestoneTimeline({ milestones }) {
  if (!milestones || milestones.length === 0) {
    return <p className="text-sm text-[#F5E9D1]/40">No milestones yet.</p>;
  }
  return (
    <ol className="space-y-0">
      {milestones.map((m, i) => {
        const meta = MILESTONE_META[m.status] || MILESTONE_META.pending;
        const isActive = m.status === 'in_progress';
        const isLast = i === milestones.length - 1;
        return (
          <li key={m.id} className="flex gap-4">
            <div className="flex flex-col items-center pt-1.5">
              <span
                className={`h-3 w-3 shrink-0 rounded-full ${isActive ? 'animate-pulse' : ''}`}
                style={{ backgroundColor: meta.color }}
              />
              {!isLast && <span className="my-1 min-h-[2.25rem] w-px grow bg-[#D4B27A]/15" />}
            </div>
            <div className={`flex-1 ${isLast ? 'pb-1' : 'pb-6'}`}>
              <p className="text-[15px] leading-tight text-[#F5E9D1]/90">{m.title}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: meta.color }}>
                {meta.label}
                {m.due_date ? ` · ${fmtDate(m.due_date)}` : ''}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
