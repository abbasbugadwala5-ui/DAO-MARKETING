'use client';

import Link from 'next/link';

const STYLES = `
#dao-clients { padding: 40px 48px 64px; color: #F5E9D1; font-family: Inter, -apple-system, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
#dao-clients * { box-sizing: border-box; }
#dao-clients a { text-decoration: none; color: inherit; }
#dao-clients .dao-inner { max-width: 1180px; }
#dao-clients .dao-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: #D4B27A; }
#dao-clients .dao-hero { font-family: "Cormorant Garamond", Georgia, serif; font-size: 46px; font-weight: 500; font-style: italic; color: #F5E9D1; line-height: 1.05; margin-top: 10px; }
#dao-clients .dao-sub { font-size: 15px; color: #9C968A; margin-top: 10px; max-width: 560px; }
#dao-clients .dao-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 32px; }
#dao-clients .dao-stat { background: #14120D; border: 1px solid rgba(212,178,122,0.12); border-radius: 14px; padding: 18px 20px; }
#dao-clients .dao-slabel { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #9C968A; }
#dao-clients .dao-snum { font-family: Inter, -apple-system, system-ui, sans-serif; font-weight: 500; font-size: 40px; color: #D4B27A; line-height: 1; margin-top: 12px; }
#dao-clients .dao-list-head { display: flex; align-items: center; justify-content: space-between; margin: 44px 0 18px; gap: 16px; }
#dao-clients .dao-h2 { font-family: "Cormorant Garamond", Georgia, serif; font-size: 24px; font-weight: 500; font-style: italic; color: #F5E9D1; }
#dao-clients .dao-btn { display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 18px; border-radius: 9px; background: transparent; border: 1px solid rgba(212,178,122,0.22); color: #D4B27A; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.12em; transition: all 0.15s ease; white-space: nowrap; }
#dao-clients .dao-btn:hover { background: #D4B27A; color: #0A0908; border-color: #D4B27A; }
#dao-clients .dao-cards { display: flex; flex-direction: column; gap: 12px; }
#dao-clients .dao-empty { background: #14120D; border: 1px dashed rgba(212,178,122,0.2); border-radius: 14px; padding: 32px; text-align: center; color: #9C968A; font-size: 14px; }
#dao-clients .dao-card { display: flex; align-items: center; gap: 18px; background: #14120D; border: 1px solid rgba(212,178,122,0.12); border-radius: 14px; padding: 18px 22px; transition: border-color 0.15s ease, background 0.15s ease; }
#dao-clients .dao-card:hover { border-color: rgba(212,178,122,0.28); background: #1C1A14; }
#dao-clients .dao-card.inactive { opacity: 0.55; }
#dao-clients .dao-avatar { width: 46px; height: 46px; border-radius: 50%; flex-shrink: 0; background: rgba(212,178,122,0.12); border: 1px solid rgba(212,178,122,0.22); color: #D4B27A; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 500; letter-spacing: 0.05em; }
#dao-clients .dao-info { flex: 1; min-width: 0; }
#dao-clients .dao-name-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
#dao-clients .dao-name { font-size: 17px; font-weight: 500; color: #F5E9D1; }
#dao-clients .dao-company { font-size: 13px; color: rgba(245,233,209,0.6); margin-top: 3px; }
#dao-clients .dao-contact { display: flex; gap: 18px; margin-top: 8px; font-size: 12px; color: #9C968A; flex-wrap: wrap; }
#dao-clients .dao-contact .gold { color: rgba(212,178,122,0.78); }
#dao-clients .dao-pill { display: inline-flex; align-items: center; gap: 7px; padding: 4px 10px; border-radius: 999px; font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.12em; }
#dao-clients .dao-pill.active { background: rgba(94,156,114,0.16); color: #5B9C72; }
#dao-clients .dao-pill.idle { background: rgba(122,132,112,0.16); color: #9C968A; }
#dao-clients .dao-pill.deact { background: rgba(139,58,58,0.16); color: rgba(245,233,209,0.5); }
#dao-clients .dao-pdot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
#dao-clients .dao-meta { font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #6E6A60; text-align: right; flex-shrink: 0; }
#dao-clients .dao-meta strong { display: block; font-size: 18px; color: #D4B27A; font-family: Inter, -apple-system, system-ui, sans-serif; font-weight: 500; font-weight: 500; margin-bottom: 4px; text-transform: none; letter-spacing: 0; }
@media (max-width: 900px) {
  #dao-clients { padding: 28px 20px 48px; }
  #dao-clients .dao-stats { grid-template-columns: repeat(2, 1fr); }
  #dao-clients .dao-card { flex-wrap: wrap; }
  #dao-clients .dao-meta { text-align: left; width: 100%; }
  #dao-clients .dao-hero { font-size: 38px; }
  #dao-clients .dao-snum { font-size: 32px; }
  #dao-clients .dao-list-head { flex-wrap: wrap; }
}
@media (max-width: 540px) {
  #dao-clients { padding: 20px 14px 40px; }
  #dao-clients .dao-hero { font-size: 30px; }
  #dao-clients .dao-sub { font-size: 14px; }
  #dao-clients .dao-stats { grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 24px; }
  #dao-clients .dao-stat { padding: 14px 16px; }
  #dao-clients .dao-snum { font-size: 26px; margin-top: 8px; }
  #dao-clients .dao-slabel { font-size: 10px; }
  #dao-clients .dao-list-head { margin: 32px 0 14px; }
  #dao-clients .dao-h2 { font-size: 20px; }
  #dao-clients .dao-card { padding: 14px 16px; gap: 12px; }
  #dao-clients .dao-avatar { width: 40px; height: 40px; font-size: 13px; }
  #dao-clients .dao-name { font-size: 15px; }
  #dao-clients .dao-contact { gap: 12px; font-size: 11px; }
}
`;

function initials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function fmtDate(d) {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ClientsList({ clients = [], stats = {} }) {
  return (
    <div id="dao-clients">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="dao-inner">
        <div className="dao-eyebrow">Admin · Clients</div>
        <h1 className="dao-hero">Clients.</h1>
        <p className="dao-sub">All clients on DAO&apos;s books, with their project activity at a glance.</p>

        <div className="dao-stats">
          <div className="dao-stat">
            <div className="dao-slabel">Total clients</div>
            <div className="dao-snum">{stats.totalClients ?? 0}</div>
          </div>
          <div className="dao-stat">
            <div className="dao-slabel">Active clients</div>
            <div className="dao-snum">{stats.activeClients ?? 0}</div>
          </div>
          <div className="dao-stat">
            <div className="dao-slabel">Total projects</div>
            <div className="dao-snum">{stats.totalProjects ?? 0}</div>
          </div>
          <div className="dao-stat">
            <div className="dao-slabel">Avg per client</div>
            <div className="dao-snum">{stats.avgPerClient ?? '0.0'}</div>
          </div>
        </div>

        <div className="dao-list-head">
          <h2 className="dao-h2">All clients</h2>
          <Link href="/portal/clients/new" className="dao-btn">+ New client</Link>
        </div>

        <div className="dao-cards">
          {clients.length === 0 && (
            <div className="dao-empty">
              No clients yet. Click &ldquo;+ New client&rdquo; to add the first one.
            </div>
          )}

          {clients.map((c) => {
            const inactive = c.role === 'inactive';
            const pillClass = inactive ? 'deact' : c.is_active ? 'active' : 'idle';
            const pillLabel = inactive ? 'Deactivated' : c.is_active ? 'Active' : 'Inactive';

            return (
              <Link
                key={c.id}
                href={`/portal/clients/${c.id}`}
                className={`dao-card${inactive ? ' inactive' : ''}`}
              >
                <div className="dao-avatar">{initials(c.full_name)}</div>

                <div className="dao-info">
                  <div className="dao-name-row">
                    <span className="dao-name">{c.full_name}</span>
                    <span className={`dao-pill ${pillClass}`}>
                      <span className="dao-pdot" />
                      {pillLabel}
                    </span>
                  </div>
                  {c.company && <div className="dao-company">{c.company}</div>}
                  <div className="dao-contact">
                    {c.email && <span className="gold">{c.email}</span>}
                    {c.phone && <span>{c.phone}</span>}
                  </div>
                </div>

                <div className="dao-meta">
                  <strong>{c.project_count ?? 0}</strong>
                  project{(c.project_count ?? 0) === 1 ? '' : 's'}
                  {c.last_activity && (
                    <div style={{ marginTop: 8, fontSize: 10, color: '#6E6A60' }}>
                      Last · {fmtDate(c.last_activity)}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
