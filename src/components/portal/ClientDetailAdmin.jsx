'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { STATUS_META } from '@/lib/portal/constants';
import { fmtDate } from '@/components/portal/projectDetailParts';

const STYLES = `
#dao-client-d { padding: 40px 48px 64px; color: #F5E9D1; font-family: Inter, -apple-system, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
#dao-client-d * { box-sizing: border-box; }
#dao-client-d a { text-decoration: none; color: inherit; }
#dao-client-d .dao-inner { max-width: 1100px; }
#dao-client-d .dao-back { font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #9C968A; transition: color 0.15s ease; }
#dao-client-d .dao-back:hover { color: #D4B27A; }
#dao-client-d .dao-topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 28px; }
#dao-client-d .dao-tag { display: inline-flex; align-items: center; padding: 5px 12px; border: 1px solid rgba(212,178,122,0.25); border-radius: 999px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em; color: #D4B27A; }
#dao-client-d .dao-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: #D4B27A; }
#dao-client-d .dao-heroblock { display: flex; align-items: start; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-top: 12px; }
#dao-client-d .dao-leftblock { display: flex; align-items: start; gap: 22px; }
#dao-client-d .dao-avatar { width: 72px; height: 72px; border-radius: 50%; flex-shrink: 0; background: rgba(212,178,122,0.12); border: 1px solid rgba(212,178,122,0.25); color: #D4B27A; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 500; letter-spacing: 0.05em; }
#dao-client-d .dao-avatar.inactive { background: rgba(122,132,112,0.12); border-color: rgba(122,132,112,0.3); color: #9C968A; }
#dao-client-d .dao-hero { font-family: "Cormorant Garamond", Georgia, serif; font-size: 46px; font-weight: 500; font-style: italic; color: #F5E9D1; line-height: 1.05; }
#dao-client-d .dao-pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.14em; margin-top: 10px; }
#dao-client-d .dao-pill.deact { background: rgba(122,132,112,0.16); color: #9C968A; }
#dao-client-d .dao-pdot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
#dao-client-d .dao-company { font-size: 16px; color: rgba(245,233,209,0.6); margin-top: 8px; }
#dao-client-d .dao-joined { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #6E6A60; margin-top: 6px; }
#dao-client-d .dao-actions { display: flex; gap: 8px; flex-wrap: wrap; }
#dao-client-d .dao-btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 38px; padding: 0 20px; border-radius: 9px; background: #D4B27A; color: #0A0908; border: none; font-family: inherit; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; transition: background 0.15s ease; }
#dao-client-d .dao-btn-primary:hover { background: #E5BB5C; }
#dao-client-d .dao-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
#dao-client-d .dao-btn-ghost { display: inline-flex; align-items: center; justify-content: center; height: 38px; padding: 0 18px; border-radius: 9px; background: transparent; border: 1px solid rgba(212,178,122,0.22); color: #D4B27A; font-family: inherit; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; transition: all 0.15s ease; }
#dao-client-d .dao-btn-ghost:hover { background: rgba(212,178,122,0.1); border-color: #D4B27A; }
#dao-client-d .dao-btn-ghost:disabled { opacity: 0.55; cursor: not-allowed; }
#dao-client-d .dao-btn-danger { display: inline-flex; align-items: center; justify-content: center; height: 38px; padding: 0 18px; border-radius: 9px; background: transparent; border: 1px solid rgba(139,58,58,0.4); color: #C97A7A; font-family: inherit; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; transition: all 0.15s ease; }
#dao-client-d .dao-btn-danger:hover { background: rgba(139,58,58,0.15); border-color: #8B3A3A; color: #E08A8A; }
#dao-client-d .dao-btn-danger:disabled { opacity: 0.55; cursor: not-allowed; }
#dao-client-d .dao-section { background: #14120D; border: 1px solid rgba(212,178,122,0.12); border-radius: 16px; padding: 26px 28px; margin-top: 28px; }
#dao-client-d .dao-h2 { font-family: "Cormorant Garamond", Georgia, serif; font-size: 22px; font-weight: 500; font-style: italic; color: #F5E9D1; margin-bottom: 18px; }
#dao-client-d .dao-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
#dao-client-d .dao-meta-item .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 0.16em; color: #6E6A60; }
#dao-client-d .dao-meta-item .val { font-size: 14px; color: rgba(245,233,209,0.85); margin-top: 4px; word-break: break-word; }
#dao-client-d .dao-meta-item .val.gold { color: rgba(212,178,122,0.9); }
#dao-client-d .dao-error { border: 1px solid rgba(139,58,58,0.4); background: rgba(139,58,58,0.12); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #E08A8A; margin-top: 16px; }
/* Form */
#dao-client-d .dao-form { display: flex; flex-direction: column; gap: 18px; }
#dao-client-d .dao-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
#dao-client-d .dao-form-group { display: flex; flex-direction: column; }
#dao-client-d .dao-label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #9C968A; margin-bottom: 7px; }
#dao-client-d input { width: 100%; height: 40px; background: #0F0E0C; border: 1px solid #3A362D; border-radius: 8px; padding: 0 13px; font-family: inherit; font-size: 14px; color: #F5E9D1; outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease; -webkit-appearance: none; appearance: none; }
#dao-client-d input:focus { border-color: #D4B27A; box-shadow: 0 0 0 3px rgba(212,178,122,0.15); }
#dao-client-d .dao-form-actions { display: flex; gap: 10px; margin-top: 4px; }
/* Project rows */
#dao-client-d .dao-prow-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
#dao-client-d .dao-projects { display: flex; flex-direction: column; gap: 12px; }
#dao-client-d .dao-prow { display: grid; grid-template-columns: 1fr 130px 200px 92px; gap: 18px; align-items: center; padding: 16px 20px; background: rgba(245,233,209,0.02); border: 1px solid rgba(212,178,122,0.1); border-radius: 12px; transition: border-color 0.15s ease, background 0.15s ease; }
#dao-client-d .dao-prow:hover { border-color: rgba(212,178,122,0.28); background: rgba(245,233,209,0.05); }
#dao-client-d .dao-prow .pname { font-size: 15px; font-weight: 500; color: #F5E9D1; }
#dao-client-d .dao-pbadge { display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; border-radius: 999px; font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; }
#dao-client-d .dao-pdot2 { width: 5px; height: 5px; border-radius: 50%; }
#dao-client-d .dao-track { height: 4px; border-radius: 999px; background: rgba(245,233,209,0.08); overflow: hidden; margin-top: 5px; }
#dao-client-d .dao-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #D4B27A, #E5BB5C); }
#dao-client-d .dao-prow .pct { font-size: 11px; color: #D4B27A; }
#dao-client-d .dao-empty { text-align: center; padding: 28px; color: #6E6A60; font-size: 13px; border: 1px dashed rgba(212,178,122,0.18); border-radius: 12px; }
/* Modal */
#dao-client-d .dao-modal-bg { position: fixed; inset: 0; background: rgba(10,9,8,0.85); display: flex; align-items: center; justify-content: center; padding: 24px; z-index: 50; backdrop-filter: blur(8px); }
#dao-client-d .dao-modal { width: 100%; max-width: 520px; background: #14120D; border: 1px solid rgba(212,178,122,0.25); border-radius: 18px; padding: 32px; box-shadow: 0 30px 80px -20px rgba(0,0,0,0.9); }
#dao-client-d .dao-modal.danger { border-color: rgba(139,58,58,0.4); }
#dao-client-d .dao-modal-head { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }
#dao-client-d .dao-modal-tick { width: 40px; height: 40px; border-radius: 50%; background: rgba(94,156,114,0.18); color: #5B9C72; display: flex; align-items: center; justify-content: center; font-size: 18px; }
#dao-client-d .dao-modal-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: #5B9C72; }
#dao-client-d .dao-modal-title { font-family: "Cormorant Garamond", Georgia, serif; font-size: 24px; font-weight: 500; font-style: italic; color: #F5E9D1; margin-top: 4px; }
#dao-client-d .dao-modal-title.danger { color: #E08A8A; }
#dao-client-d .dao-modal p { font-size: 14px; color: rgba(245,233,209,0.7); line-height: 1.6; }
#dao-client-d .dao-modal strong { color: #F5E9D1; font-weight: 600; }
#dao-client-d .dao-creds { border: 1px solid rgba(212,178,122,0.2); border-radius: 12px; padding: 20px; background: rgba(245,233,209,0.02); margin-top: 16px; }
#dao-client-d .dao-creds-intro { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #D4B27A; margin-bottom: 6px; }
#dao-client-d .dao-cred-block { margin-top: 16px; }
#dao-client-d .dao-cred-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
#dao-client-d .dao-cred-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #9C968A; }
#dao-client-d .dao-cred-val { background: #0A0908; border: 1px solid rgba(212,178,122,0.2); border-radius: 8px; padding: 11px 13px; font-family: "JetBrains Mono", monospace; font-size: 13px; color: #F5E9D1; word-break: break-all; }
#dao-client-d .dao-cred-val.gold { color: #D4B27A; letter-spacing: 0.05em; }
#dao-client-d .dao-copy { background: transparent; border: 1px solid rgba(212,178,122,0.3); color: #D4B27A; padding: 4px 12px; border-radius: 6px; font-family: inherit; font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; cursor: pointer; transition: all 0.15s ease; }
#dao-client-d .dao-copy:hover { background: rgba(212,178,122,0.15); }
#dao-client-d .dao-copy.copied { color: #5B9C72; border-color: rgba(94,156,114,0.4); }
#dao-client-d .dao-warn-band { margin-top: 20px; border: 1px solid rgba(139,58,58,0.35); background: rgba(139,58,58,0.1); border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #E08A8A; line-height: 1.5; }
#dao-client-d .dao-modal-actions { display: flex; gap: 12px; margin-top: 22px; justify-content: flex-end; }
@media (max-width: 900px) {
  #dao-client-d { padding: 28px 20px 48px; }
  #dao-client-d .dao-form-row, #dao-client-d .dao-contact-grid { grid-template-columns: 1fr; }
  #dao-client-d .dao-prow { grid-template-columns: 1fr; gap: 10px; }
  #dao-client-d .dao-heroblock { flex-direction: column; align-items: stretch; }
  #dao-client-d .dao-actions { flex-wrap: wrap; }
  #dao-client-d .dao-hero { font-size: 36px; }
}
@media (max-width: 540px) {
  #dao-client-d { padding: 20px 14px 40px; }
  #dao-client-d .dao-leftblock { gap: 14px; }
  #dao-client-d .dao-avatar { width: 56px; height: 56px; font-size: 17px; }
  #dao-client-d .dao-hero { font-size: 28px; }
  #dao-client-d .dao-section { padding: 20px 18px; margin-top: 22px; }
  #dao-client-d .dao-h2 { font-size: 20px; }
  #dao-client-d .dao-modal { padding: 24px 22px; max-width: 100%; }
  #dao-client-d .dao-modal-actions { flex-direction: column; gap: 8px; }
  #dao-client-d .dao-modal-actions button { width: 100%; }
}
`;

function initials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function CopyBtn({ value, label }) {
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

function CredentialsModal({ credentials, onClose }) {
  return (
    <div className="dao-modal-bg">
      <div className="dao-modal">
        <div className="dao-modal-head">
          <div className="dao-modal-tick">✓</div>
          <div>
            <div className="dao-modal-eyebrow">Password reset</div>
            <div className="dao-modal-title">New credentials</div>
          </div>
        </div>
        <p>Share these with the client. The old password no longer works.</p>

        <div className="dao-creds">
          <div className="dao-creds-intro">Login credentials</div>

          <div className="dao-cred-block">
            <div className="dao-cred-head">
              <span className="dao-cred-label">Email</span>
              <CopyBtn value={credentials.email} label="email" />
            </div>
            <div className="dao-cred-val">{credentials.email}</div>
          </div>

          <div className="dao-cred-block">
            <div className="dao-cred-head">
              <span className="dao-cred-label">New password</span>
              <CopyBtn value={credentials.password} label="password" />
            </div>
            <div className="dao-cred-val gold">{credentials.password}</div>
          </div>
        </div>

        <div className="dao-warn-band">
          <strong>Important:</strong> This password is shown only once. Copy it now.
        </div>

        <div className="dao-modal-actions">
          <button type="button" onClick={onClose} className="dao-btn-primary">Done</button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ clientName, projectCount, onConfirm, onCancel, deleting, error }) {
  const [typedName, setTypedName] = useState('');
  const canDelete = typedName.trim() === 'DELETE' && projectCount === 0;

  return (
    <div className="dao-modal-bg">
      <div className="dao-modal danger">
        <div className="dao-modal-title danger">Delete client?</div>
        <p style={{ marginTop: 12 }}>
          This will permanently delete <strong>{clientName}</strong> and their login account.
        </p>

        {projectCount > 0 && (
          <div className="dao-warn-band">
            This client has <strong>{projectCount} project{projectCount === 1 ? '' : 's'}</strong>. Delete or reassign their projects before deleting the client.
          </div>
        )}

        {projectCount === 0 && (
          <div style={{ marginTop: 18 }}>
            <label className="dao-label">Type DELETE to confirm</label>
            <input
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              placeholder="DELETE"
              autoFocus
            />
          </div>
        )}

        {error && <div className="dao-error">{error}</div>}

        <div className="dao-modal-actions">
          <button type="button" onClick={onCancel} disabled={deleting} className="dao-btn-ghost">Cancel</button>
          <button type="button" onClick={onConfirm} disabled={!canDelete || deleting} className="dao-btn-danger">
            {deleting ? 'Deleting…' : 'Delete forever'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project }) {
  const meta = STATUS_META[project.status] || { label: project.status, color: '#D4B27A' };
  const pct = Math.max(0, Math.min(100, project.progress_percentage ?? 0));
  return (
    <Link href={`/portal/projects/${project.id}`} className="dao-prow">
      <div>
        <div className="pname">{project.name}</div>
        <div style={{ fontSize: 11, color: '#6E6A60', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
          Updated · {fmtDate(project.updated_at)}
        </div>
      </div>
      <div>
        <span className="dao-pbadge" style={{ background: `${meta.color}22`, color: meta.color }}>
          <span className="dao-pdot2" style={{ background: meta.color }} />
          {meta.label}
        </span>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: '#6E6A60', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Progress</span>
          <span className="pct">{pct}%</span>
        </div>
        <div className="dao-track">
          <div className="dao-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div style={{ textAlign: 'right', fontSize: 11, color: '#6E6A60', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
        Open →
      </div>
    </Link>
  );
}

export default function ClientDetailAdmin({ client: initialClient }) {
  const router = useRouter();
  const [client, setClient] = useState(initialClient);
  const projects = client.projects || [];
  const isInactive = client.role === 'inactive';

  // Edit
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: client.full_name || '',
    company: client.company || '',
    email: client.email || '',
    phone: client.phone || '',
  });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState('');

  // Reset password
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState('');
  const [credentials, setCredentials] = useState(null);

  // Status
  const [togglingStatus, setTogglingStatus] = useState(false);
  const [statusError, setStatusError] = useState('');

  // Delete
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  async function saveEdit() {
    setSaving(true);
    setEditError('');
    try {
      const res = await fetch(`/api/portal/clients/${client.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      setClient(data.client);
      setEditing(false);
    } catch (e) {
      setEditError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function resetPassword() {
    if (!window.confirm(`Reset password for ${client.full_name}? Their current password will stop working immediately.`)) return;
    setResetting(true);
    setResetError('');
    try {
      const res = await fetch(`/api/portal/clients/${client.id}/reset-password`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset password');
      setCredentials(data.credentials);
    } catch (e) {
      setResetError(e.message);
    } finally {
      setResetting(false);
    }
  }

  async function toggleStatus() {
    const action = isInactive ? 'reactivate' : 'deactivate';
    const confirmMsg = isInactive
      ? `Reactivate ${client.full_name}? They will be able to log in again.`
      : `Deactivate ${client.full_name}? They will not be able to log in. Their projects will be preserved.`;
    if (!window.confirm(confirmMsg)) return;
    setTogglingStatus(true);
    setStatusError('');
    try {
      const res = await fetch(`/api/portal/clients/${client.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');
      setClient((c) => ({ ...c, role: data.client.role }));
    } catch (e) {
      setStatusError(e.message);
    } finally {
      setTogglingStatus(false);
    }
  }

  async function deleteClient() {
    setDeleting(true);
    setDeleteError('');
    try {
      const res = await fetch(`/api/portal/clients/${client.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      router.push('/portal/clients');
      router.refresh();
    } catch (e) {
      setDeleteError(e.message);
      setDeleting(false);
    }
  }

  return (
    <div id="dao-client-d">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="dao-inner">
        <div className="dao-topbar">
          <Link href="/portal/clients" className="dao-back">← Clients</Link>
          <span className="dao-tag">Admin · Client</span>
        </div>

        <div className="dao-eyebrow">Client</div>

        <div className="dao-heroblock">
          <div className="dao-leftblock">
            <div className={`dao-avatar${isInactive ? ' inactive' : ''}`}>{initials(client.full_name)}</div>
            <div>
              <h1 className="dao-hero">{client.full_name}.</h1>
              {isInactive && (
                <span className="dao-pill deact">
                  <span className="dao-pdot" />
                  Inactive
                </span>
              )}
              {client.company && <div className="dao-company">{client.company}</div>}
              <div className="dao-joined">Joined · {fmtDate(client.created_at)}</div>
            </div>
          </div>

          {!editing && (
            <div className="dao-actions">
              <button onClick={() => setEditing(true)} className="dao-btn-ghost">Edit details</button>
              <button onClick={resetPassword} disabled={resetting} className="dao-btn-ghost">
                {resetting ? 'Resetting…' : 'Reset password'}
              </button>
              <button onClick={toggleStatus} disabled={togglingStatus} className="dao-btn-ghost">
                {togglingStatus ? '…' : (isInactive ? 'Reactivate' : 'Deactivate')}
              </button>
              <button onClick={() => setShowDelete(true)} className="dao-btn-danger">Delete</button>
            </div>
          )}
        </div>

        {resetError && <div className="dao-error">{resetError}</div>}
        {statusError && <div className="dao-error">{statusError}</div>}

        {/* Contact / edit */}
        <div className="dao-section">
          {!editing ? (
            <>
              <h2 className="dao-h2">Contact</h2>
              <div className="dao-contact-grid">
                <div className="dao-meta-item">
                  <div className="lbl">Email</div>
                  <div className="val gold">{client.email}</div>
                </div>
                <div className="dao-meta-item">
                  <div className="lbl">Phone</div>
                  <div className="val">{client.phone || '—'}</div>
                </div>
                <div className="dao-meta-item">
                  <div className="lbl">Company</div>
                  <div className="val">{client.company || '—'}</div>
                </div>
                <div className="dao-meta-item">
                  <div className="lbl">Status</div>
                  <div className="val">{isInactive ? 'Inactive' : 'Active'}</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="dao-h2">Edit client</h2>
              <div className="dao-form">
                <div className="dao-form-group">
                  <label className="dao-label">Full name</label>
                  <input value={editForm.full_name}
                    onChange={(e) => setEditForm((f) => ({ ...f, full_name: e.target.value }))} />
                </div>
                <div className="dao-form-row">
                  <div className="dao-form-group">
                    <label className="dao-label">Email</label>
                    <input type="email" value={editForm.email}
                      onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="dao-form-group">
                    <label className="dao-label">Phone</label>
                    <input value={editForm.phone}
                      onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                <div className="dao-form-group">
                  <label className="dao-label">Company</label>
                  <input value={editForm.company}
                    onChange={(e) => setEditForm((f) => ({ ...f, company: e.target.value }))} />
                </div>
                {editError && <div className="dao-error">{editError}</div>}
                <div className="dao-form-actions">
                  <button onClick={saveEdit} disabled={saving} className="dao-btn-primary">
                    {saving ? 'Saving…' : 'Save changes'}
                  </button>
                  <button onClick={() => { setEditing(false); setEditError(''); }} disabled={saving} className="dao-btn-ghost">
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Projects */}
        <div className="dao-section">
          <div className="dao-prow-head">
            <h2 className="dao-h2" style={{ marginBottom: 0 }}>Projects ({projects.length})</h2>
            <Link href="/portal/projects/new" className="dao-btn-ghost">+ New project</Link>
          </div>
          {projects.length === 0 ? (
            <div className="dao-empty">No projects yet for this client.</div>
          ) : (
            <div className="dao-projects">
              {[...projects]
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .map((p) => <ProjectRow key={p.id} project={p} />)}
            </div>
          )}
        </div>
      </div>

      {credentials && (
        <CredentialsModal credentials={credentials} onClose={() => setCredentials(null)} />
      )}

      {showDelete && (
        <DeleteConfirmModal
          clientName={client.full_name}
          projectCount={projects.length}
          onConfirm={deleteClient}
          onCancel={() => { setShowDelete(false); setDeleteError(''); }}
          deleting={deleting}
          error={deleteError}
        />
      )}
    </div>
  );
}
