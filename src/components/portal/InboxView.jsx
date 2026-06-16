'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const STYLES = `
#dao-inbox{color:#F5E9D1;font-family:Inter,-apple-system,system-ui,sans-serif;-webkit-font-smoothing:antialiased;position:relative;padding:38px 48px 60px}
#dao-inbox *{box-sizing:border-box}
#dao-inbox a{text-decoration:none;color:inherit}
#dao-inbox .di-num{font-variant-numeric:tabular-nums}
#dao-inbox .di-ambient{position:absolute;top:-120px;left:14%;width:680px;height:440px;background:#D4B27A;opacity:.05;filter:blur(150px);border-radius:9999px;pointer-events:none;animation:diDrift 9s ease-in-out infinite alternate}
@keyframes diDrift{from{opacity:.035;transform:translateX(-30px)}to{opacity:.07;transform:translateX(40px)}}
#dao-inbox .di-inner{max-width:920px;position:relative;z-index:1}
#dao-inbox .di-rise{opacity:0;transform:translateY(12px);animation:diRise .7s cubic-bezier(.16,1,.3,1) forwards}
#dao-inbox .di-d1{animation-delay:.05s}#dao-inbox .di-d2{animation-delay:.14s}
@keyframes diRise{to{opacity:1;transform:translateY(0)}}
#dao-inbox .di-eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.22em;color:#D4B27A;font-weight:500}
#dao-inbox .di-hero{font-family:"Cormorant Garamond",Georgia,serif;font-size:46px;font-weight:500;font-style:italic;color:#F5E9D1;line-height:1.05;margin-top:10px}
#dao-inbox .di-sub{font-size:15px;color:#9C968A;margin-top:10px}
#dao-inbox .di-list{display:flex;flex-direction:column;gap:12px;margin-top:32px}
#dao-inbox .di-card{background:#14120D;border:1px solid rgba(212,178,122,.14);border-radius:14px;padding:20px 22px;transition:border-color .15s ease,background .15s ease;display:block}
#dao-inbox .di-card:hover{border-color:rgba(212,178,122,.32);background:#1C1A14}
#dao-inbox .di-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}
#dao-inbox .di-pname{font-size:16px;font-weight:500;color:#F5E9D1;line-height:1.3}
#dao-inbox .di-cname{font-size:12px;color:#9C968A;margin-top:4px}
#dao-inbox .di-count{display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:26px;border-radius:999px;background:#D4B27A;color:#0A0908;font-size:12px;font-weight:600;padding:0 8px;flex-shrink:0}
#dao-inbox .di-last{margin-top:12px;font-size:14px;line-height:1.55;color:rgba(245,233,209,.78);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;white-space:pre-wrap}
#dao-inbox .di-meta{margin-top:10px;display:flex;align-items:center;gap:10px;font-size:11px;color:#6E6A60;text-transform:uppercase;letter-spacing:.13em;flex-wrap:wrap}
#dao-inbox .di-meta .nm{color:#9C968A}
#dao-inbox .di-meta .role{color:#D4B27A}
#dao-inbox .di-meta .int{color:#E08A8A}
#dao-inbox .di-arrow{color:#D4B27A;font-size:12px;text-transform:uppercase;letter-spacing:.14em}
#dao-inbox .di-empty{background:#14120D;border:1px dashed rgba(212,178,122,.2);border-radius:16px;padding:48px 28px;text-align:center;margin-top:32px}
#dao-inbox .di-empty-em{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:28px;color:#D4B27A;line-height:1.1}
#dao-inbox .di-empty-sub{font-size:14px;color:#9C968A;margin-top:10px;line-height:1.55}
#dao-inbox .di-loading{padding:40px;text-align:center;color:#9C968A;font-size:14px}
#dao-inbox .di-error{border:1px solid rgba(139,58,58,.4);background:rgba(139,58,58,.12);border-radius:9px;padding:10px 14px;font-size:13px;color:#E08A8A;margin-top:18px}
@media (max-width:900px){
  #dao-inbox{padding:28px 20px 48px}
  #dao-inbox .di-hero{font-size:36px}
}
@media (max-width:540px){
  #dao-inbox{padding:20px 14px 40px}
  #dao-inbox .di-hero{font-size:28px}
  #dao-inbox .di-sub{font-size:14px}
  #dao-inbox .di-card{padding:16px 18px}
  #dao-inbox .di-pname{font-size:15px}
  #dao-inbox .di-last{font-size:13px}
  #dao-inbox .di-empty{padding:36px 20px}
  #dao-inbox .di-empty-em{font-size:24px}
}
`;

function relTime(date) {
  const d = new Date(date);
  const now = Date.now();
  const diff = Math.max(0, now - d.getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} day${day === 1 ? '' : 's'} ago`;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export default function InboxView({ isAdmin, currentUserId }) {
  const supabase = useMemo(() => createClient(), []);
  const [conversations, setConversations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/portal/inbox', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load inbox');
      setConversations(data.conversations || []);
      setTotal(data.total || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Realtime: refresh on any message change relevant to this user
  useEffect(() => {
    const channel = supabase
      .channel('inbox-global')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => { load(); }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [supabase, load]);

  return (
    <div id="dao-inbox">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="di-ambient" aria-hidden="true" />

      <div className="di-inner">
        <div className="di-rise di-d1">
          <div className="di-eyebrow">{isAdmin ? 'Admin' : 'Client'} · Inbox</div>
          <h1 className="di-hero">Inbox.</h1>
          <p className="di-sub">
            {total === 0
              ? 'No unread messages. You\'re all caught up.'
              : `${total} unread message${total === 1 ? '' : 's'} across ${conversations.length} project${conversations.length === 1 ? '' : 's'}.`}
          </p>
        </div>

        {error && <div className="di-error">{error}</div>}

        {loading && <div className="di-loading">Loading…</div>}

        {!loading && conversations.length === 0 && !error && (
          <div className="di-empty di-rise di-d2">
            <div className="di-empty-em">All caught up.</div>
            <div className="di-empty-sub">
              When someone sends you a new message, it&apos;ll appear here first.
            </div>
          </div>
        )}

        {!loading && conversations.length > 0 && (
          <div className="di-list di-rise di-d2">
            {conversations.map((c) => (
              <Link key={c.project_id} href={`/portal/projects/${c.project_id}?tab=chat`} className="di-card">
                <div className="di-top">
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="di-pname">{c.project_name}</div>
                    {isAdmin && (c.client_name || c.client_company) && (
                      <div className="di-cname">
                        {c.client_name}{c.client_company ? ` · ${c.client_company}` : ''}
                      </div>
                    )}
                  </div>
                  <span className="di-count di-num">{c.unread_count}</span>
                </div>

                {c.latest && (
                  <>
                    <div className="di-last">{c.latest.content}</div>
                    <div className="di-meta">
                      <span className="nm">{c.latest.sender_name || 'Unknown'}</span>
                      <span className="role">· {c.latest.sender_role === 'admin' ? 'DAO' : 'Client'}</span>
                      <span>· {relTime(c.latest.created_at)}</span>
                      {c.latest.is_internal && <span className="int">· 🔒 Internal</span>}
                      <span style={{ marginLeft: 'auto' }} className="di-arrow">Open →</span>
                    </div>
                  </>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
