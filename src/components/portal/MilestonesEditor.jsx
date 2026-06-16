'use client';
// src/components/portal/MilestonesEditor.jsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MILESTONE_STATUSES, MILESTONE_META } from '@/lib/portal/constants';
import { fmtDate } from '@/components/portal/projectDetailParts';

const STYLES = `
.dao-mile-wrap { font-family: Inter, -apple-system, system-ui, sans-serif; color: #F5E9D1; }
.dao-mile-wrap * { box-sizing: border-box; }
.dao-mile-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.dao-mile-count { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #9C968A; }
.dao-mile-add { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 34px; padding: 0 16px; border-radius: 9px; background: transparent; border: 1px solid rgba(212,178,122,0.25); color: #D4B27A; font-family: inherit; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; transition: all 0.15s ease; }
.dao-mile-add:hover { background: #D4B27A; color: #0A0908; border-color: #D4B27A; }
.dao-mile-list { display: flex; flex-direction: column; gap: 10px; }
.dao-mile-empty { text-align: center; padding: 28px 20px; color: #6E6A60; font-size: 13px; border: 1px dashed rgba(212,178,122,0.18); border-radius: 12px; }
.dao-mile-error { border: 1px solid rgba(139,58,58,0.4); background: rgba(139,58,58,0.12); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #E08A8A; margin-bottom: 12px; }
.dao-mile-row { display: grid; grid-template-columns: 30px 1fr auto; gap: 14px; align-items: start; padding: 16px 18px; background: rgba(245,233,209,0.02); border: 1px solid rgba(212,178,122,0.1); border-radius: 12px; transition: border-color 0.15s ease; }
.dao-mile-row:hover { border-color: rgba(212,178,122,0.22); }
.dao-mile-row.completed { background: rgba(94,156,114,0.04); border-color: rgba(94,156,114,0.18); }
.dao-mile-rowinprog { background: rgba(229,187,92,0.05); border-color: rgba(229,187,92,0.2); }
.dao-mile-arrows { display: flex; flex-direction: column; gap: 4px; }
.dao-mile-arrow { width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(212,178,122,0.2); border-radius: 6px; background: transparent; color: rgba(245,233,209,0.55); font-family: inherit; font-size: 12px; cursor: pointer; transition: all 0.15s ease; }
.dao-mile-arrow:hover:not(:disabled) { border-color: #D4B27A; color: #D4B27A; }
.dao-mile-arrow:disabled { opacity: 0.3; cursor: not-allowed; }
.dao-mile-content { min-width: 0; }
.dao-mile-titlerow { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.dao-mile-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dao-mile-title { font-size: 15px; font-weight: 500; color: #F5E9D1; }
.dao-mile-title.done { color: #D4B27A; }
.dao-mile-desc { font-size: 13px; color: rgba(245,233,209,0.55); margin-top: 5px; line-height: 1.5; }
.dao-mile-meta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 8px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; }
.dao-mile-status-pill { font-weight: 500; }
.dao-mile-due { color: #6E6A60; }
.dao-mile-actions { display: flex; flex-direction: column; gap: 4px; align-items: flex-end; }
.dao-mile-btn-link { background: transparent; border: none; color: rgba(245,233,209,0.55); font-family: inherit; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; padding: 4px 8px; transition: color 0.15s ease; }
.dao-mile-btn-link:hover { color: #D4B27A; }
.dao-mile-btn-link.danger:hover { color: #E08A8A; }
.dao-mile-btn-link:disabled { opacity: 0.45; cursor: not-allowed; }
/* Form */
.dao-mile-form-card { border: 1px solid rgba(212,178,122,0.25); background: rgba(245,233,209,0.02); border-radius: 12px; padding: 20px; }
.dao-mile-form-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #D4B27A; margin-bottom: 14px; }
.dao-mile-form { display: flex; flex-direction: column; gap: 14px; }
.dao-mile-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.dao-mile-fg { display: flex; flex-direction: column; }
.dao-mile-label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #9C968A; margin-bottom: 6px; }
.dao-mile-form input, .dao-mile-form select, .dao-mile-form textarea { width: 100%; background: #0F0E0C; border: 1px solid #3A362D; border-radius: 8px; padding: 0 12px; font-family: inherit; font-size: 14px; color: #F5E9D1; outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease; -webkit-appearance: none; appearance: none; }
.dao-mile-form input, .dao-mile-form select { height: 38px; }
.dao-mile-form textarea { padding: 10px 12px; resize: vertical; line-height: 1.5; }
.dao-mile-form input:focus, .dao-mile-form select:focus, .dao-mile-form textarea:focus { border-color: #D4B27A; box-shadow: 0 0 0 3px rgba(212,178,122,0.15); }
.dao-mile-form select option { background: #14120D; color: #F5E9D1; }
.dao-mile-form input::placeholder, .dao-mile-form textarea::placeholder { color: rgba(245,233,209,0.25); }
.dao-mile-actions-row { display: flex; gap: 10px; margin-top: 4px; }
.dao-mile-btn-primary { display: inline-flex; align-items: center; justify-content: center; height: 36px; padding: 0 18px; border-radius: 9px; background: #D4B27A; color: #0A0908; border: none; font-family: inherit; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; transition: background 0.15s ease; }
.dao-mile-btn-primary:hover { background: #E5BB5C; }
.dao-mile-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
.dao-mile-btn-ghost { display: inline-flex; align-items: center; justify-content: center; height: 36px; padding: 0 16px; border-radius: 9px; background: transparent; border: 1px solid rgba(212,178,122,0.22); color: #D4B27A; font-family: inherit; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; transition: all 0.15s ease; }
.dao-mile-btn-ghost:hover { background: rgba(212,178,122,0.1); border-color: #D4B27A; }
.dao-mile-btn-ghost:disabled { opacity: 0.55; cursor: not-allowed; }
/* Progress summary */
.dao-mile-summary { display: flex; align-items: center; gap: 16px; margin-bottom: 18px; padding: 14px 18px; background: rgba(245,233,209,0.02); border: 1px solid rgba(212,178,122,0.12); border-radius: 12px; }
.dao-mile-progress-num { font-size: 24px; color: #D4B27A; font-weight: 500; flex-shrink: 0; }
.dao-mile-progress-text { font-size: 13px; color: rgba(245,233,209,0.7); flex: 1; }
.dao-mile-progress-track { flex: 2; height: 5px; background: rgba(245,233,209,0.08); border-radius: 999px; overflow: hidden; }
.dao-mile-progress-fill { height: 100%; background: linear-gradient(90deg, #D4B27A, #E5BB5C); transition: width 0.5s ease; }
@media (max-width: 700px) {
  .dao-mile-top { flex-wrap: wrap; }
  .dao-mile-row { grid-template-columns: 26px 1fr; gap: 12px; padding: 14px 14px; }
  .dao-mile-actions { flex-direction: row; grid-column: 1 / -1; justify-content: flex-end; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
  .dao-mile-row2 { grid-template-columns: 1fr; }
  .dao-mile-summary { flex-wrap: wrap; gap: 10px; padding: 12px 14px; }
  .dao-mile-progress-text { flex: 1 1 100%; order: 3; font-size: 12px; }
  .dao-mile-progress-track { flex: 1 1 100%; order: 4; }
  .dao-mile-actions-row { flex-wrap: wrap; }
  .dao-mile-arrows { flex-direction: column; }
}
@media (max-width: 480px) {
  .dao-mile-title { font-size: 14px; }
  .dao-mile-desc { font-size: 12px; }
  .dao-mile-progress-num { font-size: 20px; }
}
`;

function StatusVisual({ status }) {
  const meta = MILESTONE_META[status] || MILESTONE_META.pending;
  const color = status === 'completed' ? '#5B9C72' : status === 'in_progress' ? '#E5BB5C' : '#9C968A';
  return { color, label: meta.label };
}

function MilestoneRow({ milestone, index, total, onEdit, onDelete, onReorder, isBusy }) {
  const vis = StatusVisual({ status: milestone.status });
  const rowClass = milestone.status === 'completed'
    ? 'dao-mile-row completed'
    : milestone.status === 'in_progress'
    ? 'dao-mile-row dao-mile-rowinprog'
    : 'dao-mile-row';

  return (
    <div className={rowClass}>
      {/* Reorder arrows */}
      <div className="dao-mile-arrows">
        <button
          type="button"
          disabled={isBusy || index === 0}
          onClick={() => onReorder(milestone.id, 'up')}
          className="dao-mile-arrow"
          title="Move up"
        >↑</button>
        <button
          type="button"
          disabled={isBusy || index === total - 1}
          onClick={() => onReorder(milestone.id, 'down')}
          className="dao-mile-arrow"
          title="Move down"
        >↓</button>
      </div>

      {/* Content */}
      <div className="dao-mile-content">
        <div className="dao-mile-titlerow">
          <span className="dao-mile-dot" style={{ background: vis.color }} />
          <span className={`dao-mile-title${milestone.status === 'completed' ? ' done' : ''}`}>
            {milestone.title}
          </span>
        </div>
        {milestone.description && (
          <p className="dao-mile-desc">{milestone.description}</p>
        )}
        <div className="dao-mile-meta">
          <span className="dao-mile-status-pill" style={{ color: vis.color }}>
            {vis.label}
          </span>
          {milestone.due_date && (
            <span className="dao-mile-due">Due · {fmtDate(milestone.due_date)}</span>
          )}
          {milestone.completed_at && (
            <span className="dao-mile-due">Done · {fmtDate(milestone.completed_at)}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="dao-mile-actions">
        <button type="button" onClick={() => onEdit(milestone)} disabled={isBusy} className="dao-mile-btn-link">Edit</button>
        <button type="button" onClick={() => onDelete(milestone)} disabled={isBusy} className="dao-mile-btn-link danger">Delete</button>
      </div>
    </div>
  );
}

function MilestoneForm({ initial, onSave, onCancel, busy }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    status: initial?.status || 'pending',
    due_date: initial?.due_date || '',
  });
  const [error, setError] = useState('');

  function field(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function submit() {
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    try {
      await onSave(form);
    } catch (e) {
      setError(e.message || 'Failed to save');
    }
  }

  return (
    <div className="dao-mile-form-card">
      <div className="dao-mile-form-title">{initial ? 'Edit milestone' : 'New milestone'}</div>
      <div className="dao-mile-form">
        <div className="dao-mile-fg">
          <label className="dao-mile-label">Title *</label>
          <input
            value={form.title}
            onChange={(e) => field('title', e.target.value)}
            placeholder="e.g. Brand Identity System"
            autoFocus
          />
        </div>
        <div className="dao-mile-fg">
          <label className="dao-mile-label">Description</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => field('description', e.target.value)}
            placeholder="Optional context shown to the client"
          />
        </div>
        <div className="dao-mile-row2">
          <div className="dao-mile-fg">
            <label className="dao-mile-label">Status</label>
            <select value={form.status} onChange={(e) => field('status', e.target.value)}>
              {MILESTONE_STATUSES.map((s) => (
                <option key={s} value={s}>{MILESTONE_META[s]?.label || s}</option>
              ))}
            </select>
          </div>
          <div className="dao-mile-fg">
            <label className="dao-mile-label">Due date</label>
            <input
              type="date"
              value={form.due_date}
              onChange={(e) => field('due_date', e.target.value)}
            />
          </div>
        </div>
        {error && <div className="dao-mile-error">{error}</div>}
        <div className="dao-mile-actions-row">
          <button type="button" onClick={submit} disabled={busy} className="dao-mile-btn-primary">
            {busy ? 'Saving…' : (initial ? 'Save changes' : 'Add milestone')}
          </button>
          <button type="button" onClick={onCancel} disabled={busy} className="dao-mile-btn-ghost">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MilestonesEditor({ projectId, milestones: initialMilestones }) {
  const router = useRouter();
  const [milestones, setMilestones] = useState(
    [...(initialMilestones || [])].sort((a, b) => a.order_index - b.order_index)
  );
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function addMilestone(form) {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/portal/milestones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add');
      setMilestones((m) => [...m, data.milestone].sort((a, b) => a.order_index - b.order_index));
      setAdding(false);
      router.refresh();
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setBusy(false);
    }
  }

  async function editMilestone(form) {
    if (!editing) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/portal/milestones/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      setMilestones((m) => m.map((x) => x.id === editing.id ? data.milestone : x));
      setEditing(null);
      router.refresh();
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setBusy(false);
    }
  }

  async function deleteMilestone(milestone) {
    if (!window.confirm(`Delete milestone "${milestone.title}"? This cannot be undone.`)) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/portal/milestones/${milestone.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      setMilestones((m) => m.filter((x) => x.id !== milestone.id));
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function reorder(milestoneId, direction) {
    const sorted = [...milestones].sort((a, b) => a.order_index - b.order_index);
    const idx = sorted.findIndex((m) => m.id === milestoneId);
    if (idx === -1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= sorted.length) return;

    const current = sorted[idx];
    const target = sorted[targetIdx];

    setBusy(true);
    setError('');
    try {
      const optimistic = sorted.map((m) => {
        if (m.id === current.id) return { ...m, order_index: target.order_index };
        if (m.id === target.id) return { ...m, order_index: current.order_index };
        return m;
      }).sort((a, b) => a.order_index - b.order_index);
      setMilestones(optimistic);

      const [r1, r2] = await Promise.all([
        fetch(`/api/portal/milestones/${current.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_index: target.order_index }),
        }),
        fetch(`/api/portal/milestones/${target.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_index: current.order_index }),
        }),
      ]);

      if (!r1.ok || !r2.ok) throw new Error('Reorder failed — refresh to see actual state');
      router.refresh();
    } catch (e) {
      setMilestones(sorted);
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  const doneCount = milestones.filter((m) => m.status === 'completed').length;
  const total = milestones.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="dao-mile-wrap">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Progress summary */}
      {total > 0 && (
        <div className="dao-mile-summary">
          <div className="dao-mile-progress-num">{pct}%</div>
          <div className="dao-mile-progress-track">
            <div className="dao-mile-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="dao-mile-progress-text">{doneCount} of {total} complete</div>
        </div>
      )}

      <div className="dao-mile-top">
        <span className="dao-mile-count">{total} milestone{total === 1 ? '' : 's'}</span>
        {!adding && !editing && (
          <button type="button" onClick={() => setAdding(true)} className="dao-mile-add">
            + Add milestone
          </button>
        )}
      </div>

      {error && <div className="dao-mile-error">{error}</div>}

      {adding && (
        <div style={{ marginBottom: 10 }}>
          <MilestoneForm
            onSave={addMilestone}
            onCancel={() => { setAdding(false); setError(''); }}
            busy={busy}
          />
        </div>
      )}

      <div className="dao-mile-list">
        {milestones.length === 0 && !adding ? (
          <div className="dao-mile-empty">
            No milestones yet. Click &ldquo;+ Add milestone&rdquo; to create the first one.
          </div>
        ) : (
          milestones.map((m, idx) => (
            editing?.id === m.id ? (
              <MilestoneForm
                key={m.id}
                initial={editing}
                onSave={editMilestone}
                onCancel={() => { setEditing(null); setError(''); }}
                busy={busy}
              />
            ) : (
              <MilestoneRow
                key={m.id}
                milestone={m}
                index={idx}
                total={milestones.length}
                onEdit={setEditing}
                onDelete={deleteMilestone}
                onReorder={reorder}
                isBusy={busy}
              />
            )
          ))
        )}
      </div>
    </div>
  );
}
