'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { STATUS_META } from '@/lib/portal/constants';

const STYLES = `
#dao-client { padding: 40px 48px 64px; color: #F5E9D1; font-family: Inter, -apple-system, system-ui, sans-serif; -webkit-font-smoothing: antialiased; position: relative; }
#dao-client * { box-sizing: border-box; }
#dao-client a { text-decoration: none; color: inherit; }
#dao-client .dc-num { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }
#dao-client .dc-ambient { position: absolute; top: -120px; left: 12%; width: 680px; height: 440px; background: #D4B27A; opacity: 0.05; filter: blur(140px); border-radius: 9999px; pointer-events: none; animation: daoDrift 9s ease-in-out infinite alternate; }
@keyframes daoDrift { from { opacity: 0.035; transform: translateX(-30px); } to { opacity: 0.07; transform: translateX(40px); } }
#dao-client .dc-inner { max-width: 920px; position: relative; z-index: 1; }
#dao-client .dc-rise { opacity: 0; transform: translateY(12px); animation: daoRise 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
#dao-client .dc-d1 { animation-delay: 0.05s; }
#dao-client .dc-d2 { animation-delay: 0.14s; }
#dao-client .dc-d3 { animation-delay: 0.24s; }
@keyframes daoRise { to { opacity: 1; transform: translateY(0); } }
#dao-client .dc-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: #D4B27A; font-weight: 500; }
#dao-client .dc-hero { font-size: 32px; font-weight: 600; letter-spacing: -0.02em; color: #F5E9D1; line-height: 1.1; margin-top: 10px; }
#dao-client .dc-sub { font-size: 15px; color: #9C968A; margin-top: 8px; }
#dao-client .dc-cards { display: flex; flex-direction: column; gap: 18px; margin-top: 32px; }
#dao-client .dc-empty { background: #14120D; border: 1px solid rgba(212,178,122,0.12); border-radius: 16px; padding: 28px; color: #9C968A; font-size: 14px; }
#dao-client .dc-card { background: #14120D; border: 1px solid rgba(212,178,122,0.14); border-radius: 18px; padding: 30px 32px; transition: border-color 0.2s ease, transform 0.2s ease; }
#dao-client .dc-card:hover { border-color: rgba(212,178,122,0.26); transform: translateY(-2px); }
#dao-client .dc-chead { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
#dao-client .dc-pname { font-size: 21px; font-weight: 600; letter-spacing: -0.01em; color: #F5E9D1; line-height: 1.25; }
#dao-client .dc-badge { display: inline-flex; align-items: center; gap: 7px; padding: 5px 11px; border-radius: 999px; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap; flex-shrink: 0; }
#dao-client .dc-dot { width: 6px; height: 6px; border-radius: 50%; }
#dao-client .dc-progrow { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-top: 24px; }
#dao-client .dc-bignum { font-size: 52px; font-weight: 600; line-height: 0.9; letter-spacing: -0.03em; color: #D4B27A; }
#dao-client .dc-pctsign { font-size: 22px; font-weight: 600; vertical-align: top; margin-left: 2px; }
#dao-client .dc-target { text-align: right; }
#dao-client .dc-plabel { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #9C968A; }
#dao-client .dc-tdate { font-size: 16px; font-weight: 500; color: #F5E9D1; margin-top: 5px; }
#dao-client .dc-track { height: 6px; border-radius: 999px; background: rgba(245,233,209,0.08); overflow: hidden; margin-top: 16px; }
#dao-client .dc-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #D4B27A, #E5BB5C); transition: width 1.1s cubic-bezier(0.16,1,0.3,1); }
#dao-client .dc-meta { display: flex; gap: 40px; margin-top: 24px; flex-wrap: wrap; }
#dao-client .dc-metaitem { display: flex; flex-direction: column; gap: 5px; }
#dao-client .dc-metaval { font-size: 13px; color: rgba(245,233,209,0.8); }
#dao-client .dc-view { display: inline-block; margin-top: 24px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #D4B27A; font-weight: 500; }
#dao-client .dc-view:hover { color: #E5BB5C; }
@media (max-width: 900px) {
  #dao-client { padding: 28px 20px 48px; }
  #dao-client .dc-meta { gap: 24px; }
  #dao-client .dc-card { padding: 24px 22px; }
  #dao-client .dc-bignum { font-size: 44px; }
  #dao-client .dc-pname { font-size: 19px; }
}
@media (max-width: 540px) {
  #dao-client { padding: 20px 14px 40px; }
  #dao-client .dc-hero { font-size: 24px; }
  #dao-client .dc-sub { font-size: 14px; }
  #dao-client .dc-card { padding: 20px 18px; }
  #dao-client .dc-chead { flex-direction: column; gap: 10px; }
  #dao-client .dc-pname { font-size: 18px; }
  #dao-client .dc-progrow { gap: 14px; }
  #dao-client .dc-bignum { font-size: 38px; }
  #dao-client .dc-target { text-align: left; }
  #dao-client .dc-meta { gap: 16px; }
}
`;

function CountUp({ value, start, duration = 1100 }) {
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

function fmtDate(d) {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ClientDashboard({ projects = [], profile }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const firstName = (profile?.full_name || 'there').trim().split(' ')[0];

  return (
    <div id="dao-client">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="dc-ambient" aria-hidden="true" />

      <div className="dc-inner">
        <div className="dc-rise dc-d1">
          {profile?.company && <div className="dc-eyebrow">{profile.company}</div>}
          <h1 className="dc-hero">Welcome back, {firstName}</h1>
          <p className="dc-sub">Here&apos;s where your work with DAO stands.</p>
        </div>

        <div className="dc-cards">
          {projects.length === 0 && (
            <div className="dc-empty dc-rise dc-d2">
              No active projects yet — your team will add one here soon.
            </div>
          )}

          {projects.map((p, i) => {
            const meta = STATUS_META[p.status] || { label: p.status, color: '#D4B27A' };
            const pct = Math.max(0, Math.min(100, p.progress_percentage ?? 0));
            const milestones = p.milestones || [];
            const doneCount = milestones.filter((m) => m.status === 'completed').length;
            const updates = [...(p.updates || [])].sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            const latest = updates[0];
            const delay = i === 0 ? 'dc-d2' : 'dc-d3';

            return (
              <div key={p.id} className={`dc-card dc-rise ${delay}`}>
                <div className="dc-chead">
                  <h2 className="dc-pname">{p.name}</h2>
                  <span className="dc-badge" style={{ background: `${meta.color}28`, color: meta.color }}>
                    <span className="dc-dot" style={{ background: meta.color }} />
                    {meta.label}
                  </span>
                </div>

                <div className="dc-progrow">
                  <div className="dc-bignum dc-num">
                    <CountUp value={pct} start={mounted} />
                    <span className="dc-pctsign">%</span>
                  </div>
                  <div className="dc-target">
                    <div className="dc-plabel">Target delivery</div>
                    <div className="dc-tdate dc-num">{fmtDate(p.target_date)}</div>
                  </div>
                </div>

                <div className="dc-track">
                  <div className="dc-fill" style={{ width: mounted ? `${pct}%` : '0%' }} />
                </div>

                <div className="dc-meta">
                  <div className="dc-metaitem">
                    <span className="dc-plabel">Milestones</span>
                    <span className="dc-metaval">
                      {doneCount} of {milestones.length} complete
                    </span>
                  </div>
                  {latest && (
                    <div className="dc-metaitem">
                      <span className="dc-plabel">Latest update</span>
                      <span className="dc-metaval">
                        {latest.title} · {fmtDate(latest.created_at)}
                      </span>
                    </div>
                  )}
                </div>

                <Link href={`/portal/projects/${p.id}`} className="dc-view">
                  View project details →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
