'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const STYLES = `
#dao-chat { color:#F5E9D1; font-family:Inter,-apple-system,system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
#dao-chat *{box-sizing:border-box}
#dao-chat .dc-wrap{background:#14120D;border:1px solid rgba(212,178,122,.12);border-radius:16px;display:flex;flex-direction:column;height:min(520px, calc(100vh - 340px));min-height:380px;overflow:hidden}
#dao-chat .dc-head{padding:12px 20px;border-bottom:1px solid rgba(212,178,122,.1);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-shrink:0}
#dao-chat .dc-head h3{font-family:"Cormorant Garamond",Georgia,serif;font-size:18px;font-style:italic;font-weight:500;color:#F5E9D1;line-height:1.15}
#dao-chat .dc-head .dc-sub{font-size:10px;text-transform:uppercase;letter-spacing:.16em;color:#9C968A;margin-top:2px}
#dao-chat .dc-feed{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}
#dao-chat .dc-feed::-webkit-scrollbar{width:6px}
#dao-chat .dc-feed::-webkit-scrollbar-thumb{background:rgba(212,178,122,.18);border-radius:999px}
#dao-chat .dc-day{align-self:center;font-size:10px;text-transform:uppercase;letter-spacing:.2em;color:#6E6A60;padding:6px 14px;background:rgba(245,233,209,.04);border-radius:999px;margin:8px 0 4px}
#dao-chat .dc-row{display:flex;gap:10px;max-width:88%}
#dao-chat .dc-row.mine{align-self:flex-end;flex-direction:row-reverse}
#dao-chat .dc-row.theirs{align-self:flex-start}
#dao-chat .dc-av{width:34px;height:34px;border-radius:50%;background:rgba(212,178,122,.14);border:1px solid rgba(212,178,122,.24);color:#D4B27A;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;flex-shrink:0}
#dao-chat .dc-av.client{background:rgba(168,194,180,.14);border-color:rgba(168,194,180,.24);color:#9EBFA8}
#dao-chat .dc-bubble-wrap{display:flex;flex-direction:column;min-width:0;gap:4px}
#dao-chat .dc-row.mine .dc-bubble-wrap{align-items:flex-end}
#dao-chat .dc-meta{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#6E6A60;padding:0 4px;display:flex;align-items:center;gap:8px}
#dao-chat .dc-meta .nm{color:#9C968A;font-weight:500}
#dao-chat .dc-meta .role{color:#D4B27A}
#dao-chat .dc-meta .edited{font-style:italic;color:#6E6A60}
#dao-chat .dc-bubble{background:#1C1A14;border:1px solid rgba(212,178,122,.12);border-radius:14px;padding:11px 15px;font-size:14.5px;line-height:1.55;color:rgba(245,233,209,.92);white-space:pre-wrap;word-break:break-word;max-width:100%}
#dao-chat .dc-row.mine .dc-bubble{background:rgba(212,178,122,.14);border-color:rgba(212,178,122,.28);color:#F5E9D1}
#dao-chat .dc-row.internal .dc-bubble{background:rgba(168,94,59,.1);border-color:rgba(168,94,59,.32);color:#E5BB9C}
#dao-chat .dc-row.internal .dc-meta::after{content:"🔒 Internal";font-size:9px;letter-spacing:.14em;padding:2px 8px;border-radius:999px;background:rgba(168,94,59,.18);color:#E08A8A}
#dao-chat .dc-row .dc-acts{display:flex;gap:8px;font-size:10px;text-transform:uppercase;letter-spacing:.12em;margin-top:2px;padding:0 4px;opacity:0;transition:opacity .15s}
#dao-chat .dc-row:hover .dc-acts{opacity:1}
#dao-chat .dc-row .dc-acts button{background:none;border:none;color:#6E6A60;cursor:pointer;font-family:inherit;font-size:10px;padding:0}
#dao-chat .dc-row .dc-acts button:hover{color:#D4B27A}
#dao-chat .dc-row .dc-acts button.del:hover{color:#C97A7A}
#dao-chat .dc-empty{align-self:center;text-align:center;color:#6E6A60;font-size:14px;padding:40px 20px;line-height:1.6}
#dao-chat .dc-empty .e-em{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:22px;color:#D4B27A;margin-bottom:8px}
#dao-chat .dc-error{background:rgba(139,58,58,.12);border:1px solid rgba(139,58,58,.4);color:#E08A8A;font-size:13px;padding:10px 14px;border-radius:9px;margin:14px 22px 0}
#dao-chat .dc-compose{border-top:1px solid rgba(212,178,122,.1);padding:10px 16px 12px;background:#100E0A;flex-shrink:0}
#dao-chat .dc-internal-toggle{display:flex;align-items:center;gap:8px;font-size:11px;color:#9C968A;margin-bottom:8px;cursor:pointer;text-transform:uppercase;letter-spacing:.12em}
#dao-chat .dc-internal-toggle input{accent-color:#C97A7A;width:14px;height:14px;cursor:pointer}
#dao-chat .dc-internal-toggle.on{color:#E08A8A}
#dao-chat .dc-input-row{display:flex;gap:10px;align-items:flex-end}
#dao-chat .dc-input{flex:1;min-width:0;background:#1C1A14;border:1px solid rgba(212,178,122,.18);border-radius:11px;padding:11px 14px;font-family:inherit;font-size:14.5px;color:#F5E9D1;outline:none;line-height:1.45;resize:none;max-height:120px;min-height:42px}
#dao-chat .dc-input:focus{border-color:rgba(212,178,122,.4);box-shadow:0 0 0 3px rgba(212,178,122,.12)}
#dao-chat .dc-input::placeholder{color:#6E6A60}
#dao-chat .dc-send{flex-shrink:0;width:42px;height:42px;border-radius:11px;background:#D4B27A;color:#0A0908;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s;font-family:inherit}
#dao-chat .dc-send:hover{background:#E5BB5C}
#dao-chat .dc-send:disabled{opacity:.45;cursor:not-allowed;background:rgba(212,178,122,.4)}
#dao-chat .dc-send svg{width:18px;height:18px}
#dao-chat .dc-counter{font-size:10px;color:#6E6A60;margin-top:6px;text-align:right;letter-spacing:.04em}
#dao-chat .dc-counter.warn{color:#C97A7A}
#dao-chat .dc-edit-bar{background:rgba(212,178,122,.08);border:1px solid rgba(212,178,122,.22);border-radius:9px;padding:8px 12px;margin-bottom:8px;font-size:12px;color:#D4B27A;display:flex;justify-content:space-between;align-items:center}
#dao-chat .dc-edit-bar button{background:none;border:none;color:#9C968A;cursor:pointer;font-family:inherit;font-size:11px;text-transform:uppercase;letter-spacing:.12em}
#dao-chat .dc-edit-bar button:hover{color:#D4B27A}

@media (max-width: 760px){
  #dao-chat .dc-wrap{height:min(440px, calc(100vh - 260px));min-height:340px;border-radius:14px}
  #dao-chat .dc-head{padding:10px 14px}
  #dao-chat .dc-head h3{font-size:16px}
  #dao-chat .dc-feed{padding:12px 12px;gap:10px}
  #dao-chat .dc-row{max-width:92%}
  #dao-chat .dc-av{width:28px;height:28px;font-size:11px}
  #dao-chat .dc-bubble{font-size:14px;padding:9px 12px}
  #dao-chat .dc-compose{padding:8px 12px 10px}
  #dao-chat .dc-input{font-size:16px;min-height:38px}  /* 16px prevents iOS zoom */
  #dao-chat .dc-send{width:38px;height:38px}
  #dao-chat .dc-acts{opacity:1 !important}
}
`;

const SEND_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

function initials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function dayLabel(date) {
  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const compare = new Date(d);
  compare.setHours(0, 0, 0, 0);
  if (compare.getTime() === today.getTime()) return 'Today';
  if (compare.getTime() === yesterday.getTime()) return 'Yesterday';
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function timeLabel(date) {
  return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function canEditOrDelete(message, currentUserId) {
  if (message.sender_id !== currentUserId) return false;
  const created = new Date(message.created_at).getTime();
  return Date.now() - created < 15 * 60 * 1000;
}

export default function Conversation({ projectId, currentUserId, isAdmin }) {
  const supabase = useMemo(() => createClient(), []);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [sending, setSending] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState('');
  const [editSaving, setEditSaving] = useState(false);

  const feedRef = useRef(null);
  const inputRef = useRef(null);

  // Mark all unread messages in this project as read for current user
  const markRead = useCallback(async () => {
    try {
      await fetch(`/api/portal/projects/${projectId}/messages/mark-read`, {
        method: 'POST',
      });
    } catch {}
  }, [projectId]);

  // Load messages
  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/portal/projects/${projectId}/messages`, {
        cache: 'no-store',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load messages');
      setMessages(data.messages || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  // Load + mark-read on mount
  useEffect(() => {
    load().then(() => markRead());
  }, [load, markRead]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  // Realtime subscription — refresh feed + mark-read whenever a new msg arrives while user is viewing this chat
  useEffect(() => {
    const channel = supabase
      .channel(`messages:${projectId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages', filter: `project_id=eq.${projectId}` },
        () => {
          load().then(() => markRead());
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [supabase, projectId, load, markRead]);

  // Auto-grow textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, [draft]);

  async function sendMessage(e) {
    if (e) e.preventDefault();
    const content = draft.trim();
    if (!content || sending) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch(`/api/portal/projects/${projectId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, is_internal: isInternal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      // Optimistically add (realtime will reconcile)
      setMessages((prev) => {
        if (prev.find((m) => m.id === data.message.id)) return prev;
        return [...prev, data.message];
      });
      setDraft('');
      setIsInternal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  async function saveEdit(id) {
    const content = editDraft.trim();
    if (!content || editSaving) return;
    setEditSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/portal/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to edit');
      setMessages((prev) => prev.map((m) => (m.id === id ? data.message : m)));
      setEditingId(null);
      setEditDraft('');
    } catch (err) {
      setError(err.message);
    } finally {
      setEditSaving(false);
    }
  }

  async function deleteMessage(id) {
    if (!window.confirm('Delete this message?')) return;
    setError('');
    try {
      const res = await fetch(`/api/portal/messages/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Group messages with day separators
  const rendered = useMemo(() => {
    const out = [];
    let lastDay = null;
    for (const m of messages) {
      const dl = dayLabel(m.created_at);
      if (dl !== lastDay) {
        out.push({ kind: 'day', id: `day-${dl}-${m.id}`, label: dl });
        lastDay = dl;
      }
      out.push({ kind: 'msg', ...m });
    }
    return out;
  }, [messages]);

  const draftRemaining = 4000 - draft.length;
  const counterClass = draftRemaining < 100 ? 'warn' : '';

  return (
    <div id="dao-chat">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="dc-wrap">
        <div className="dc-head">
          <div>
            <h3>Conversation</h3>
            <div className="dc-sub">{messages.length} message{messages.length === 1 ? '' : 's'}</div>
          </div>
        </div>

        {error && <div className="dc-error">{error}</div>}

        <div className="dc-feed" ref={feedRef}>
          {loading && <div className="dc-empty">Loading…</div>}

          {!loading && messages.length === 0 && (
            <div className="dc-empty">
              <div className="e-em">No messages yet.</div>
              {isAdmin ? 'Start the conversation — say hi to your client.' : 'Ask a question or share an update.'}
            </div>
          )}

          {rendered.map((item) => {
            if (item.kind === 'day') {
              return <div key={item.id} className="dc-day">{item.label}</div>;
            }
            const m = item;
            const mine = m.sender_id === currentUserId;
            const sender = m.sender || {};
            const senderRole = sender.role === 'admin' ? 'DAO' : 'Client';
            const isEditingThis = editingId === m.id;
            const editedFlag = m.updated_at && new Date(m.updated_at).getTime() - new Date(m.created_at).getTime() > 1000;
            const canEdit = canEditOrDelete(m, currentUserId);
            const canDelete = canEdit || isAdmin;
            const rowCls = ['dc-row', mine ? 'mine' : 'theirs', m.is_internal ? 'internal' : ''].filter(Boolean).join(' ');
            const avCls = ['dc-av', sender.role === 'admin' ? '' : 'client'].filter(Boolean).join(' ');

            return (
              <div key={m.id} className={rowCls}>
                <div className={avCls}>{initials(sender.full_name || sender.email)}</div>
                <div className="dc-bubble-wrap">
                  <div className="dc-meta">
                    <span className="nm">{sender.full_name || sender.email || 'Unknown'}</span>
                    <span className="role">· {senderRole}</span>
                    <span>· {timeLabel(m.created_at)}</span>
                    {editedFlag && <span className="edited">· edited</span>}
                  </div>

                  {isEditingThis ? (
                    <>
                      <div className="dc-edit-bar">
                        <span>Editing message</span>
                        <button type="button" onClick={() => { setEditingId(null); setEditDraft(''); }}>
                          Cancel
                        </button>
                      </div>
                      <textarea
                        className="dc-input"
                        value={editDraft}
                        onChange={(e) => setEditDraft(e.target.value)}
                        rows={2}
                      />
                      <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                        <button
                          type="button"
                          className="dc-send"
                          onClick={() => saveEdit(m.id)}
                          disabled={editSaving || !editDraft.trim()}
                          style={{ width: 'auto', padding: '0 16px', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}
                        >
                          {editSaving ? 'Saving…' : 'Save'}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="dc-bubble">{m.content}</div>
                      {(canEdit || canDelete) && (
                        <div className="dc-acts">
                          {canEdit && (
                            <button type="button" onClick={() => { setEditingId(m.id); setEditDraft(m.content); }}>
                              Edit
                            </button>
                          )}
                          {canDelete && (
                            <button type="button" className="del" onClick={() => deleteMessage(m.id)}>
                              Delete
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <form className="dc-compose" onSubmit={sendMessage}>
          {isAdmin && (
            <label className={`dc-internal-toggle ${isInternal ? 'on' : ''}`}>
              <input
                type="checkbox"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
              />
              <span>{isInternal ? '🔒 Internal note (DAO team only)' : 'Internal note?'}</span>
            </label>
          )}

          <div className="dc-input-row">
            <textarea
              ref={inputRef}
              className="dc-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKey}
              placeholder={isAdmin ? 'Message your client…' : 'Message DAO Marketing…'}
              rows={1}
              maxLength={4000}
              disabled={sending}
            />
            <button
              type="submit"
              className="dc-send"
              disabled={sending || !draft.trim()}
              aria-label="Send"
            >
              {SEND_ICON}
            </button>
          </div>

          {draft.length > 3500 && (
            <div className={`dc-counter ${counterClass}`}>
              {draftRemaining} characters left
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
