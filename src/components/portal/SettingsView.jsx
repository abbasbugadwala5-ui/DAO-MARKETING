'use client';

const STYLES = `
#dao-settings{color:#F5E9D1;font-family:Inter,-apple-system,system-ui,sans-serif;-webkit-font-smoothing:antialiased;position:relative}
#dao-settings *{box-sizing:border-box}
#dao-settings .ds-num{font-variant-numeric:tabular-nums}
#dao-settings .ds-ambient{position:absolute;top:-120px;left:10%;width:700px;height:440px;background:#D4B27A;opacity:.05;filter:blur(150px);border-radius:9999px;pointer-events:none;animation:dsDrift 9s ease-in-out infinite alternate}
@keyframes dsDrift{from{opacity:.035;transform:translateX(-30px)}to{opacity:.07;transform:translateX(40px)}}
#dao-settings .ds-wrap{max-width:920px;margin:0 auto;padding:40px 44px 80px;position:relative;z-index:1}
#dao-settings .ds-rise{opacity:0;transform:translateY(12px);animation:dsRise .7s cubic-bezier(.16,1,.3,1) forwards}
#dao-settings .ds-d1{animation-delay:.04s}#dao-settings .ds-d2{animation-delay:.12s}#dao-settings .ds-d3{animation-delay:.22s}#dao-settings .ds-d4{animation-delay:.3s}
@keyframes dsRise{to{opacity:1;transform:translateY(0)}}
#dao-settings .ds-eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.22em;color:#D4B27A;font-weight:500}
#dao-settings .ds-h1{font-size:32px;font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-top:12px}
#dao-settings .ds-sub{font-size:15px;color:#9C968A;margin-top:8px}
#dao-settings .ds-card{background:#14120D;border:1px solid rgba(212,178,122,.12);border-radius:18px;padding:30px 32px;margin-top:22px}
#dao-settings .ds-card-h{font-size:17px;font-weight:600;letter-spacing:-.01em}
#dao-settings .ds-acct-top{display:flex;align-items:center;gap:16px;margin-bottom:26px}
#dao-settings .ds-avatar{width:52px;height:52px;border-radius:50%;background:rgba(212,178,122,.14);border:1px solid rgba(212,178,122,.24);color:#D4B27A;display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:600;flex-shrink:0}
#dao-settings .ds-nm{font-size:17px;font-weight:600}
#dao-settings .ds-role-badge{display:inline-flex;align-items:center;gap:6px;margin-top:5px;padding:3px 10px;border-radius:999px;background:rgba(212,178,122,.14);color:#D4B27A;font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.1em}
#dao-settings .ds-role-badge .d{width:5px;height:5px;border-radius:50%;background:#D4B27A}
#dao-settings .ds-grid{display:grid;grid-template-columns:1fr 1fr;gap:26px 40px}
#dao-settings .ds-k{font-size:10px;text-transform:uppercase;letter-spacing:.18em;color:#9C968A}
#dao-settings .ds-v{font-size:16px;margin-top:7px;color:rgba(245,233,209,.92);word-break:break-word}
#dao-settings .ds-v.gold{color:#D4B27A}
#dao-settings .ds-soon-row{display:flex;align-items:flex-start;gap:16px;padding:18px 0;border-top:1px solid rgba(212,178,122,.12)}
#dao-settings .ds-soon-row:first-of-type{border-top:none;padding-top:22px}
#dao-settings .ds-soon-ic{width:40px;height:40px;border-radius:11px;background:rgba(212,178,122,.08);color:#D4B27A;display:flex;align-items:center;justify-content:center;flex-shrink:0}
#dao-settings .ds-soon-ic svg{width:19px;height:19px}
#dao-settings .ds-soon-main{flex:1;min-width:0}
#dao-settings .ds-soon-title{font-size:15px;font-weight:500;display:flex;align-items:center;gap:10px}
#dao-settings .ds-soon-pill{font-size:9px;text-transform:uppercase;letter-spacing:.12em;padding:3px 8px;border-radius:999px;border:1px solid rgba(212,178,122,.24);color:#9C968A;font-weight:500}
#dao-settings .ds-soon-desc{font-size:14px;line-height:1.55;color:rgba(245,233,209,.62);margin-top:6px}
#dao-settings .ds-need{font-size:14px;line-height:1.7;color:rgba(245,233,209,.7);margin-top:14px}
#dao-settings .ds-need b{color:rgba(245,233,209,.92);font-weight:600}
@media (max-width:760px){#dao-settings .ds-wrap{padding:28px 18px 60px}#dao-settings .ds-grid{grid-template-columns:1fr;gap:22px}}
`;

const ICON_LOCK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
const ICON_BELL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
);
const ICON_USER = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
);

function fmtDate(d) {
  if (!d) return '—';
  const x = new Date(d);
  return isNaN(x.getTime()) ? '—' : x.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function SettingsView({ user, profile }) {
  const isAdmin = profile?.role === 'admin';
  const name = profile?.full_name || user?.email || 'User';
  const email = user?.email;
  const role = profile?.role;
  const createdAt = profile?.created_at;
  const company = profile?.company;
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  const roleLabel = role || (isAdmin ? 'Admin' : 'Client');

  return (
    <div id="dao-settings">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="ds-ambient" aria-hidden="true" />
      <div className="ds-wrap">
        <div className="ds-rise ds-d1">
          <div className="ds-eyebrow">{isAdmin ? 'Admin' : 'Client'} · Settings</div>
          <h1 className="ds-h1">Settings</h1>
          <p className="ds-sub">Your account details and what&apos;s coming next to this section.</p>
        </div>

        <div className="ds-card ds-rise ds-d2">
          <div className="ds-acct-top">
            <div className="ds-avatar">{initial}</div>
            <div>
              <div className="ds-nm">{name}</div>
              <span className="ds-role-badge"><span className="d" />{roleLabel}</span>
            </div>
          </div>
          <div className="ds-grid">
            <div><div className="ds-k">Name</div><div className="ds-v">{profile?.full_name || '—'}</div></div>
            <div><div className="ds-k">Email</div><div className="ds-v gold">{email || '—'}</div></div>
            <div><div className="ds-k">Role</div><div className="ds-v">{roleLabel}</div></div>
            <div><div className="ds-k">Member since</div><div className="ds-v ds-num">{fmtDate(createdAt)}</div></div>
            {!isAdmin && company && (
              <div><div className="ds-k">Company</div><div className="ds-v">{company}</div></div>
            )}
            {profile?.phone && (
              <div><div className="ds-k">Phone</div><div className="ds-v ds-num">{profile.phone}</div></div>
            )}
          </div>
        </div>

        <div className="ds-card ds-rise ds-d3">
          <div className="ds-card-h">Coming soon</div>
          <div style={{ marginTop: 8 }}>
            <div className="ds-soon-row">
              <div className="ds-soon-ic">{ICON_LOCK}</div>
              <div className="ds-soon-main">
                <div className="ds-soon-title">Change password <span className="ds-soon-pill">Soon</span></div>
                <div className="ds-soon-desc">Update your own password without admin assistance.</div>
              </div>
            </div>
            <div className="ds-soon-row">
              <div className="ds-soon-ic">{ICON_BELL}</div>
              <div className="ds-soon-main">
                <div className="ds-soon-title">Email notifications <span className="ds-soon-pill">Soon</span></div>
                <div className="ds-soon-desc">Choose what triggers an email — new updates, milestone completions, file uploads.</div>
              </div>
            </div>
            <div className="ds-soon-row">
              <div className="ds-soon-ic">{ICON_USER}</div>
              <div className="ds-soon-main">
                <div className="ds-soon-title">Profile photo + display name <span className="ds-soon-pill">Soon</span></div>
                <div className="ds-soon-desc">Upload a profile photo and edit the name shown in your portal account.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ds-card ds-rise ds-d4">
          <div className="ds-card-h">Need anything changed?</div>
          {isAdmin ? (
            <p className="ds-need">
              Account changes for clients (password reset, deactivate, delete) live in the <b>Clients</b> section.
              For DAO team member changes, contact the project lead.
            </p>
          ) : (
            <p className="ds-need">
              Need a password reset or a change to your account? Message your <b>DAO project lead</b> and we&apos;ll take care of it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
