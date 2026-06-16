'use client';

import { useState } from 'react';
import Link from 'next/link';
import { STATUS_META, SERVICE_TYPE_META } from '@/lib/portal/constants';
import { MilestoneTimeline } from '@/components/portal/projectDetailParts';
import FilesSection from '@/components/portal/FilesSection';
import Conversation from '@/components/portal/Conversation';

const STYLES = `
#dao-proj { color:#F5E9D1; font-family:Inter,-apple-system,system-ui,sans-serif; -webkit-font-smoothing:antialiased; position:relative; }
#dao-proj *{box-sizing:border-box}
#dao-proj a{text-decoration:none;color:inherit}
#dao-proj .dp-num{font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}
#dao-proj .dp-ambient{position:absolute;top:-120px;left:12%;width:760px;height:460px;background:#D4B27A;opacity:.05;filter:blur(150px);border-radius:9999px;pointer-events:none;animation:dpDrift 9s ease-in-out infinite alternate}
@keyframes dpDrift{from{opacity:.035;transform:translateX(-30px)}to{opacity:.07;transform:translateX(40px)}}
#dao-proj .dp-wrap{max-width:1180px;margin:0 auto;padding:34px 40px 80px;position:relative;z-index:1}
#dao-proj .dp-rise{opacity:0;transform:translateY(12px);animation:dpRise .7s cubic-bezier(.16,1,.3,1) forwards}
#dao-proj .dp-d1{animation-delay:.04s}#dao-proj .dp-d2{animation-delay:.12s}#dao-proj .dp-d3{animation-delay:.2s}
@keyframes dpRise{to{opacity:1;transform:translateY(0)}}
#dao-proj .dp-topbar{display:flex;align-items:center;justify-content:space-between}
#dao-proj .dp-back{font-size:11px;text-transform:uppercase;letter-spacing:.22em;color:#9C968A}
#dao-proj .dp-back:hover{color:#D4B27A}
#dao-proj .dp-hero{display:grid;grid-template-columns:1fr 168px;gap:32px;align-items:center;margin-top:30px}
#dao-proj .dp-eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.22em;color:#D4B27A;font-weight:500}
#dao-proj .dp-title{font-size:34px;font-weight:600;letter-spacing:-.02em;line-height:1.08;margin-top:12px;color:#F5E9D1}
#dao-proj .dp-herochips{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px;align-items:center}
#dao-proj .dp-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 12px;border-radius:999px;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.07em}
#dao-proj .dp-dot{width:6px;height:6px;border-radius:50%}
#dao-proj .dp-svc{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#9C968A}
#dao-proj .dp-ringwrap{position:relative;width:168px;height:168px;justify-self:end}
#dao-proj .dp-ringwrap svg{transform:rotate(-90deg)}
#dao-proj .dp-ringctr{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
#dao-proj .dp-ringctr .v{font-size:36px;font-weight:600;letter-spacing:-.02em;line-height:1}
#dao-proj .dp-ringctr .v span{font-size:17px;color:#D4B27A}
#dao-proj .dp-ringctr .lab{font-size:9px;text-transform:uppercase;letter-spacing:.16em;color:#9C968A;margin-top:7px}
#dao-proj .dp-journey{background:#14120D;border:1px solid rgba(212,178,122,.12);border-radius:18px;padding:26px 32px;margin-top:28px}
#dao-proj .dp-journey-top{display:flex;justify-content:space-between;margin-bottom:24px}
#dao-proj .dp-journey-top .l{font-size:10px;text-transform:uppercase;letter-spacing:.2em;color:#6E6A60}
#dao-proj .dp-journey-top .r{font-size:10px;text-transform:uppercase;letter-spacing:.16em;color:#D4B27A}
#dao-proj .dp-steps{display:flex;align-items:flex-start}
#dao-proj .dp-step{flex:1;display:flex;flex-direction:column;align-items:center;position:relative}
#dao-proj .dp-node{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:2;flex-shrink:0}
#dao-proj .dp-node svg{width:15px;height:15px}
#dao-proj .dp-step.done .dp-node{background:#D4B27A;color:#0A0908}
#dao-proj .dp-step.current .dp-node{background:#D4B27A;color:#0A0908;box-shadow:0 0 0 6px rgba(212,178,122,.18),0 0 22px rgba(212,178,122,.55)}
#dao-proj .dp-step.todo .dp-node{background:transparent;border:1.5px solid rgba(245,233,209,.18)}
#dao-proj .dp-pulse{width:8px;height:8px;border-radius:50%;background:#0A0908}
#dao-proj .dp-slab{font-size:10px;text-transform:uppercase;letter-spacing:.12em;margin-top:12px;text-align:center;color:#9C968A}
#dao-proj .dp-step.current .dp-slab{color:#D4B27A;font-weight:600}
#dao-proj .dp-bar{position:absolute;top:17px;left:50%;width:100%;height:2px;z-index:1}
#dao-proj .dp-step.done .dp-bar{background:#D4B27A}
#dao-proj .dp-step.current .dp-bar{background:linear-gradient(90deg,#D4B27A,rgba(245,233,209,.12))}
#dao-proj .dp-step.todo .dp-bar{background:rgba(245,233,209,.1)}
#dao-proj .dp-step:last-child .dp-bar{display:none}
#dao-proj .dp-tabs{display:flex;gap:4px;margin-top:34px;border-bottom:1px solid rgba(212,178,122,.12);position:sticky;top:0;background:#0A0908;z-index:5}
#dao-proj .dp-tab{padding:14px 18px;font-size:13px;font-weight:500;color:#9C968A;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;display:inline-flex;align-items:center;gap:8px;transition:color .15s;background:none;border-top:none;border-left:none;border-right:none;font-family:inherit}
#dao-proj .dp-tab:hover{color:#F5E9D1}
#dao-proj .dp-tab.active{color:#D4B27A;border-bottom-color:#D4B27A}
#dao-proj .dp-tab .ct{font-size:11px;padding:1px 7px;border-radius:999px;background:rgba(212,178,122,.12);color:#D4B27A}
#dao-proj .dp-panel{margin-top:30px;animation:dpRise .5s cubic-bezier(.16,1,.3,1)}
#dao-proj .dp-ov{display:grid;grid-template-columns:1fr 320px;gap:22px;align-items:start}
#dao-proj .dp-card{background:#14120D;border:1px solid rgba(212,178,122,.12);border-radius:16px;padding:26px 28px}
#dao-proj .dp-card+.dp-card{margin-top:18px}
#dao-proj .dp-clabel{font-size:10px;text-transform:uppercase;letter-spacing:.18em;color:#D4B27A;font-weight:500}
#dao-proj .dp-progrow{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-top:16px}
#dao-proj .dp-bignum{font-size:46px;font-weight:600;letter-spacing:-.03em;line-height:.9;color:#D4B27A}
#dao-proj .dp-bignum span{font-size:20px}
#dao-proj .dp-ptl{font-size:10px;text-transform:uppercase;letter-spacing:.15em;color:#9C968A}
#dao-proj .dp-ptv{font-size:16px;font-weight:500;margin-top:5px;text-align:right}
#dao-proj .dp-track{height:6px;border-radius:999px;background:rgba(245,233,209,.08);overflow:hidden;margin-top:18px}
#dao-proj .dp-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#D4B27A,#E5BB5C);transition:width 1.1s cubic-bezier(.16,1,.3,1)}
#dao-proj .dp-about-h{font-size:17px;font-weight:600}
#dao-proj .dp-about{font-size:15px;line-height:1.7;color:rgba(245,233,209,.75);margin-top:14px;white-space:pre-wrap}
#dao-proj .dp-meta{margin-top:16px;display:flex;flex-direction:column;gap:15px}
#dao-proj .dp-meta .k{font-size:9px;text-transform:uppercase;letter-spacing:.16em;color:#9C968A}
#dao-proj .dp-meta .val{font-size:14px;margin-top:3px;color:rgba(245,233,209,.9);word-break:break-word}
#dao-proj .dp-meta .val.gold{color:#D4B27A}
#dao-proj .dp-tl{position:relative;padding-left:30px}
#dao-proj .dp-tl::before{content:"";position:absolute;left:6px;top:6px;bottom:6px;width:2px;background:rgba(212,178,122,.14)}
#dao-proj .dp-ev{position:relative;padding-bottom:26px}
#dao-proj .dp-ev:last-child{padding-bottom:0}
#dao-proj .dp-ev::before{content:"";position:absolute;left:-29px;top:4px;width:12px;height:12px;border-radius:50%;background:#D4B27A;box-shadow:0 0 0 4px #0A0908}
#dao-proj .dp-ev-card{background:#14120D;border:1px solid rgba(212,178,122,.12);border-radius:14px;padding:20px 22px;transition:border-color .18s}
#dao-proj .dp-ev-card:hover{border-color:rgba(212,178,122,.24)}
#dao-proj .dp-ev-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}
#dao-proj .dp-ev-title{font-size:15px;font-weight:600}
#dao-proj .dp-ev-meta{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#6E6A60;margin-top:8px}
#dao-proj .dp-ev-body{font-size:14px;line-height:1.65;color:rgba(245,233,209,.7);margin-top:12px;white-space:pre-wrap}
#dao-proj .dp-ms-overview{background:#14120D;border:1px solid rgba(212,178,122,.12);border-radius:16px;padding:24px 28px;display:flex;align-items:center;gap:28px;margin-bottom:22px}
#dao-proj .dp-ms-bignum{font-size:40px;font-weight:600;letter-spacing:-.03em;color:#D4B27A;line-height:1}
#dao-proj .dp-ms-bignum span{font-size:18px}
#dao-proj .dp-ms-of{font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:#9C968A;margin-top:6px}
#dao-proj .dp-ms-track{flex:1}
#dao-proj .dp-empty{color:#9C968A;font-size:14px;padding:8px 0}
@media (max-width:980px){#dao-proj .dp-wrap{padding:24px 16px 60px}#dao-proj .dp-hero{grid-template-columns:1fr;gap:20px}#dao-proj .dp-ringwrap{justify-self:start}#dao-proj .dp-ov{grid-template-columns:1fr}#dao-proj .dp-steps{overflow-x:auto;padding-bottom:4px}#dao-proj .dp-step{min-width:104px}#dao-proj .dp-ms-overview{flex-direction:column;align-items:stretch}#dao-proj .dp-ms-track{width:100%}#dao-proj .dp-tabs{overflow-x:auto;flex-wrap:nowrap;-webkit-overflow-scrolling:touch}#dao-proj .dp-tabs::-webkit-scrollbar{display:none}#dao-proj .dp-tab{flex-shrink:0;padding:14px 14px;font-size:13px}#dao-proj .dp-title{font-size:28px}}
@media (max-width:540px){#dao-proj .dp-wrap{padding:18px 12px 50px}#dao-proj .dp-title{font-size:24px}#dao-proj .dp-journey{padding:18px 16px}#dao-proj .dp-journey-top{flex-direction:column;gap:4px;margin-bottom:18px}#dao-proj .dp-card{padding:20px 18px}#dao-proj .dp-bignum{font-size:38px}#dao-proj .dp-ev-card{padding:16px 16px}}
`;

const JOURNEY = [
  { key: 'proposal', label: 'Proposal' },
  { key: 'discovery', label: 'Discovery' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'review', label: 'Review' },
  { key: 'delivered', label: 'Delivered' },
];

function journeyState(status) {
  if (status === 'completed') return JOURNEY.map((s) => ({ ...s, state: 'done' }));
  const idx = JOURNEY.findIndex((s) => s.key === status);
  return JOURNEY.map((s, i) => ({
    ...s,
    state: idx === -1 ? 'todo' : i < idx ? 'done' : i === idx ? 'current' : 'todo',
  }));
}

const Check = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);

function Journey({ status }) {
  return (
    <div className="dp-journey dp-rise dp-d2">
      <div className="dp-journey-top">
        <span className="l">Project journey</span>
        <span className="r">{STATUS_META[status]?.label || status}</span>
      </div>
      <div className="dp-steps">
        {journeyState(status).map((s) => (
          <div key={s.key} className={`dp-step ${s.state}`}>
            <span className="dp-bar" />
            <span className="dp-node">
              {s.state === 'done' ? Check : s.state === 'current' ? <span className="dp-pulse" /> : null}
            </span>
            <span className="dp-slab">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Ring({ value }) {
  const C = 464.96;
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="dp-ringwrap">
      <svg width="168" height="168" viewBox="0 0 168 168">
        <defs>
          <linearGradient id="dpRingGradC" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D4B27A" />
            <stop offset="1" stopColor="#E5BB5C" />
          </linearGradient>
        </defs>
        <circle cx="84" cy="84" r="74" fill="none" stroke="rgba(245,233,209,0.08)" strokeWidth="9" />
        <circle cx="84" cy="84" r="74" fill="none" stroke="url(#dpRingGradC)" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)' }} />
      </svg>
      <div className="dp-ringctr">
        <div className="v dp-num">{pct}<span>%</span></div>
        <div className="lab">Overall</div>
      </div>
    </div>
  );
}

function fmtDate(d) {
  if (!d) return '—';
  const x = new Date(d);
  return isNaN(x.getTime()) ? '—' : x.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ProjectDetailClient({ project, milestones, updates, profile, initialTab = 'overview' }) {
  const [tab, setTab] = useState(initialTab);

  const statusMeta = STATUS_META[project.status] || { label: project.status, color: '#D4B27A' };
  const serviceLabel = SERVICE_TYPE_META[project.service_type]?.label;
  const doneMs = (milestones || []).filter((m) => m.status === 'completed').length;
  const totalMs = (milestones || []).length;
  const msPct = totalMs ? Math.round((doneMs / totalMs) * 100) : 0;

  return (
    <div id="dao-proj">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="dp-ambient" aria-hidden="true" />

      <div className="dp-wrap">
        <div className="dp-topbar dp-rise dp-d1">
          <Link href="/portal/dashboard" className="dp-back">← Dashboard</Link>
        </div>

        <div className="dp-hero dp-rise dp-d1">
          <div>
            {project.client?.company && <div className="dp-eyebrow">{project.client.company}</div>}
            <h1 className="dp-title">{project.name}</h1>
            <div className="dp-herochips">
              <span className="dp-badge" style={{ background: `${statusMeta.color}28`, color: statusMeta.color }}>
                <span className="dp-dot" style={{ background: statusMeta.color }} />
                {statusMeta.label}
              </span>
              {serviceLabel && <span className="dp-svc">{serviceLabel}</span>}
            </div>
          </div>
          <Ring value={project.progress_percentage} />
        </div>

        <Journey status={project.status} />

        <div className="dp-tabs dp-rise dp-d3">
          <button className={`dp-tab ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
          <button className={`dp-tab ${tab === 'updates' ? 'active' : ''}`} onClick={() => setTab('updates')}>
            Updates <span className="ct">{updates.length}</span>
          </button>
          <button className={`dp-tab ${tab === 'milestones' ? 'active' : ''}`} onClick={() => setTab('milestones')}>
            Milestones <span className="ct dp-num">{doneMs}/{totalMs}</span>
          </button>
          <button className={`dp-tab ${tab === 'files' ? 'active' : ''}`} onClick={() => setTab('files')}>Files</button>
          <button className={`dp-tab ${tab === 'chat' ? 'active' : ''}`} onClick={() => setTab('chat')}>Chat</button>
        </div>

        {/* ==================== OVERVIEW TAB ==================== */}
        {tab === 'overview' && (
          <div className="dp-panel">
            <div className="dp-ov">
              <div>
                {/* Progress */}
                <div className="dp-card">
                  <div className="dp-clabel">Progress</div>
                  <div className="dp-progrow">
                    <div className="dp-bignum dp-num">{project.progress_percentage ?? 0}<span>%</span></div>
                    <div>
                      <div className="dp-ptl">Target delivery</div>
                      <div className="dp-ptv dp-num">{fmtDate(project.target_date)}</div>
                    </div>
                  </div>
                  <div className="dp-track">
                    <div className="dp-fill" style={{ width: `${project.progress_percentage ?? 0}%` }} />
                  </div>
                </div>

                {/* About */}
                {project.description && (
                  <div className="dp-card">
                    <div className="dp-about-h">About this project</div>
                    <p className="dp-about">{project.description}</p>
                  </div>
                )}
              </div>

              {/* Sidebar — dates only */}
              <div>
                <div className="dp-card">
                  <div className="dp-clabel">Details</div>
                  <div className="dp-meta">
                    <div><div className="k">Started</div><div className="val dp-num">{fmtDate(project.start_date)}</div></div>
                    <div><div className="k">Target</div><div className="val dp-num">{fmtDate(project.target_date)}</div></div>
                    {project.completed_date && (
                      <div><div className="k">Completed</div><div className="val gold dp-num">{fmtDate(project.completed_date)}</div></div>
                    )}
                    {serviceLabel && (
                      <div><div className="k">Service</div><div className="val">{serviceLabel}</div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== UPDATES TAB ==================== */}
        {tab === 'updates' && (
          <div className="dp-panel">
            <div className="dp-tl">
              {updates.length === 0 && <p className="dp-empty">No updates yet. Check back soon.</p>}
              {updates.map((u) => (
                <div key={u.id} className="dp-ev">
                  <div className="dp-ev-card">
                    <div className="dp-ev-top">
                      <div className="dp-ev-title">{u.title}</div>
                    </div>
                    <div className="dp-ev-meta">
                      {fmtDate(u.created_at)}{u.author?.full_name ? ` · ${u.author.full_name}` : ''}
                    </div>
                    <div className="dp-ev-body">{u.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== MILESTONES TAB ==================== */}
        {tab === 'milestones' && (
          <div className="dp-panel">
            <div className="dp-ms-overview">
              <div>
                <div className="dp-ms-bignum dp-num">{msPct}<span>%</span></div>
                <div className="dp-ms-of dp-num">{doneMs} of {totalMs} complete</div>
              </div>
              <div className="dp-ms-track">
                <div className="dp-track" style={{ marginTop: 0 }}>
                  <div className="dp-fill" style={{ width: `${msPct}%` }} />
                </div>
              </div>
            </div>
            <div className="dp-card">
              <MilestoneTimeline milestones={milestones} />
            </div>
          </div>
        )}

        {/* ==================== FILES TAB ==================== */}
        {tab === 'files' && (
          <div className="dp-panel">
            <FilesSection projectId={project.id} isAdmin={false} />
          </div>
        )}

        {/* ==================== CHAT TAB ==================== */}
        {tab === 'chat' && (
          <div className="dp-panel">
            <Conversation
              projectId={project.id}
              currentUserId={profile?.id}
              isAdmin={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
