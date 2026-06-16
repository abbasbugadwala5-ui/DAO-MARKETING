'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { STATUS_META } from '@/lib/portal/constants';

const STYLES = `
#dao-dashboard { padding: 38px 48px 60px; color: #F5E9D1; font-family: Inter, -apple-system, system-ui, sans-serif; -webkit-font-smoothing: antialiased; position: relative; }
#dao-dashboard * { box-sizing: border-box; }
#dao-dashboard a { text-decoration: none; color: inherit; }
#dao-dashboard .dd-num { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }
#dao-dashboard .dd-ambient { position: absolute; top: -120px; left: 16%; width: 720px; height: 460px; background: #D4B27A; opacity: 0.05; filter: blur(140px); border-radius: 9999px; pointer-events: none; animation: daoDrift 9s ease-in-out infinite alternate; }
@keyframes daoDrift { from { opacity: 0.035; transform: translateX(-30px); } to { opacity: 0.07; transform: translateX(40px); } }
#dao-dashboard .dd-inner { max-width: 1160px; position: relative; z-index: 1; }
#dao-dashboard .dd-rise { opacity: 0; transform: translateY(12px); animation: daoRise 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
#dao-dashboard .dd-d1 { animation-delay: 0.05s; }
#dao-dashboard .dd-d2 { animation-delay: 0.13s; }
#dao-dashboard .dd-d3 { animation-delay: 0.22s; }
#dao-dashboard .dd-d4 { animation-delay: 0.32s; }
@keyframes daoRise { to { opacity: 1; transform: translateY(0); } }
#dao-dashboard .dd-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: #D4B27A; font-weight: 500; }
#dao-dashboard .dd-hero { font-size: 32px; font-weight: 600; letter-spacing: -0.02em; color: #F5E9D1; line-height: 1.1; margin-top: 10px; }
#dao-dashboard .dd-sub { font-size: 15px; color: #9C968A; margin-top: 8px; }
#dao-dashboard .dd-herozone { display: grid; grid-template-columns: 300px 1fr; gap: 16px; margin-top: 30px; }
#dao-dashboard .dd-ringcard { background: #14120D; border: 1px solid rgba(212,178,122,0.12); border-radius: 18px; padding: 26px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
#dao-dashboard .dd-ringwrap { position: relative; width: 168px; height: 168px; }
#dao-dashboard .dd-ringctr { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
#dao-dashboard .dd-ringv { font-size: 38px; font-weight: 600; color: #F5E9D1; line-height: 1; letter-spacing: -0.02em; }
#dao-dashboard .dd-ringv span { font-size: 18px; color: #D4B27A; }
#dao-dashboard .dd-ringcap { margin-top: 18px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #9C968A; text-align: center; line-height: 1.6; }
#dao-dashboard .dd-ringcap b { color: rgba(245,233,209,0.85); font-weight: 600; }
#dao-dashboard .dd-statgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
#dao-dashboard .dd-stat { background: #14120D; border: 1px solid rgba(212,178,122,0.12); border-radius: 18px; padding: 20px 22px; display: flex; flex-direction: column; justify-content: space-between; transition: border-color 0.2s ease, transform 0.2s ease; }
#dao-dashboard .dd-stat:hover { border-color: rgba(212,178,122,0.24); transform: translateY(-2px); }
#dao-dashboard .dd-stat-top { display: flex; align-items: center; justify-content: space-between; }
#dao-dashboard .dd-lab { font-size: 11px; text-transform: uppercase; letter-spacing: 0.13em; color: #9C968A; }
#dao-dashboard .dd-ic { width: 32px; height: 32px; border-radius: 9px; background: rgba(212,178,122,0.08); display: flex; align-items: center; justify-content: center; color: #D4B27A; flex-shrink: 0; }
#dao-dashboard .dd-ic svg { width: 17px; height: 17px; }
#dao-dashboard .dd-n { font-size: 34px; font-weight: 600; color: #F5E9D1; line-height: 1; margin-top: 14px; letter-spacing: -0.02em; }
#dao-dashboard .dd-proj-head { display: flex; align-items: center; justify-content: space-between; margin: 42px 0 16px; gap: 16px; }
#dao-dashboard .dd-proj-head h2 { font-size: 19px; font-weight: 600; letter-spacing: -0.01em; color: #F5E9D1; }
#dao-dashboard .dd-btn { display: inline-flex; align-items: center; gap: 7px; height: 38px; padding: 0 18px; border-radius: 9px; background: transparent; border: 1px solid rgba(212,178,122,0.24); color: #D4B27A; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; transition: all 0.15s ease; white-space: nowrap; }
#dao-dashboard .dd-btn:hover { background: #D4B27A; color: #0A0908; border-color: #D4B27A; }
#dao-dashboard .dd-panel { background: #14120D; border: 1px solid rgba(212,178,122,0.12); border-radius: 16px; overflow: hidden; }
#dao-dashboard .dd-colhead, #dao-dashboard .dd-row { display: grid; grid-template-columns: 44px 1fr 150px 230px 96px; align-items: center; gap: 24px; }
#dao-dashboard .dd-colhead { padding: 14px 26px; border-bottom: 1px solid rgba(212,178,122,0.12); }
#dao-dashboard .dd-colhead span { font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: #6E6A60; font-weight: 500; }
#dao-dashboard .dd-colhead .dd-r { text-align: right; }
#dao-dashboard .dd-row { padding: 20px 26px; border-bottom: 1px solid rgba(212,178,122,0.12); transition: background 0.18s ease, box-shadow 0.18s ease; }
#dao-dashboard .dd-row:last-child { border-bottom: none; }
#dao-dashboard .dd-row:hover { background: #191711; box-shadow: inset 0 0 0 1px rgba(212,178,122,0.24); }
#dao-dashboard .dd-idx { font-size: 13px; color: #6E6A60; }
#dao-dashboard .dd-title { font-size: 15px; font-weight: 500; color: #F5E9D1; }
#dao-dashboard .dd-company { font-size: 11px; text-transform: uppercase; letter-spacing: 0.09em; color: #9C968A; margin-top: 5px; }
#dao-dashboard .dd-badge { display: inline-flex; align-items: center; gap: 7px; padding: 5px 11px; border-radius: 999px; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; }
#dao-dashboard .dd-dot { width: 6px; height: 6px; border-radius: 50%; }
#dao-dashboard .dd-ptop { display: flex; justify-content: space-between; margin-bottom: 7px; }
#dao-dashboard .dd-plabel { font-size: 10px; text-transform: uppercase; letter-spacing: 0.13em; color: #9C968A; }
#dao-dashboard .dd-pct { font-size: 13px; color: #D4B27A; font-weight: 600; }
#dao-dashboard .dd-track { height: 5px; border-radius: 999px; background: rgba(245,233,209,0.08); overflow: hidden; }
#dao-dashboard .dd-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #D4B27A, #E5BB5C); transition: width 1.1s cubic-bezier(0.16,1,0.3,1); }
#dao-dashboard .dd-date { font-size: 13px; color: rgba(245,233,209,0.78); text-align: right; }
#dao-dashboard .dd-empty { padding: 24px 26px; color: #9C968A; font-size: 14px; }
@media (max-width: 1000px) {
  #dao-dashboard { padding: 28px 20px 48px; }
  #dao-dashboard .dd-herozone { grid-template-columns: 1fr; }
  #dao-dashboard .dd-colhead { display: none; }
  #dao-dashboard .dd-row { grid-template-columns: 1fr; gap: 12px; padding: 18px 20px; }
  #dao-dashboard .dd-date { text-align: left; }
  #dao-dashboard .dd-proj-head { flex-wrap: wrap; gap: 12px; margin: 32px 0 14px; }
  #dao-dashboard .dd-ringcard { padding: 22px; }
  #dao-dashboard .dd-ringwrap { width: 140px; height: 140px; }
  #dao-dashboard .dd-ringv { font-size: 32px; }
}
@media (max-width: 540px) {
  #dao-dashboard { padding: 20px 14px 44px; }
  #dao-dashboard .dd-hero { font-size: 24px; }
  #dao-dashboard .dd-sub { font-size: 14px; }
  #dao-dashboard .dd-statgrid { grid-template-columns: 1fr; gap: 12px; }
  #dao-dashboard .dd-stat { padding: 16px 18px; }
  #dao-dashboard .dd-n { font-size: 28px; }
  #dao-dashboard .dd-row { padding: 16px 18px; }
  #dao-dashboard .dd-title { font-size: 14px; }
  #dao-dashboard .dd-proj-head h2 { font-size: 17px; }
}
`;

const ICONS = {
  activity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  pause: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  ),
  folders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z" />
      <path d="M2 8v11a2 2 0 0 0 2 2h14" />
    </svg>
  ),
};

function CountUp({ value, start, duration = 1000 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      setV(Math.round(ease(p) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, start, duration]);
  return <>{v}</>;
}

function Stat({ label, value, icon, start, delay }) {
  return (
    <div className={`dd-stat dd-rise ${delay}`}>
      <div className="dd-stat-top">
        <span className="dd-lab">{label}</span>
        <span className="dd-ic">{ICONS[icon]}</span>
      </div>
      <div className="dd-n dd-num">
        <CountUp value={value} start={start} />
      </div>
    </div>
  );
}

function fmtDate(d) {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export default function AdminDashboard({ projects = [], profile }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const firstName = (profile?.full_name || 'there').trim().split(' ')[0];
  const activeProjects = projects.filter(
    (p) => !['delivered', 'completed', 'on_hold'].includes(p.status)
  );
  const active = activeProjects.length;
  const done = projects.filter((p) => ['delivered', 'completed'].includes(p.status)).length;
  const onHold = projects.filter((p) => p.status === 'on_hold').length;
  const all = projects.length;
  const avg = active
    ? Math.round(activeProjects.reduce((s, p) => s + (p.progress_percentage || 0), 0) / active)
    : 0;

  const R = 74;
  const C = 2 * Math.PI * R;
  const ringOffset = mounted ? C * (1 - avg / 100) : C;

  return (
    <div id="dao-dashboard">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="dd-ambient" aria-hidden="true" />

      <div className="dd-inner">
        <div className="dd-rise dd-d1">
          <div className="dd-eyebrow">Admin · Dashboard</div>
          <h1 className="dd-hero">Welcome back, {firstName}</h1>
          <p className="dd-sub">Everything happening across DAO right now.</p>
        </div>

        <div className="dd-herozone">
          <div className="dd-ringcard dd-rise dd-d2">
            <div className="dd-ringwrap">
              <svg width="168" height="168" viewBox="0 0 168 168">
                <defs>
                  <linearGradient id="daoRingGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#D4B27A" />
                    <stop offset="1" stopColor="#E5BB5C" />
                  </linearGradient>
                </defs>
                <circle cx="84" cy="84" r="74" fill="none" stroke="rgba(245,233,209,0.08)" strokeWidth="10" />
                <circle
                  cx="84"
                  cy="84"
                  r="74"
                  fill="none"
                  stroke="url(#daoRingGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={ringOffset}
                  style={{
                    transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)',
                    transform: 'rotate(-90deg)',
                    transformOrigin: '84px 84px',
                  }}
                />
              </svg>
              <div className="dd-ringctr">
                <div className="dd-ringv dd-num">
                  <CountUp value={avg} start={mounted} duration={1200} />
                  <span>%</span>
                </div>
              </div>
            </div>
            <div className="dd-ringcap">
              Avg. progress
              <br />
              <b>across {active} active {active === 1 ? 'project' : 'projects'}</b>
            </div>
          </div>

          <div className="dd-statgrid">
            <Stat label="Active projects" value={active} icon="activity" start={mounted} delay="dd-d2" />
            <Stat label="Delivered / completed" value={done} icon="check" start={mounted} delay="dd-d3" />
            <Stat label="On hold" value={onHold} icon="pause" start={mounted} delay="dd-d3" />
            <Stat label="All projects" value={all} icon="folders" start={mounted} delay="dd-d4" />
          </div>
        </div>

        <div className="dd-proj-head dd-rise dd-d4">
          <h2>All projects</h2>
          <Link href="/portal/projects/new" className="dd-btn">+ New project</Link>
        </div>

        <div className="dd-panel dd-rise dd-d4">
          <div className="dd-colhead">
            <span />
            <span>Project</span>
            <span>Status</span>
            <span>Progress</span>
            <span className="dd-r">Updated</span>
          </div>

          {projects.length === 0 && <div className="dd-empty">No projects yet.</div>}

          {projects.map((p, i) => {
            const meta = STATUS_META[p.status] || { label: p.status, color: '#D4B27A' };
            const pct = Math.max(0, Math.min(100, p.progress_percentage ?? 0));
            return (
              <Link key={p.id} href={`/portal/projects/${p.id}`} className="dd-row">
                <div className="dd-idx dd-num">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div className="dd-title">{p.name}</div>
                  {p.client?.company && <div className="dd-company">{p.client.company}</div>}
                </div>
                <div>
                  <span className="dd-badge" style={{ background: `${meta.color}28`, color: meta.color }}>
                    <span className="dd-dot" style={{ background: meta.color }} />
                    {meta.label}
                  </span>
                </div>
                <div>
                  <div className="dd-ptop">
                    <span className="dd-plabel">Progress</span>
                    <span className="dd-pct dd-num">{pct}%</span>
                  </div>
                  <div className="dd-track">
                    <div className="dd-fill" style={{ width: mounted ? `${pct}%` : '0%' }} />
                  </div>
                </div>
                <div className="dd-date dd-num">{fmtDate(p.updated_at)}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
