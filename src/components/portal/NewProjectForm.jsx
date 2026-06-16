'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PROJECT_STATUSES, STATUS_META, SERVICE_TYPES, SERVICE_TYPE_META } from '@/lib/portal/constants';

const STYLES = `
#dao-new-project { padding: 40px 48px 64px; color: #F5E9D1; font-family: Inter, -apple-system, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
#dao-new-project * { box-sizing: border-box; }
#dao-new-project a { text-decoration: none; color: inherit; }
#dao-new-project .dao-inner { max-width: 760px; }
#dao-new-project .dao-back { font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #9C968A; transition: color 0.15s ease; }
#dao-new-project .dao-back:hover { color: #D4B27A; }
#dao-new-project .dao-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: #D4B27A; margin-top: 28px; }
#dao-new-project .dao-hero { font-family: "Cormorant Garamond", Georgia, serif; font-size: 46px; font-weight: 500; font-style: italic; color: #F5E9D1; line-height: 1.05; margin-top: 10px; }
#dao-new-project .dao-sub { font-size: 15px; color: #9C968A; margin-top: 10px; max-width: 560px; }
#dao-new-project .dao-card { background: #14120D; border: 1px solid rgba(212,178,122,0.14); border-radius: 16px; padding: 28px 30px; margin-top: 36px; }
#dao-new-project .dao-group { margin-bottom: 22px; }
#dao-new-project .dao-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 22px; }
#dao-new-project .dao-row.threecol { grid-template-columns: 1fr 1fr 1fr; }
#dao-new-project .dao-row.budgetrow { grid-template-columns: 1fr 120px; }
#dao-new-project .dao-label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #9C968A; margin-bottom: 8px; }
#dao-new-project .dao-label .req { color: #D4B27A; margin-left: 3px; }
#dao-new-project input, #dao-new-project select, #dao-new-project textarea {
  width: 100%; background: #0F0E0C; border: 1px solid #3A362D; border-radius: 8px;
  padding: 0 14px; font-family: inherit; font-size: 14px; color: #F5E9D1;
  outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease;
  -webkit-appearance: none; appearance: none;
}
#dao-new-project input, #dao-new-project select { height: 42px; }
#dao-new-project textarea { padding: 12px 14px; resize: vertical; line-height: 1.5; }
#dao-new-project input::placeholder, #dao-new-project textarea::placeholder { color: rgba(245,233,209,0.28); }
#dao-new-project input:focus, #dao-new-project select:focus, #dao-new-project textarea:focus {
  border-color: #D4B27A; box-shadow: 0 0 0 3px rgba(212,178,122,0.15);
}
#dao-new-project select option { background: #14120D; color: #F5E9D1; }
#dao-new-project .dao-progressrow { display: grid; grid-template-columns: 1fr 90px; align-items: center; gap: 14px; }
#dao-new-project .dao-progressrow input[type="range"] { padding: 0; height: 4px; background: rgba(245,233,209,0.1); border: none; appearance: auto; -webkit-appearance: auto; accent-color: #D4B27A; }
#dao-new-project .dao-progressrow input[type="number"] { text-align: center; }
#dao-new-project .dao-pcthead { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
#dao-new-project .dao-pctval { font-size: 13px; color: #D4B27A; font-weight: 500; }
#dao-new-project .dao-help { font-size: 11px; color: #6E6A60; margin-top: 6px; }
#dao-new-project .dao-error { border: 1px solid rgba(139,58,58,0.4); background: rgba(139,58,58,0.12); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #E08A8A; margin-bottom: 16px; }
#dao-new-project .dao-warn { border: 1px solid rgba(168,94,59,0.4); background: rgba(168,94,59,0.1); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #E5B884; margin-bottom: 16px; }
#dao-new-project .dao-actions { display: flex; gap: 12px; margin-top: 28px; }
#dao-new-project .dao-btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 42px; padding: 0 24px; border-radius: 9px; background: #D4B27A; color: #0A0908; border: none; font-family: inherit; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; transition: background 0.15s ease; }
#dao-new-project .dao-btn-primary:hover { background: #E5BB5C; }
#dao-new-project .dao-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
#dao-new-project .dao-btn-ghost { display: inline-flex; align-items: center; justify-content: center; height: 42px; padding: 0 22px; border-radius: 9px; background: transparent; border: 1px solid rgba(212,178,122,0.22); color: #D4B27A; font-family: inherit; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; transition: all 0.15s ease; }
#dao-new-project .dao-btn-ghost:hover { background: #D4B27A; color: #0A0908; border-color: #D4B27A; }
@media (max-width: 900px) {
  #dao-new-project { padding: 28px 20px 48px; }
  #dao-new-project .dao-row, #dao-new-project .dao-row.threecol, #dao-new-project .dao-row.budgetrow { grid-template-columns: 1fr; }
  #dao-new-project .dao-card { padding: 22px 20px; margin-top: 28px; }
}
@media (max-width: 540px) {
  #dao-new-project { padding: 20px 14px 40px; }
  #dao-new-project .dao-card { padding: 20px 16px; }
}
`;

const INITIAL_FORM = {
  client_id: '',
  name: '',
  description: '',
  service_type: '',
  status: 'proposal',
  progress_percentage: 0,
  start_date: '',
  target_date: '',
  completed_date: '',
  budget_range: '',
  budget_currency: 'AED',
  notes_internal: '',
};

export default function NewProjectForm({ clients }) {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function field(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit() {
    setError('');
    if (!form.client_id) {
      setError('Please select a client.');
      return;
    }
    if (!form.name.trim()) {
      setError('Project name is required.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/portal/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create project');
      router.push(`/portal/projects/${data.project.id}`);
      router.refresh();
    } catch (e) {
      setError(e.message);
      setSubmitting(false);
    }
  }

  return (
    <div id="dao-new-project">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="dao-inner">
        <Link href="/portal/dashboard" className="dao-back">← Dashboard</Link>

        <div className="dao-eyebrow">Admin · New project</div>
        <h1 className="dao-hero">New project.</h1>
        <p className="dao-sub">
          Set up a new project for an existing client. You can edit any of these details later.
        </p>

        <form
          className="dao-card"
          onSubmit={(e) => { e.preventDefault(); submit(); }}
        >
          {/* Client */}
          <div className="dao-group">
            <label className="dao-label">Client <span className="req">*</span></label>
            {clients.length === 0 ? (
              <div className="dao-warn">
                No clients exist yet. Create a client in the Clients section first.
              </div>
            ) : (
              <select
                value={form.client_id}
                onChange={(e) => field('client_id', e.target.value)}
                required
              >
                <option value="">— Select a client —</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.full_name}{c.company ? ` · ${c.company}` : ''}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Project name */}
          <div className="dao-group">
            <label className="dao-label">Project name <span className="req">*</span></label>
            <input
              value={form.name}
              onChange={(e) => field('name', e.target.value)}
              placeholder="e.g. Brand System & Digital Presence"
              required
            />
          </div>

          {/* Status + Service type */}
          <div className="dao-row">
            <div>
              <label className="dao-label">Status</label>
              <select
                value={form.status}
                onChange={(e) => field('status', e.target.value)}
              >
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_META[s]?.label || s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="dao-label">Service type</label>
              <select
                value={form.service_type}
                onChange={(e) => field('service_type', e.target.value)}
              >
                <option value="">— Select service type —</option>
                {SERVICE_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {SERVICE_TYPE_META[s]?.label || s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Progress */}
          <div className="dao-group">
            <div className="dao-pcthead">
              <label className="dao-label" style={{ marginBottom: 0 }}>Progress</label>
              <span className="dao-pctval">{form.progress_percentage}%</span>
            </div>
            <div className="dao-progressrow">
              <input
                type="range"
                min="0" max="100"
                value={form.progress_percentage}
                onChange={(e) => field('progress_percentage', Number(e.target.value))}
              />
              <input
                type="number"
                min="0" max="100"
                value={form.progress_percentage}
                onChange={(e) => field('progress_percentage', Number(e.target.value))}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="dao-row threecol">
            <div>
              <label className="dao-label">Start date</label>
              <input type="date" value={form.start_date} onChange={(e) => field('start_date', e.target.value)} />
            </div>
            <div>
              <label className="dao-label">Target date</label>
              <input type="date" value={form.target_date} onChange={(e) => field('target_date', e.target.value)} />
            </div>
            <div>
              <label className="dao-label">Completed date</label>
              <input type="date" value={form.completed_date} onChange={(e) => field('completed_date', e.target.value)} />
            </div>
          </div>

          {/* Budget */}
          <div className="dao-row budgetrow">
            <div>
              <label className="dao-label">Budget range</label>
              <input
                value={form.budget_range}
                onChange={(e) => field('budget_range', e.target.value)}
                placeholder="e.g. 150,000–200,000"
              />
            </div>
            <div>
              <label className="dao-label">Currency</label>
              <input
                value={form.budget_currency}
                onChange={(e) => field('budget_currency', e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="dao-group">
            <label className="dao-label">Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => field('description', e.target.value)}
              placeholder="Brief description of project scope, deliverables, key context…"
            />
          </div>

          {/* Internal notes */}
          <div className="dao-group">
            <label className="dao-label">Internal notes <span style={{ color: '#6E6A60', textTransform: 'none', letterSpacing: 0 }}>(never shown to client)</span></label>
            <textarea
              rows={3}
              value={form.notes_internal}
              onChange={(e) => field('notes_internal', e.target.value)}
              placeholder="Anything only DAO team should see — risks, budget cushion, sensitive context…"
            />
          </div>

          {error && <div className="dao-error">{error}</div>}

          <div className="dao-actions">
            <button
              type="submit"
              className="dao-btn-primary"
              disabled={submitting || clients.length === 0}
            >
              {submitting ? 'Creating…' : 'Create project →'}
            </button>
            <Link href="/portal/dashboard" className="dao-btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
