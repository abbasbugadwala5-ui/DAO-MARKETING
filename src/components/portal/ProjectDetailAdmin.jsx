'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PROJECT_STATUSES, STATUS_META, SERVICE_TYPES, SERVICE_TYPE_META } from '@/lib/portal/constants';
import MilestonesEditor from '@/components/portal/MilestonesEditor';
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
#dao-proj .dp-chip{font-size:9px;text-transform:uppercase;letter-spacing:.24em;color:rgba(212,178,122,.75);border:1px solid rgba(212,178,122,.24);padding:6px 12px;border-radius:999px}
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
#dao-proj .dp-tab{padding:14px 18px;font-size:13px;font-weight:500;color:#9C968A;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;display:inline-flex;align-items:center;gap:8px;transition:color .15s;background:none;border-top:none;border-left:none;border-right:none}
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
#dao-proj .dp-budget{font-size:26px;font-weight:600;letter-spacing:-.01em;color:#D4B27A;margin-top:14px}
#dao-proj .dp-budget-c{font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:#9C968A;margin-top:6px}
#dao-proj .dp-internal{background:rgba(168,94,59,.06);border-color:rgba(168,94,59,.25)}
#dao-proj .dp-internal .dp-clabel{color:#E08A8A}
#dao-proj .dp-internal p{font-size:13px;line-height:1.6;color:rgba(245,233,209,.72);white-space:pre-wrap;margin-top:14px}
#dao-proj .dp-sec-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;gap:12px;flex-wrap:wrap}
#dao-proj .dp-sec-head h2{font-size:18px;font-weight:600}
#dao-proj .dp-btn-gold{display:inline-flex;align-items:center;gap:7px;height:38px;padding:0 18px;border-radius:9px;background:#D4B27A;color:#0A0908;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;cursor:pointer;border:none;font-family:inherit}
#dao-proj .dp-btn-gold:hover{background:#E5BB5C}
#dao-proj .dp-btn-gold:disabled{opacity:.5;cursor:not-allowed}
#dao-proj .dp-btn-ghost{display:inline-flex;align-items:center;gap:7px;height:36px;padding:0 16px;border-radius:9px;border:1px solid rgba(212,178,122,.24);color:#D4B27A;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.08em;cursor:pointer;background:transparent;font-family:inherit}
#dao-proj .dp-btn-ghost:hover{background:rgba(212,178,122,.1);border-color:#D4B27A}
#dao-proj .dp-btn-ghost:disabled{opacity:.5;cursor:not-allowed}
#dao-proj .dp-error{border:1px solid rgba(139,58,58,.4);background:rgba(139,58,58,.12);border-radius:9px;padding:10px 14px;font-size:13px;color:#E08A8A;margin:10px 0}
#dao-proj .dp-tl{position:relative;padding-left:30px}
#dao-proj .dp-tl::before{content:"";position:absolute;left:6px;top:6px;bottom:6px;width:2px;background:rgba(212,178,122,.14)}
#dao-proj .dp-ev{position:relative;padding-bottom:26px}
#dao-proj .dp-ev:last-child{padding-bottom:0}
#dao-proj .dp-ev::before{content:"";position:absolute;left:-29px;top:4px;width:12px;height:12px;border-radius:50%;background:#D4B27A;box-shadow:0 0 0 4px #0A0908}
#dao-proj .dp-ev-card{background:#14120D;border:1px solid rgba(212,178,122,.12);border-radius:14px;padding:20px 22px;transition:border-color .18s}
#dao-proj .dp-ev-card:hover{border-color:rgba(212,178,122,.24)}
#dao-proj .dp-ev-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}
#dao-proj .dp-ev-title{font-size:15px;font-weight:600;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
#dao-proj .dp-vis{font-size:9px;text-transform:uppercase;letter-spacing:.1em;padding:3px 8px;border-radius:999px;background:rgba(111,168,138,.16);color:#6FA88A;font-weight:500}
#dao-proj .dp-internal-pill{font-size:9px;text-transform:uppercase;letter-spacing:.1em;padding:3px 8px;border-radius:999px;background:rgba(201,122,122,.16);color:#C97A7A;font-weight:500}
#dao-proj .dp-ev-act{display:flex;gap:14px;flex-shrink:0}
#dao-proj .dp-ev-act button{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#9C968A;background:none;border:none;cursor:pointer;font-family:inherit;padding:2px 4px}
#dao-proj .dp-ev-act button:hover{color:#D4B27A}
#dao-proj .dp-ev-act .del:hover{color:#C97A7A}
#dao-proj .dp-ev-meta{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#6E6A60;margin-top:8px}
#dao-proj .dp-ev-body{font-size:14px;line-height:1.65;color:rgba(245,233,209,.7);margin-top:12px;white-space:pre-wrap}
#dao-proj .dp-pf{background:#14120D;border:1px solid rgba(212,178,122,.2);border-radius:14px;padding:22px 24px;margin-bottom:20px}
#dao-proj .dp-label{font-size:10px;text-transform:uppercase;letter-spacing:.18em;color:rgba(245,233,209,.45);display:block;margin-bottom:6px;font-weight:500}
#dao-proj .dp-input,#dao-proj .dp-pf input,#dao-proj .dp-pf select,#dao-proj .dp-pf textarea{width:100%;border-radius:9px;border:1px solid rgba(212,178,122,.25);background:#0A0908;padding:10px 12px;font-size:14px;color:#F5E9D1;outline:none;font-family:inherit;-webkit-appearance:none;appearance:none}
#dao-proj .dp-pf input:focus,#dao-proj .dp-pf select:focus,#dao-proj .dp-pf textarea:focus,#dao-proj .dp-input:focus{border-color:#D4B27A;box-shadow:0 0 0 3px rgba(212,178,122,.15)}
#dao-proj .dp-pf textarea{line-height:1.5;resize:vertical}
#dao-proj .dp-pf input[type="range"]{padding:0;height:4px;background:rgba(245,233,209,.1);accent-color:#D4B27A;appearance:auto;-webkit-appearance:auto;border:none}
#dao-proj .dp-pf select option{background:#14120D;color:#F5E9D1}
#dao-proj .dp-pf input::placeholder,#dao-proj .dp-pf textarea::placeholder{color:rgba(245,233,209,.28)}
#dao-proj .dp-fg{display:flex;flex-direction:column;margin-bottom:14px}
#dao-proj .dp-fr2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
#dao-proj .dp-fr3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:14px}
#dao-proj .dp-frbudget{display:grid;grid-template-columns:1fr 120px;gap:12px;margin-bottom:14px}
#dao-proj .dp-pcthead{display:flex;justify-content:space-between;margin-bottom:6px}
#dao-proj .dp-pctval{font-size:13px;color:#D4B27A;font-weight:500}
#dao-proj .dp-prange{display:grid;grid-template-columns:1fr 80px;gap:10px;align-items:center}
#dao-proj .dp-prange input[type="number"]{text-align:center}
#dao-proj .dp-check{display:flex;align-items:center;gap:10px;cursor:pointer;font-size:13px;color:rgba(245,233,209,.75);padding:6px 0}
#dao-proj .dp-check input{width:16px;height:16px;accent-color:#D4B27A;flex-shrink:0}
#dao-proj .dp-actions{display:flex;gap:10px;margin-top:14px}
#dao-proj .dp-empty{color:#9C968A;font-size:14px;padding:8px 0}
#dao-proj .dp-topactions{display:flex;align-items:center;gap:10px}
#dao-proj .dp-btn-danger{display:inline-flex;align-items:center;gap:7px;height:32px;padding:0 14px;border-radius:8px;background:transparent;border:1px solid rgba(139,58,58,.4);color:#C97A7A;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;cursor:pointer;font-family:inherit;transition:all .15s ease}
#dao-proj .dp-btn-danger:hover{background:rgba(139,58,58,.15);border-color:#8B3A3A;color:#E08A8A}
#dao-proj .dp-btn-danger:disabled{opacity:.55;cursor:not-allowed}
#dao-proj .dp-modal-bg{position:fixed;inset:0;background:rgba(10,9,8,.85);display:flex;align-items:center;justify-content:center;padding:24px;z-index:50;backdrop-filter:blur(8px)}
#dao-proj .dp-modal{width:100%;max-width:520px;background:#14120D;border:1px solid rgba(139,58,58,.4);border-radius:18px;padding:30px 32px;box-shadow:0 30px 80px -20px rgba(0,0,0,.9)}
#dao-proj .dp-modal-eyebrow{font-size:10px;text-transform:uppercase;letter-spacing:.22em;color:#C97A7A;font-weight:500}
#dao-proj .dp-modal-title{font-family:"Cormorant Garamond",Georgia,serif;font-size:26px;font-weight:500;font-style:italic;color:#E08A8A;margin-top:6px;line-height:1.1}
#dao-proj .dp-modal p{font-size:14px;color:rgba(245,233,209,.7);line-height:1.6;margin-top:14px}
#dao-proj .dp-modal strong{color:#F5E9D1;font-weight:600}
#dao-proj .dp-warn-band{margin-top:18px;border:1px solid rgba(139,58,58,.35);background:rgba(139,58,58,.1);border-radius:9px;padding:12px 14px;font-size:13px;color:#E08A8A;line-height:1.55}
#dao-proj .dp-confirm-block{margin-top:20px}
#dao-proj .dp-confirm-block label{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.18em;color:#9C968A;margin-bottom:8px}
#dao-proj .dp-confirm-block input{width:100%;height:40px;background:#0A0908;border:1px solid rgba(139,58,58,.4);border-radius:8px;padding:0 13px;font-family:inherit;font-size:14px;color:#F5E9D1;outline:none}
#dao-proj .dp-confirm-block input:focus{border-color:#C97A7A;box-shadow:0 0 0 3px rgba(139,58,58,.18)}
#dao-proj .dp-modal-actions{display:flex;gap:10px;margin-top:22px;justify-content:flex-end}
#dao-proj .dp-modal-actions .dp-btn-ghost{height:38px;font-size:11px}
#dao-proj .dp-modal-actions .dp-btn-confirm{display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 20px;border-radius:9px;background:#8B3A3A;color:#F5E9D1;border:none;font-family:inherit;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;cursor:pointer;transition:background .15s ease}
#dao-proj .dp-modal-actions .dp-btn-confirm:hover{background:#A04545}
#dao-proj .dp-modal-actions .dp-btn-confirm:disabled{opacity:.55;cursor:not-allowed}
@media (max-width:980px){#dao-proj .dp-wrap{padding:24px 16px 60px}#dao-proj .dp-hero{grid-template-columns:1fr;gap:20px}#dao-proj .dp-ringwrap{justify-self:start}#dao-proj .dp-ov{grid-template-columns:1fr}#dao-proj .dp-steps{overflow-x:auto;padding-bottom:4px}#dao-proj .dp-step{min-width:104px}#dao-proj .dp-fr2,#dao-proj .dp-fr3,#dao-proj .dp-frbudget{grid-template-columns:1fr}#dao-proj .dp-tabs{overflow-x:auto;flex-wrap:nowrap;-webkit-overflow-scrolling:touch}#dao-proj .dp-tabs::-webkit-scrollbar{display:none}#dao-proj .dp-tab{flex-shrink:0;padding:14px 14px;font-size:13px}#dao-proj .dp-title{font-size:28px}#dao-proj .dp-topbar{flex-wrap:wrap;gap:10px}#dao-proj .dp-topactions{flex-wrap:wrap}#dao-proj .dp-sec-head{flex-direction:column;align-items:flex-start}#dao-proj .dp-modal{padding:24px 22px}}
@media (max-width:540px){#dao-proj .dp-wrap{padding:18px 12px 50px}#dao-proj .dp-title{font-size:24px}#dao-proj .dp-journey{padding:18px 16px}#dao-proj .dp-journey-top{flex-direction:column;gap:4px;margin-bottom:18px}#dao-proj .dp-card{padding:20px 18px}#dao-proj .dp-bignum{font-size:38px}#dao-proj .dp-pf{padding:18px 16px}#dao-proj .dp-ev-card{padding:16px 16px}#dao-proj .dp-ev-top{flex-direction:column;gap:8px}#dao-proj .dp-ev-act{align-self:flex-start}}
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
          <linearGradient id="dpRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D4B27A" />
            <stop offset="1" stopColor="#E5BB5C" />
          </linearGradient>
        </defs>
        <circle cx="84" cy="84" r="74" fill="none" stroke="rgba(245,233,209,0.08)" strokeWidth="9" />
        <circle cx="84" cy="84" r="74" fill="none" stroke="url(#dpRingGrad)" strokeWidth="9" strokeLinecap="round"
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

function toInputDate(d) {
  if (!d) return '';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

function initialForm(project) {
  return {
    name: project.name || '',
    description: project.description || '',
    service_type: project.service_type || '',
    status: project.status || 'proposal',
    progress_percentage: project.progress_percentage ?? 0,
    start_date: toInputDate(project.start_date),
    target_date: toInputDate(project.target_date),
    completed_date: toInputDate(project.completed_date),
    budget_range: project.budget_range || '',
    budget_currency: project.budget_currency || 'AED',
    notes_internal: project.notes_internal || '',
  };
}

export default function ProjectDetailAdmin({ project, milestones, updates, profile, initialTab = 'overview' }) {
  const router = useRouter();

  // ---------- Tab state (new) ----------
  const [tab, setTab] = useState(initialTab);

  // ---------- Project edit (preserved) ----------
  const [editing, setEditing] = useState(false);
  const [savingProject, setSavingProject] = useState(false);
  const [projectError, setProjectError] = useState('');
  const [form, setForm] = useState(() => initialForm(project));

  function field(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startEdit() {
    setForm(initialForm(project));
    setProjectError('');
    setEditing(true);
  }

  async function saveProject() {
    if (!form.name.trim()) {
      setProjectError('Project name cannot be empty.');
      return;
    }
    setSavingProject(true);
    setProjectError('');
    try {
      const res = await fetch(`/api/portal/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      setEditing(false);
      router.refresh();
    } catch (e) {
      setProjectError(e.message);
    } finally {
      setSavingProject(false);
    }
  }

  // ---------- New update (preserved) ----------
  const [showPost, setShowPost] = useState(false);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState('');
  const [newUpdate, setNewUpdate] = useState({ title: '', content: '', visible_to_client: true });

  async function postUpdate() {
    if (!newUpdate.title.trim() || !newUpdate.content.trim()) {
      setPostError('Title and content are required.');
      return;
    }
    setPosting(true);
    setPostError('');
    try {
      const res = await fetch(`/api/portal/projects/${project.id}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUpdate),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post update');
      setNewUpdate({ title: '', content: '', visible_to_client: true });
      setShowPost(false);
      router.refresh();
    } catch (e) {
      setPostError(e.message);
    } finally {
      setPosting(false);
    }
  }

  // ---------- Edit / delete update (preserved) ----------
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({ title: '', content: '', visible_to_client: true });
  const [rowBusy, setRowBusy] = useState(null);
  const [rowError, setRowError] = useState('');

  function beginEdit(u) {
    setEditingId(u.id);
    setEditDraft({ title: u.title, content: u.content, visible_to_client: u.visible_to_client });
    setRowError('');
  }

  async function saveEdit(uid) {
    if (!editDraft.title.trim() || !editDraft.content.trim()) {
      setRowError('Title and content are required.');
      return;
    }
    setRowBusy(uid);
    setRowError('');
    try {
      const res = await fetch(`/api/portal/updates/${uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editDraft),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');
      setEditingId(null);
      router.refresh();
    } catch (e) {
      setRowError(e.message);
    } finally {
      setRowBusy(null);
    }
  }

  async function deleteUpdate(uid) {
    if (!window.confirm('Delete this update? This cannot be undone.')) return;
    setRowBusy(uid);
    setRowError('');
    try {
      const res = await fetch(`/api/portal/updates/${uid}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      router.refresh();
    } catch (e) {
      setRowError(e.message);
    } finally {
      setRowBusy(null);
    }
  }

  // ---------- Delete project ----------
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [deletingProject, setDeletingProject] = useState(false);
  const [deleteProjectError, setDeleteProjectError] = useState('');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  async function deleteProject() {
    setDeletingProject(true);
    setDeleteProjectError('');
    try {
      const res = await fetch(`/api/portal/projects/${project.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to delete project');
      router.push('/portal/dashboard');
      router.refresh();
    } catch (e) {
      setDeleteProjectError(e.message);
      setDeletingProject(false);
    }
  }

  const client = project.client || {};
  const statusMeta = STATUS_META[project.status] || { label: project.status, color: '#D4B27A' };
  const serviceLabel = SERVICE_TYPE_META[project.service_type]?.label;
  const doneMs = (milestones || []).filter((m) => m.status === 'completed').length;
  const totalMs = (milestones || []).length;

  return (
    <div id="dao-proj">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="dp-ambient" aria-hidden="true" />

      <div className="dp-wrap">
        {/* Top bar */}
        <div className="dp-topbar dp-rise dp-d1">
          <Link href="/portal/dashboard" className="dp-back">← Dashboard</Link>
          <div className="dp-topactions">
            <span className="dp-chip">Admin · Project</span>
            <button
              type="button"
              onClick={() => { setShowDeleteProject(true); setDeleteConfirmText(''); setDeleteProjectError(''); }}
              className="dp-btn-danger"
            >
              Delete project
            </button>
          </div>
        </div>

        {/* Hero with name + ring */}
        <div className="dp-hero dp-rise dp-d1">
          <div>
            <div className="dp-eyebrow">Project</div>
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

        {/* Project journey */}
        <Journey status={project.status} />

        {/* Tabs */}
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
              {/* Main column */}
              <div>
                {/* Progress + Edit details */}
                <div className="dp-card">
                  <div className="dp-clabel">Overall progress</div>
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

                  {!editing && (
                    <div style={{ marginTop: 22 }}>
                      <button onClick={startEdit} className="dp-btn-ghost">Edit details</button>
                    </div>
                  )}
                </div>

                {/* Edit form (project) */}
                {editing && (
                  <div className="dp-pf">
                    <div className="dp-fg">
                      <label className="dp-label">Project name</label>
                      <input value={form.name} onChange={(e) => field('name', e.target.value)} />
                    </div>

                    <div className="dp-fr2">
                      <div className="dp-fg">
                        <label className="dp-label">Status</label>
                        <select value={form.status} onChange={(e) => field('status', e.target.value)}>
                          {PROJECT_STATUSES.map((s) => (
                            <option key={s} value={s}>{STATUS_META[s]?.label || s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="dp-fg">
                        <label className="dp-label">Service type</label>
                        <select value={form.service_type} onChange={(e) => field('service_type', e.target.value)}>
                          <option value="">— Select service type —</option>
                          {SERVICE_TYPES.map((s) => (
                            <option key={s} value={s}>{SERVICE_TYPE_META[s]?.label || s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="dp-fg">
                      <div className="dp-pcthead">
                        <label className="dp-label" style={{ marginBottom: 0 }}>Progress</label>
                        <span className="dp-pctval">{form.progress_percentage}%</span>
                      </div>
                      <div className="dp-prange">
                        <input type="range" min="0" max="100" value={form.progress_percentage}
                          onChange={(e) => field('progress_percentage', Number(e.target.value))} />
                        <input type="number" min="0" max="100" value={form.progress_percentage}
                          onChange={(e) => field('progress_percentage', Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="dp-fr3">
                      <div className="dp-fg">
                        <label className="dp-label">Start date</label>
                        <input type="date" value={form.start_date} onChange={(e) => field('start_date', e.target.value)} />
                      </div>
                      <div className="dp-fg">
                        <label className="dp-label">Target date</label>
                        <input type="date" value={form.target_date} onChange={(e) => field('target_date', e.target.value)} />
                      </div>
                      <div className="dp-fg">
                        <label className="dp-label">Completed date</label>
                        <input type="date" value={form.completed_date} onChange={(e) => field('completed_date', e.target.value)} />
                      </div>
                    </div>

                    <div className="dp-frbudget">
                      <div className="dp-fg">
                        <label className="dp-label">Budget range</label>
                        <input value={form.budget_range} onChange={(e) => field('budget_range', e.target.value)} placeholder="e.g. 18,000–25,000" />
                      </div>
                      <div className="dp-fg">
                        <label className="dp-label">Currency</label>
                        <input value={form.budget_currency} onChange={(e) => field('budget_currency', e.target.value)} />
                      </div>
                    </div>

                    <div className="dp-fg">
                      <label className="dp-label">Description</label>
                      <textarea rows={3} value={form.description} onChange={(e) => field('description', e.target.value)} />
                    </div>

                    <div className="dp-fg">
                      <label className="dp-label">Internal notes (never shown to client)</label>
                      <textarea rows={2} value={form.notes_internal} onChange={(e) => field('notes_internal', e.target.value)} />
                    </div>

                    {projectError && <div className="dp-error">{projectError}</div>}

                    <div className="dp-actions">
                      <button onClick={saveProject} disabled={savingProject} className="dp-btn-gold">
                        {savingProject ? 'Saving…' : 'Save changes'}
                      </button>
                      <button onClick={() => setEditing(false)} disabled={savingProject} className="dp-btn-ghost">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* About this project */}
                {!editing && project.description && (
                  <div className="dp-card">
                    <div className="dp-about-h">About this project</div>
                    <p className="dp-about">{project.description}</p>
                  </div>
                )}
              </div>

              {/* Sidebar column */}
              <div>
                {/* Client */}
                <div className="dp-card">
                  <div className="dp-clabel">Client</div>
                  <div className="dp-meta">
                    {client.full_name && <div><div className="k">Name</div><div className="val">{client.full_name}</div></div>}
                    {client.company && <div><div className="k">Company</div><div className="val">{client.company}</div></div>}
                    {client.email && <div><div className="k">Email</div><div className="val gold">{client.email}</div></div>}
                    {client.phone && <div><div className="k">Phone</div><div className="val dp-num">{client.phone}</div></div>}
                  </div>
                </div>

                {/* Timeline */}
                <div className="dp-card">
                  <div className="dp-clabel">Timeline</div>
                  <div className="dp-meta">
                    <div><div className="k">Started</div><div className="val dp-num">{fmtDate(project.start_date)}</div></div>
                    <div><div className="k">Due</div><div className="val dp-num">{fmtDate(project.target_date)}</div></div>
                    {project.completed_date && <div><div className="k">Completed</div><div className="val dp-num">{fmtDate(project.completed_date)}</div></div>}
                    <div><div className="k">Created</div><div className="val dp-num">{fmtDate(project.created_at)}</div></div>
                    <div><div className="k">Last updated</div><div className="val dp-num">{fmtDate(project.updated_at)}</div></div>
                  </div>
                </div>

                {/* Budget */}
                {(project.budget_range || project.budget_currency) && (
                  <div className="dp-card">
                    <div className="dp-clabel">Budget</div>
                    <div className="dp-budget dp-num">{project.budget_range || '—'}</div>
                    {project.budget_currency && <div className="dp-budget-c">{project.budget_currency}</div>}
                  </div>
                )}

                {/* Internal notes (admin-only) */}
                {project.notes_internal && (
                  <div className="dp-card dp-internal">
                    <div className="dp-clabel">Internal notes</div>
                    <p>{project.notes_internal}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== UPDATES TAB ==================== */}
        {tab === 'updates' && (
          <div className="dp-panel">
            <div className="dp-sec-head">
              <h2>Updates</h2>
              {!showPost && (
                <button onClick={() => setShowPost(true)} className="dp-btn-gold">+ Post update</button>
              )}
            </div>

            {/* Post update form */}
            {showPost && (
              <div className="dp-pf">
                <div className="dp-fg">
                  <label className="dp-label">Title</label>
                  <input value={newUpdate.title} placeholder="e.g. Homepage hero shipped"
                    onChange={(e) => setNewUpdate((u) => ({ ...u, title: e.target.value }))} />
                </div>
                <div className="dp-fg">
                  <label className="dp-label">Content</label>
                  <textarea rows={4} value={newUpdate.content} placeholder="What progressed, what's next…"
                    onChange={(e) => setNewUpdate((u) => ({ ...u, content: e.target.value }))} />
                </div>
                <label className="dp-check">
                  <input type="checkbox" checked={newUpdate.visible_to_client}
                    onChange={(e) => setNewUpdate((u) => ({ ...u, visible_to_client: e.target.checked }))} />
                  <span>Publish to client</span>
                </label>
                {postError && <div className="dp-error">{postError}</div>}
                <div className="dp-actions">
                  <button onClick={postUpdate} disabled={posting} className="dp-btn-gold">
                    {posting ? 'Posting…' : 'Publish update'}
                  </button>
                  <button onClick={() => { setShowPost(false); setPostError(''); }} disabled={posting} className="dp-btn-ghost">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {rowError && <div className="dp-error">{rowError}</div>}

            <div className="dp-tl">
              {updates.length === 0 && !showPost && <p className="dp-empty">No updates yet.</p>}

              {updates.map((u) => (
                <div key={u.id} className="dp-ev">
                  {editingId === u.id ? (
                    <div className="dp-pf" style={{ marginBottom: 0 }}>
                      <div className="dp-fg">
                        <label className="dp-label">Title</label>
                        <input value={editDraft.title}
                          onChange={(e) => setEditDraft((d) => ({ ...d, title: e.target.value }))} />
                      </div>
                      <div className="dp-fg">
                        <label className="dp-label">Content</label>
                        <textarea rows={4} value={editDraft.content}
                          onChange={(e) => setEditDraft((d) => ({ ...d, content: e.target.value }))} />
                      </div>
                      <label className="dp-check">
                        <input type="checkbox" checked={editDraft.visible_to_client}
                          onChange={(e) => setEditDraft((d) => ({ ...d, visible_to_client: e.target.checked }))} />
                        <span>Visible to client</span>
                      </label>
                      <div className="dp-actions">
                        <button onClick={() => saveEdit(u.id)} disabled={rowBusy === u.id} className="dp-btn-gold">
                          {rowBusy === u.id ? 'Saving…' : 'Save'}
                        </button>
                        <button onClick={() => setEditingId(null)} disabled={rowBusy === u.id} className="dp-btn-ghost">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="dp-ev-card">
                      <div className="dp-ev-top">
                        <div className="dp-ev-title">
                          {u.title}
                          {u.visible_to_client ? <span className="dp-vis">Visible</span> : <span className="dp-internal-pill">Internal</span>}
                        </div>
                        <div className="dp-ev-act">
                          <button onClick={() => beginEdit(u)} disabled={rowBusy === u.id}>Edit</button>
                          <button onClick={() => deleteUpdate(u.id)} disabled={rowBusy === u.id} className="del">
                            {rowBusy === u.id ? '…' : 'Delete'}
                          </button>
                        </div>
                      </div>
                      <div className="dp-ev-meta">
                        {fmtDate(u.created_at)}{u.author?.full_name ? ` · ${u.author.full_name}` : ''}
                      </div>
                      <div className="dp-ev-body">{u.content}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== MILESTONES TAB ==================== */}
        {tab === 'milestones' && (
          <div className="dp-panel">
            <MilestonesEditor projectId={project.id} milestones={milestones} />
          </div>
        )}

        {/* ==================== FILES TAB ==================== */}
        {tab === 'files' && (
          <div className="dp-panel">
            <FilesSection projectId={project.id} isAdmin={true} />
          </div>
        )}

        {/* ==================== CHAT TAB ==================== */}
        {tab === 'chat' && (
          <div className="dp-panel">
            <Conversation
              projectId={project.id}
              currentUserId={profile?.id}
              isAdmin={true}
            />
          </div>
        )}
      </div>

      {/* Delete project modal */}
      {showDeleteProject && (
        <div className="dp-modal-bg" role="dialog" aria-modal="true">
          <div className="dp-modal">
            <div className="dp-modal-eyebrow">Danger zone</div>
            <div className="dp-modal-title">Delete this project?</div>
            <p>
              This permanently deletes <strong>{project.name}</strong> along with all its
              milestones, updates, and uploaded files. This cannot be undone.
            </p>

            <div className="dp-warn-band">
              <strong>{(milestones || []).length}</strong> milestone{(milestones || []).length === 1 ? '' : 's'},{' '}
              <strong>{(updates || []).length}</strong> update{(updates || []).length === 1 ? '' : 's'}, and all
              attached files will be erased from storage.
            </div>

            <div className="dp-confirm-block">
              <label>Type DELETE to confirm</label>
              <input
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                autoFocus
                disabled={deletingProject}
              />
            </div>

            {deleteProjectError && <div className="dp-error">{deleteProjectError}</div>}

            <div className="dp-modal-actions">
              <button
                type="button"
                onClick={() => { setShowDeleteProject(false); setDeleteProjectError(''); }}
                disabled={deletingProject}
                className="dp-btn-ghost"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteProject}
                disabled={deletingProject || deleteConfirmText.trim() !== 'DELETE'}
                className="dp-btn-confirm"
              >
                {deletingProject ? 'Deleting…' : 'Delete forever'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
