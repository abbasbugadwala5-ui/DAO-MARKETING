'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const STYLES = `
#dao-new-client { padding: 40px 48px 64px; color: #F5E9D1; font-family: Inter, -apple-system, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
#dao-new-client * { box-sizing: border-box; }
#dao-new-client a { text-decoration: none; color: inherit; }
#dao-new-client .dao-inner { max-width: 640px; }
#dao-new-client .dao-back { font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #9C968A; transition: color 0.15s ease; }
#dao-new-client .dao-back:hover { color: #D4B27A; }
#dao-new-client .dao-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: #D4B27A; margin-top: 28px; }
#dao-new-client .dao-hero { font-family: "Cormorant Garamond", Georgia, serif; font-size: 46px; font-weight: 500; font-style: italic; color: #F5E9D1; line-height: 1.05; margin-top: 10px; }
#dao-new-client .dao-sub { font-size: 15px; color: #9C968A; margin-top: 10px; max-width: 520px; }
#dao-new-client .dao-card { background: #14120D; border: 1px solid rgba(212,178,122,0.14); border-radius: 16px; padding: 28px 30px; margin-top: 36px; }
#dao-new-client .dao-group { margin-bottom: 22px; }
#dao-new-client .dao-label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #9C968A; margin-bottom: 8px; }
#dao-new-client .dao-label .req { color: #D4B27A; margin-left: 3px; }
#dao-new-client input { width: 100%; height: 42px; background: #0F0E0C; border: 1px solid #3A362D; border-radius: 8px; padding: 0 14px; font-family: inherit; font-size: 14px; color: #F5E9D1; outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease; -webkit-appearance: none; appearance: none; }
#dao-new-client input::placeholder { color: rgba(245,233,209,0.28); }
#dao-new-client input:focus { border-color: #D4B27A; box-shadow: 0 0 0 3px rgba(212,178,122,0.15); }
#dao-new-client .dao-help { font-size: 11px; color: #6E6A60; margin-top: 6px; }
#dao-new-client .dao-error { border: 1px solid rgba(139,58,58,0.4); background: rgba(139,58,58,0.12); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #E08A8A; margin-bottom: 16px; }
#dao-new-client .dao-actions { display: flex; gap: 12px; margin-top: 24px; }
#dao-new-client .dao-btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 42px; padding: 0 24px; border-radius: 9px; background: #D4B27A; color: #0A0908; border: none; font-family: inherit; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; transition: background 0.15s ease; }
#dao-new-client .dao-btn-primary:hover { background: #E5BB5C; }
#dao-new-client .dao-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
#dao-new-client .dao-btn-ghost { display: inline-flex; align-items: center; justify-content: center; height: 42px; padding: 0 22px; border-radius: 9px; background: transparent; border: 1px solid rgba(212,178,122,0.22); color: #D4B27A; font-family: inherit; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; transition: all 0.15s ease; }
#dao-new-client .dao-btn-ghost:hover { background: #D4B27A; color: #0A0908; border-color: #D4B27A; }

/* Modal */
#dao-new-client .dao-modal-bg { position: fixed; inset: 0; background: rgba(10,9,8,0.85); display: flex; align-items: center; justify-content: center; padding: 24px; z-index: 50; backdrop-filter: blur(8px); }
#dao-new-client .dao-modal { width: 100%; max-width: 520px; background: #14120D; border: 1px solid rgba(212,178,122,0.25); border-radius: 18px; padding: 32px; box-shadow: 0 30px 80px -20px rgba(0,0,0,0.9); }
#dao-new-client .dao-modal-head { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }
#dao-new-client .dao-modal-tick { width: 40px; height: 40px; border-radius: 50%; background: rgba(94,156,114,0.18); color: #5B9C72; display: flex; align-items: center; justify-content: center; font-size: 18px; }
#dao-new-client .dao-modal-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: #5B9C72; }
#dao-new-client .dao-modal-title { font-family: "Cormorant Garamond", Georgia, serif; font-size: 24px; font-weight: 500; font-style: italic; color: #F5E9D1; margin-top: 4px; }
#dao-new-client .dao-creds { border: 1px solid rgba(212,178,122,0.2); border-radius: 12px; padding: 20px; background: rgba(245,233,209,0.02); }
#dao-new-client .dao-creds-intro { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #D4B27A; }
#dao-new-client .dao-creds-help { font-size: 13px; color: #9C968A; margin-top: 6px; line-height: 1.5; }
#dao-new-client .dao-cred-block { margin-top: 18px; }
#dao-new-client .dao-cred-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
#dao-new-client .dao-cred-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #9C968A; }
#dao-new-client .dao-cred-val { background: #0A0908; border: 1px solid rgba(212,178,122,0.2); border-radius: 8px; padding: 12px 14px; font-family: "JetBrains Mono", monospace; font-size: 13px; color: #F5E9D1; word-break: break-all; }
#dao-new-client .dao-cred-val.gold { color: #D4B27A; letter-spacing: 0.05em; }
#dao-new-client .dao-copy { background: transparent; border: 1px solid rgba(212,178,122,0.3); color: #D4B27A; padding: 4px 12px; border-radius: 6px; font-family: inherit; font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; cursor: pointer; transition: all 0.15s ease; }
#dao-new-client .dao-copy:hover { background: rgba(212,178,122,0.15); }
#dao-new-client .dao-copy.copied { color: #5B9C72; border-color: rgba(94,156,114,0.4); }
#dao-new-client .dao-copy-both { width: 100%; margin-top: 18px; height: 38px; background: transparent; border: 1px solid rgba(212,178,122,0.2); color: rgba(245,233,209,0.7); border-radius: 8px; font-family: inherit; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; cursor: pointer; transition: all 0.15s ease; }
#dao-new-client .dao-copy-both:hover { border-color: #D4B27A; color: #D4B27A; }
#dao-new-client .dao-warn-band { margin-top: 22px; border: 1px solid rgba(139,58,58,0.35); background: rgba(139,58,58,0.1); border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #E08A8A; line-height: 1.5; }
#dao-new-client .dao-warn-band strong { color: #E08A8A; font-weight: 600; }
#dao-new-client .dao-modal-actions { display: flex; gap: 12px; margin-top: 22px; }

@media (max-width: 900px) {
  #dao-new-client { padding: 28px 20px 48px; }
  #dao-new-client .dao-card { padding: 22px 20px; margin-top: 28px; }
}
@media (max-width: 540px) {
  #dao-new-client { padding: 20px 14px 40px; }
  #dao-new-client .dao-card { padding: 20px 16px; }
  #dao-new-client .dao-modal { padding: 24px 22px; }
  #dao-new-client .dao-modal-actions { flex-direction: column; gap: 8px; }
  #dao-new-client .dao-modal-actions button { width: 100%; }
}
`;

const INITIAL_FORM = { full_name: '', email: '', company: '', phone: '' };

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button type="button" onClick={copy} className={`dao-copy${copied ? ' copied' : ''}`}>
      {copied ? '✓ Copied' : `Copy ${label}`}
    </button>
  );
}

function SuccessModal({ credentials, profile, onClose }) {
  const router = useRouter();
  const both = `Email: ${credentials.email}\nPassword: ${credentials.password}`;

  function goToClient() {
    router.push(`/portal/clients/${profile.id}`);
    router.refresh();
  }

  return (
    <div className="dao-modal-bg">
      <div className="dao-modal">
        <div className="dao-modal-head">
          <div className="dao-modal-tick">✓</div>
          <div>
            <div className="dao-modal-eyebrow">Client created</div>
            <div className="dao-modal-title">{profile.full_name}</div>
          </div>
        </div>

        <div className="dao-creds">
          <div className="dao-creds-intro">Login credentials</div>
          <p className="dao-creds-help">
            Share these with the client securely. They can change the password after first login.
          </p>

          <div className="dao-cred-block">
            <div className="dao-cred-head">
              <span className="dao-cred-label">Email</span>
              <CopyButton value={credentials.email} label="email" />
            </div>
            <div className="dao-cred-val">{credentials.email}</div>
          </div>

          <div className="dao-cred-block">
            <div className="dao-cred-head">
              <span className="dao-cred-label">Password</span>
              <CopyButton value={credentials.password} label="password" />
            </div>
            <div className="dao-cred-val gold">{credentials.password}</div>
          </div>

          <button
            type="button"
            onClick={() => { navigator.clipboard.writeText(both).catch(() => {}); }}
            className="dao-copy-both"
          >
            Copy both
          </button>
        </div>

        <div className="dao-warn-band">
          <strong>Important:</strong> This password is shown only once. Copy it now — you cannot view it again.
        </div>

        <div className="dao-modal-actions">
          <button type="button" onClick={goToClient} className="dao-btn-primary">
            View client →
          </button>
          <button type="button" onClick={onClose} className="dao-btn-ghost">
            Create another
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewClientForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  function field(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit() {
    setError('');
    if (!form.full_name.trim()) {
      setError('Full name is required.');
      return;
    }
    if (!form.email.trim()) {
      setError('Email is required.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/portal/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create client');
      setSuccess({ credentials: data.credentials, profile: data.profile });
    } catch (e) {
      setError(e.message);
      setSubmitting(false);
    }
  }

  function resetAfterCreate() {
    setForm(INITIAL_FORM);
    setSubmitting(false);
    setSuccess(null);
    setError('');
  }

  return (
    <div id="dao-new-client">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="dao-inner">
        <Link href="/portal/clients" className="dao-back">← Clients</Link>

        <div className="dao-eyebrow">Admin · New client</div>
        <h1 className="dao-hero">New client.</h1>
        <p className="dao-sub">
          Create a login for a new client. A secure password is generated automatically &mdash;
          you&apos;ll see it once on the next screen and can share it with them.
        </p>

        <form
          className="dao-card"
          onSubmit={(e) => { e.preventDefault(); submit(); }}
        >
          <div className="dao-group">
            <label className="dao-label">Full name <span className="req">*</span></label>
            <input
              value={form.full_name}
              onChange={(e) => field('full_name', e.target.value)}
              placeholder="e.g. Muhammad Usama Zaka"
              required
            />
          </div>

          <div className="dao-group">
            <label className="dao-label">Email <span className="req">*</span></label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => field('email', e.target.value)}
              placeholder="e.g. usama@samaaltariq.org"
              required
            />
            <p className="dao-help">This will be their login email. Must be unique.</p>
          </div>

          <div className="dao-group">
            <label className="dao-label">Company</label>
            <input
              value={form.company}
              onChange={(e) => field('company', e.target.value)}
              placeholder="e.g. Sama Al Tariq Building & Contracting LLC"
            />
          </div>

          <div className="dao-group">
            <label className="dao-label">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => field('phone', e.target.value)}
              placeholder="e.g. +971 50 XXX XXXX"
            />
          </div>

          {error && <div className="dao-error">{error}</div>}

          <div className="dao-actions">
            <button type="submit" disabled={submitting} className="dao-btn-primary">
              {submitting ? 'Creating…' : 'Create client →'}
            </button>
            <Link href="/portal/clients" className="dao-btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>

      {success && (
        <SuccessModal
          credentials={success.credentials}
          profile={success.profile}
          onClose={resetAfterCreate}
        />
      )}
    </div>
  );
}
