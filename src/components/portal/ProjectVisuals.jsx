'use client';
// src/components/portal/ProjectVisuals.jsx

import { Fragment } from 'react';

const VISUALS_CSS = `
.dao-pv-wrap { font-family: Inter, -apple-system, system-ui, sans-serif; }
.dao-pv-wrap * { box-sizing: border-box; }

/* Status Journey */
.dao-pv-journey {
  background: #14120D; border: 1px solid rgba(212,178,122,0.14); border-radius: 16px;
  padding: 26px 28px; margin-top: 20px;
}
.dao-pv-jhead { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; gap: 12px; flex-wrap: wrap; }
.dao-pv-jlabel { font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #D4B27A; }
.dao-pv-jstate { font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #9C968A; }
.dao-pv-jstate strong { color: #F5E9D1; font-weight: 500; }
.dao-pv-journey-paused { border-color: rgba(168,94,59,0.35); background: rgba(168,94,59,0.04); }
.dao-pv-journey-done { border-color: rgba(94,156,114,0.25); background: rgba(94,156,114,0.04); }

.dao-pv-steps { display: flex; align-items: flex-start; justify-content: space-between; gap: 4px; position: relative; }
.dao-pv-step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; min-width: 0; }
.dao-pv-step-node {
  position: relative; z-index: 2;
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: #14120D;
  transition: all 0.3s ease;
}
.dao-pv-step-node-inner {
  width: 100%; height: 100%; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid rgba(245,233,209,0.15);
}
/* Past */
.dao-pv-step.past .dao-pv-step-node-inner {
  background: #D4B27A; border-color: #D4B27A; color: #0A0908;
}
.dao-pv-step.past .dao-pv-step-node-inner svg { width: 14px; height: 14px; }
/* Current */
.dao-pv-step.current .dao-pv-step-node {
  width: 42px; height: 42px;
  box-shadow: 0 0 0 6px rgba(212,178,122,0.12), 0 0 20px rgba(212,178,122,0.3);
}
.dao-pv-step.current .dao-pv-step-node-inner {
  background: linear-gradient(135deg, #D4B27A, #E5BB5C);
  border-color: #D4B27A;
}
.dao-pv-step.current .dao-pv-step-node-inner::after {
  content: ''; width: 10px; height: 10px; border-radius: 50%; background: #0A0908;
}
/* Future */
.dao-pv-step.future .dao-pv-step-node-inner {
  background: transparent; border-color: rgba(245,233,209,0.18);
}
/* Paused */
.dao-pv-step.paused .dao-pv-step-node-inner {
  background: rgba(168,94,59,0.15); border-color: #A85E3B; color: #C97A7A;
}

.dao-pv-step-label {
  margin-top: 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em;
  text-align: center; transition: color 0.3s ease;
}
.dao-pv-step.past .dao-pv-step-label { color: rgba(212,178,122,0.7); }
.dao-pv-step.current .dao-pv-step-label { color: #F5E9D1; font-weight: 500; }
.dao-pv-step.future .dao-pv-step-label { color: #6E6A60; }
.dao-pv-step.paused .dao-pv-step-label { color: #C97A7A; }

/* Connecting lines (positioned absolute, between nodes) */
.dao-pv-step::before, .dao-pv-step::after {
  content: ''; position: absolute; top: 21px; height: 2px; z-index: 1;
  transition: background 0.3s ease;
}
.dao-pv-step::before { left: 0; right: 50%; }
.dao-pv-step::after { left: 50%; right: 0; }
.dao-pv-step:first-child::before, .dao-pv-step:last-child::after { display: none; }
/* Past stages have gold lines going forward */
.dao-pv-step.past::after { background: #D4B27A; }
.dao-pv-step.past + .dao-pv-step::before { background: #D4B27A; }
/* Current incoming = gold */
.dao-pv-step.current::before { background: #D4B27A; }
/* Current outgoing line, future incoming/outgoing = muted */
.dao-pv-step.current::after,
.dao-pv-step.future::before, .dao-pv-step.future::after {
  background: rgba(245,233,209,0.08);
}

/* === Updates Activity — BIG visual === */
.dao-pv-updates {
  display: grid; grid-template-columns: auto 1fr auto; gap: 32px;
  align-items: center; padding: 32px 36px;
  background: rgba(245,233,209,0.02); border: 1px solid rgba(212,178,122,0.15);
  border-radius: 14px; margin-bottom: 18px;
}
.dao-pv-updates-num {
  font-size: 64px; font-weight: 500; color: #D4B27A; line-height: 0.9; flex-shrink: 0;
  letter-spacing: -0.04em;
}
/* Sparkline (activity bars) — large prominent */
.dao-pv-spark { display: flex; align-items: end; gap: 4px; height: 72px; flex: 1; }
.dao-pv-spark-bar {
  flex: 1; min-width: 6px; background: rgba(212,178,122,0.18); border-radius: 3px;
  transition: background 0.15s ease;
}
.dao-pv-spark-bar.hot { background: #D4B27A; }
.dao-pv-spark-bar.warm { background: rgba(212,178,122,0.55); }
/* Author avatars — bigger */
.dao-pv-authors { display: flex; flex-shrink: 0; }
.dao-pv-avatar {
  width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
  background: rgba(212,178,122,0.14); border: 2.5px solid #14120D;
  color: #D4B27A; display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 600;
  margin-left: -12px;
}
.dao-pv-avatar:first-child { margin-left: 0; }
.dao-pv-avatar-more {
  background: rgba(245,233,209,0.06); color: rgba(245,233,209,0.55);
  font-size: 12px;
}

/* === Milestone Train — BIG visual with names under dots === */
.dao-pv-train {
  display: grid; grid-template-columns: auto 1fr; gap: 32px;
  align-items: center; padding: 32px 36px;
  background: rgba(245,233,209,0.02); border: 1px solid rgba(212,178,122,0.15);
  border-radius: 14px; margin-bottom: 18px;
}
.dao-pv-train-percent {
  flex-shrink: 0; display: flex; flex-direction: column; align-items: center;
}
.dao-pv-train-percent-num {
  font-size: 64px; font-weight: 500; color: #D4B27A; line-height: 0.9;
  letter-spacing: -0.04em;
}
.dao-pv-train-percent-num small { font-size: 28px; color: rgba(212,178,122,0.55); margin-left: 2px; }
.dao-pv-train-percent-frac {
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #9C968A;
  margin-top: 8px;
}
.dao-pv-train-percent-frac strong { color: #F5E9D1; font-weight: 500; }
.dao-pv-train-row { display: flex; align-items: flex-start; gap: 0; flex-wrap: nowrap; overflow-x: auto; flex: 1; padding-bottom: 6px; padding-top: 4px; }
.dao-pv-train-row::-webkit-scrollbar { height: 4px; }
.dao-pv-train-row::-webkit-scrollbar-thumb { background: rgba(212,178,122,0.2); border-radius: 2px; }
.dao-pv-train-step { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; min-width: 60px; max-width: 100px; }
.dao-pv-train-name {
  font-size: 10px; color: rgba(245,233,209,0.55); margin-top: 10px;
  text-align: center; line-height: 1.3;
  overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  max-width: 90px;
}
.dao-pv-train-step.done .dao-pv-train-name { color: rgba(212,178,122,0.85); }
.dao-pv-train-step.active .dao-pv-train-name { color: #F5E9D1; font-weight: 500; }
@media (max-width: 720px) {
  .dao-pv-updates, .dao-pv-train { padding: 24px 22px; gap: 22px; grid-template-columns: 1fr; }
  .dao-pv-updates-num, .dao-pv-train-percent-num { font-size: 52px; }
  .dao-pv-spark { height: 56px; }
}
.dao-pv-train-row::-webkit-scrollbar { height: 4px; }
.dao-pv-train-row::-webkit-scrollbar-thumb { background: rgba(212,178,122,0.18); border-radius: 2px; }
.dao-pv-tnode {
  width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
  border: 2px solid rgba(245,233,209,0.2); background: transparent;
  position: relative;
  transition: transform 0.15s ease;
}
.dao-pv-tnode:hover { transform: scale(1.2); }
.dao-pv-tnode.done {
  background: #5B9C72; border-color: #5B9C72;
}
.dao-pv-tnode.active {
  background: #E5BB5C; border-color: #E5BB5C;
  box-shadow: 0 0 0 4px rgba(229,187,92,0.18);
}
.dao-pv-tline {
  flex: 1; height: 2px; background: rgba(245,233,209,0.1); min-width: 12px;
}
.dao-pv-tline.done { background: #5B9C72; }
.dao-pv-tempty { text-align: center; padding: 14px; color: #6E6A60; font-size: 12px; }

/* === Files Summary === */
.dao-pv-files {
  display: flex; flex-wrap: wrap; gap: 10px; padding: 16px 20px;
  background: rgba(245,233,209,0.02); border: 1px solid rgba(212,178,122,0.12);
  border-radius: 12px; margin-bottom: 18px; align-items: center;
}
.dao-pv-files-empty {
  font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em; color: #6E6A60;
}
.dao-pv-chip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 13px;
  background: rgba(212,178,122,0.08);
  border: 1px solid rgba(212,178,122,0.18);
  border-radius: 999px;
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em;
  color: rgba(245,233,209,0.85);
}
.dao-pv-chip svg { width: 14px; height: 14px; color: #D4B27A; flex-shrink: 0; }
.dao-pv-chip-num { color: #D4B27A; font-weight: 600; }
.dao-pv-files-total {
  margin-left: auto; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em;
  color: #9C968A;
}
.dao-pv-files-total strong { color: #F5E9D1; font-weight: 500; }

/* Service icon in hero */
.dao-pv-srv {
  display: inline-flex; align-items: center; gap: 10px;
  margin-top: 12px;
  padding: 8px 14px;
  background: rgba(212,178,122,0.08);
  border: 1px solid rgba(212,178,122,0.18);
  border-radius: 999px;
}
.dao-pv-srv svg { width: 16px; height: 16px; color: #D4B27A; flex-shrink: 0; }
.dao-pv-srv-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #D4B27A; }

@media (max-width: 720px) {
  .dao-pv-journey { padding: 20px 18px; }
  .dao-pv-step-label { font-size: 9px; letter-spacing: 0.08em; }
  .dao-pv-step.current .dao-pv-step-node { width: 36px; height: 36px; }
}
@media (max-width: 480px) {
  .dao-pv-step-label { display: none; }
  .dao-pv-step.current .dao-pv-step-label { display: block; font-size: 10px; }
}
`;

const SERVICE_META = {
  brand_identity: {
    label: 'Brand Identity',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 9l8 13 8-13-8-7z" />
        <path d="M4 9h16" />
        <path d="M12 2v20" />
      </svg>
    ),
  },
  web_development: {
    label: 'Web Development',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  cinematic_content: {
    label: 'Cinematic Content',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <polygon points="16 9 22 6 22 18 16 15 16 9" />
      </svg>
    ),
  },
  social_media: {
    label: 'Social Media',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.38 8.38 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z" />
      </svg>
    ),
  },
  paid_media: {
    label: 'Paid Media',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="20" x2="6" y2="13" />
        <line x1="12" y1="20" x2="12" y2="8" />
        <line x1="18" y1="20" x2="18" y2="4" />
      </svg>
    ),
  },
  seo: {
    label: 'SEO',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  full_service: {
    label: 'Full Service',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2" />
      </svg>
    ),
  },
  consultation: {
    label: 'Consultation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
      </svg>
    ),
  },
};

export function ServiceIcon({ serviceType }) {
  const meta = SERVICE_META[serviceType];
  if (!meta) return null;
  return (
    <div className="dao-pv-wrap" style={{ display: 'inline-block' }}>
      <style dangerouslySetInnerHTML={{ __html: VISUALS_CSS }} />
      <span className="dao-pv-srv">
        {meta.icon}
        <span className="dao-pv-srv-label">{meta.label}</span>
      </span>
    </div>
  );
}

const JOURNEY = [
  { key: 'proposal',    label: 'Proposal' },
  { key: 'discovery',   label: 'Discovery' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'review',      label: 'Review' },
  { key: 'delivered',   label: 'Delivered' },
];

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const PAUSE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
  </svg>
);

export function StatusJourney({ status }) {
  const isCompleted = status === 'completed';
  const isOnHold = status === 'on_hold';
  const currentIdx = JOURNEY.findIndex((s) => s.key === status);
  // For completed: treat as past delivered (all 5 done)
  // For on_hold: render last-known stage as paused (default to in_progress since DB doesn't track previous status)
  const effectiveIdx = isCompleted ? JOURNEY.length : (isOnHold ? 2 : currentIdx);

  const stateLabel = isCompleted
    ? 'Project completed.'
    : isOnHold
    ? 'Project paused.'
    : currentIdx >= 0
    ? `Currently in ${JOURNEY[currentIdx].label.toLowerCase()}.`
    : 'Not yet started.';

  const journeyClass = isOnHold
    ? 'dao-pv-journey dao-pv-journey-paused'
    : isCompleted
    ? 'dao-pv-journey dao-pv-journey-done'
    : 'dao-pv-journey';

  return (
    <div className="dao-pv-wrap">
      <style dangerouslySetInnerHTML={{ __html: VISUALS_CSS }} />
      <div className={journeyClass}>
        <div className="dao-pv-jhead">
          <span className="dao-pv-jlabel">Project journey</span>
          <span className="dao-pv-jstate">{stateLabel}</span>
        </div>

        <div className="dao-pv-steps">
          {JOURNEY.map((stage, i) => {
            let cls = 'dao-pv-step';
            if (isOnHold && i === effectiveIdx) cls += ' paused';
            else if (i < effectiveIdx) cls += ' past';
            else if (i === effectiveIdx && !isCompleted) cls += ' current';
            else cls += ' future';

            const content = cls.includes('past') ? CHECK : cls.includes('paused') ? PAUSE : null;

            return (
              <div key={stage.key} className={cls}>
                <div className="dao-pv-step-node">
                  <div className="dao-pv-step-node-inner">{content}</div>
                </div>
                <div className="dao-pv-step-label">{stage.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ====================================================
   UpdatesActivity — author avatars + activity sparkline
   ==================================================== */

function initials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function relativeTime(d) {
  if (!d) return '—';
  const now = Date.now();
  const then = new Date(d).getTime();
  const diffMs = now - then;
  const day = 86400000;
  if (diffMs < 0) return 'in the future';
  if (diffMs < day) return 'today';
  if (diffMs < 2 * day) return 'yesterday';
  const days = Math.floor(diffMs / day);
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) === 1 ? '' : 's'} ago`;
  if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) === 1 ? '' : 's'} ago`;
  return `${Math.floor(days / 365)} year${Math.floor(days / 365) === 1 ? '' : 's'} ago`;
}

export function UpdatesActivity({ updates = [] }) {
  if (!updates || updates.length === 0) return null;

  const sorted = [...updates].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const latest = sorted[0];

  // Build 12-week activity buckets
  const buckets = Array(12).fill(0);
  const now = Date.now();
  const weekMs = 7 * 86400000;
  updates.forEach((u) => {
    const ageWeeks = Math.floor((now - new Date(u.created_at).getTime()) / weekMs);
    if (ageWeeks >= 0 && ageWeeks < 12) buckets[11 - ageWeeks]++;
  });
  const maxBucket = Math.max(...buckets, 1);

  // Unique authors
  const authorMap = new Map();
  updates.forEach((u) => {
    const name = u.author?.full_name;
    if (name && !authorMap.has(name)) authorMap.set(name, name);
  });
  const authors = [...authorMap.keys()];
  const visibleAuthors = authors.slice(0, 4);
  const moreCount = authors.length - visibleAuthors.length;

  return (
    <div className="dao-pv-wrap">
      <style dangerouslySetInnerHTML={{ __html: VISUALS_CSS }} />
      <div
        className="dao-pv-updates"
        title={`${updates.length} update${updates.length === 1 ? '' : 's'} · Last ${relativeTime(latest.created_at)} · ${authors.length} author${authors.length === 1 ? '' : 's'}`}
      >
        {/* Big count */}
        <div className="dao-pv-updates-num">{updates.length}</div>

        {/* Sparkline (12 weeks) — purely visual */}
        <div className="dao-pv-spark">
          {buckets.map((count, i) => {
            const cls = count === 0 ? '' : count >= maxBucket * 0.66 ? ' hot' : ' warm';
            const heightPct = count === 0 ? 8 : Math.max(15, (count / maxBucket) * 100);
            return (
              <div
                key={i}
                className={`dao-pv-spark-bar${cls}`}
                style={{ height: `${heightPct}%` }}
                title={`${count} update${count === 1 ? '' : 's'}`}
              />
            );
          })}
        </div>

        {/* Author avatars — no caption */}
        {authors.length > 0 && (
          <div className="dao-pv-authors">
            {visibleAuthors.map((name) => (
              <div key={name} className="dao-pv-avatar" title={name}>
                {initials(name)}
              </div>
            ))}
            {moreCount > 0 && (
              <div className="dao-pv-avatar dao-pv-avatar-more" title={`+${moreCount} more`}>+{moreCount}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ====================================================
   MilestoneTrain — horizontal dotted journey
   ==================================================== */

export function MilestoneTrain({ milestones = [] }) {
  if (!milestones || milestones.length === 0) return null;
  const sorted = [...milestones].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
  const doneCount = sorted.filter((m) => m.status === 'completed').length;
  const inProgressIdx = sorted.findIndex((m) => m.status === 'in_progress');

  return (
    <div className="dao-pv-wrap">
      <style dangerouslySetInnerHTML={{ __html: VISUALS_CSS }} />
      <div className="dao-pv-train">
        {/* Big percent on left */}
        <div className="dao-pv-train-percent">
          <div className="dao-pv-train-percent-num">
            {sorted.length > 0 ? Math.round((doneCount / sorted.length) * 100) : 0}<small>%</small>
          </div>
          <div className="dao-pv-train-percent-frac">
            <strong>{doneCount}</strong> of <strong>{sorted.length}</strong>
          </div>
        </div>

        {/* Train of dots with names under each */}
        <div className="dao-pv-train-row">
          {sorted.map((m, i) => {
            const isLast = i === sorted.length - 1;
            const isDone = m.status === 'completed';
            const isActive = m.status === 'in_progress';
            const nodeCls = `dao-pv-tnode${isDone ? ' done' : ''}${isActive ? ' active' : ''}`;
            const stepCls = `dao-pv-train-step${isDone ? ' done' : ''}${isActive ? ' active' : ''}`;
            const next = sorted[i + 1];
            const lineDone = isDone && next && next.status === 'completed';

            return (
              <Fragment key={m.id}>
                <div className={stepCls}>
                  <div className={nodeCls} title={`${m.title} · ${m.status.replace('_', ' ')}`} />
                  <span className="dao-pv-train-name">{m.title}</span>
                </div>
                {!isLast && <div className={`dao-pv-tline${lineDone ? ' done' : ''}`} style={{ marginTop: 8 }} />}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ====================================================
   FilesSummary — file type chips with counts
   ==================================================== */

const FILE_TYPE_GROUPS = {
  PDF:    { match: (t) => t === 'application/pdf', label: 'PDF',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  Image:  { match: (t) => t?.startsWith('image/'), label: 'Image',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> },
  Doc:    { match: (t) => t?.includes('word') || t === 'text/plain', label: 'Doc',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg> },
  Sheet:  { match: (t) => t?.includes('sheet') || t?.includes('excel') || t === 'text/csv', label: 'Sheet',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg> },
  Deck:   { match: (t) => t?.includes('presentation') || t?.includes('powerpoint'), label: 'Deck',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg> },
  Zip:    { match: (t) => t?.includes('zip'), label: 'Zip',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M11 8v2M11 12v2M11 16v2"/></svg> },
  File:   { match: () => true, label: 'File',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg> },
};

function classify(file) {
  for (const [key, group] of Object.entries(FILE_TYPE_GROUPS)) {
    if (group.match(file.file_type)) return key;
  }
  return 'File';
}

function formatTotalBytes(bytes) {
  if (!bytes) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

export function FilesSummary({ files = [] }) {
  if (!files || files.length === 0) {
    return (
      <div className="dao-pv-wrap">
        <style dangerouslySetInnerHTML={{ __html: VISUALS_CSS }} />
        <div className="dao-pv-files">
          <div className="dao-pv-files-empty">No files yet</div>
        </div>
      </div>
    );
  }

  // Bucket by classification
  const counts = {};
  let totalBytes = 0;
  files.forEach((f) => {
    const cls = classify(f);
    counts[cls] = (counts[cls] || 0) + 1;
    totalBytes += Number(f.size_bytes) || 0;
  });

  // Sort by count desc
  const ordered = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="dao-pv-wrap">
      <style dangerouslySetInnerHTML={{ __html: VISUALS_CSS }} />
      <div className="dao-pv-files">
        {ordered.map(([key, count]) => {
          const group = FILE_TYPE_GROUPS[key];
          return (
            <span key={key} className="dao-pv-chip">
              {group.icon}
              <span className="dao-pv-chip-num">{count}</span>
              <span>{group.label}{count === 1 ? '' : 's'}</span>
            </span>
          );
        })}
        <span className="dao-pv-files-total">
          <strong>{files.length}</strong> file{files.length === 1 ? '' : 's'} · <strong>{formatTotalBytes(totalBytes)}</strong>
        </span>
      </div>
    </div>
  );
}
