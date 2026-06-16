'use client';
// src/components/portal/FilesSection.jsx

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from '@/lib/portal/file-helpers';
import { fmtDate } from '@/components/portal/projectDetailParts';
import { FilesSummary } from '@/components/portal/ProjectVisuals';

const EASE = [0.16, 1, 0.3, 1];
const DISPLAY = { fontFamily: "'Bodoni Moda', Georgia, serif" };

const btnGold = 'rounded-md bg-[#D4B27A] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0A0908] transition-opacity hover:opacity-90 disabled:opacity-50';
const btnGhost = 'rounded-md border border-[#D4B27A]/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#F5E9D1]/70 transition-colors hover:border-[#D4B27A] hover:text-[#D4B27A] disabled:opacity-50';
const btnDanger = 'rounded-md border border-[#8B3A3A]/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#C97A7A] transition-colors hover:border-[#8B3A3A] hover:text-[#E08A8A] disabled:opacity-50';
const labelCls = 'font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5E9D1]/45';

// Format bytes → human-readable
function formatBytes(bytes) {
  if (!bytes) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// Get short file type tag from MIME type
function fileTypeTag(mimeType) {
  if (!mimeType) return 'FILE';
  if (mimeType === 'application/pdf') return 'PDF';
  if (mimeType.startsWith('image/')) return 'IMG';
  if (mimeType.includes('word') || mimeType === 'text/plain') return 'DOC';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'XLS';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'PPT';
  if (mimeType.includes('zip')) return 'ZIP';
  if (mimeType === 'text/csv') return 'CSV';
  return 'FILE';
}

function FileRow({ file, isAdmin, onToggleVisibility, onDelete, onDownload, busy }) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      await onDownload(file);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex flex-wrap items-center gap-3 rounded-lg border border-[#D4B27A]/12 bg-[#F5E9D1]/[0.02] p-4"
    >
      {/* File type tag */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#D4B27A]/25 bg-[#D4B27A]/8 font-mono text-[10px] uppercase tracking-wider text-[#D4B27A]">
        {fileTypeTag(file.file_type)}
      </div>

      {/* Filename + metadata */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-base text-[#F5E9D1]" style={DISPLAY}>{file.filename}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#F5E9D1]/45">
          <span>{formatBytes(file.size_bytes)}</span>
          <span>·</span>
          <span>Uploaded {fmtDate(file.created_at)}</span>
          {isAdmin && (
            <>
              <span>·</span>
              <span className={file.visible_to_client ? 'text-[#5B9C72]' : 'text-[#7A8470]'}>
                {file.visible_to_client ? 'Visible to client' : 'Internal only'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading || busy}
          className={btnGhost}
        >
          {downloading ? 'Loading…' : 'Download'}
        </button>
        {isAdmin && (
          <>
            <button
              type="button"
              onClick={() => onToggleVisibility(file)}
              disabled={busy}
              className={btnGhost}
              title={file.visible_to_client ? 'Hide from client' : 'Show to client'}
            >
              {file.visible_to_client ? 'Hide' : 'Show'}
            </button>
            <button
              type="button"
              onClick={() => onDelete(file)}
              disabled={busy}
              className={btnDanger}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function UploadProgress({ progress }) {
  return (
    <div className="rounded-lg border border-[#D4B27A]/25 bg-[#F5E9D1]/[0.02] p-4">
      <div className="flex items-center justify-between">
        <span className={labelCls}>Uploading…</span>
        <span className="font-mono text-xs text-[#D4B27A]">{progress}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F5E9D1]/10">
        <motion.div
          className="h-full bg-[#D4B27A]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function FilesSection({ projectId, isAdmin }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(null); // 0-100 or null
  const [pendingVisibility, setPendingVisibility] = useState(true); // for next upload
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadFiles();
  }, [projectId]);

  async function loadFiles() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/portal/files?project_id=${projectId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load files');
      setFiles(data.files || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function pickFile() {
    fileInputRef.current?.click();
  }

  async function handleFileSelected(e) {
    const file = e.target.files?.[0];
    e.target.value = ''; // reset input so same file can be re-selected
    if (!file) return;

    // Client-side validation (server also validates)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`File too large. Max ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB`);
      return;
    }
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setError(`File type ${file.type || 'unknown'} not allowed`);
      return;
    }

    setError('');
    setBusy(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('project_id', projectId);
      formData.append('visible_to_client', String(pendingVisibility));

      // Use XHR for upload progress tracking
      const result = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/portal/files');
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const pct = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(pct);
          }
        };
        xhr.onload = () => {
          try {
            const data = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300) resolve(data);
            else reject(new Error(data.error || `Upload failed (${xhr.status})`));
          } catch {
            reject(new Error('Invalid server response'));
          }
        };
        xhr.onerror = () => reject(new Error('Network error during upload'));
        xhr.send(formData);
      });

      // Prepend new file to list
      setFiles((prev) => [result.file, ...prev]);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
      setUploadProgress(null);
    }
  }

  async function toggleVisibility(file) {
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/portal/files/${file.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible_to_client: !file.visible_to_client }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Toggle failed');
      setFiles((prev) => prev.map((f) => f.id === file.id ? data.file : f));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteFile(file) {
    if (!window.confirm(`Delete file "${file.filename}"? This cannot be undone.`)) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/portal/files/${file.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function downloadFile(file) {
    setError('');
    try {
      const res = await fetch(`/api/portal/files/${file.id}/download`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get download URL');
      // Open in new tab — browser handles the download
      window.open(data.url, '_blank');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#D4B27A]">
          Files ({files.length})
        </h2>
        {isAdmin && (
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-[#F5E9D1]/60">
              <input
                type="checkbox"
                checked={pendingVisibility}
                onChange={(e) => setPendingVisibility(e.target.checked)}
                className="accent-[#D4B27A]"
                disabled={busy}
              />
              <span>Visible to client</span>
            </label>
            <button
              type="button"
              onClick={pickFile}
              disabled={busy}
              className={btnGold}
            >
              {busy && uploadProgress !== null ? 'Uploading…' : '+ Upload file'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept={ALLOWED_MIME_TYPES.join(',')}
              onChange={handleFileSelected}
              className="hidden"
            />
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-md border border-[#8B3A3A]/40 bg-[#8B3A3A]/10 px-4 py-3 text-sm text-[#E08A8A]">
          {error}
        </div>
      )}

      {/* Upload progress */}
      <AnimatePresence>
        {uploadProgress !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-4"
          >
            <UploadProgress progress={uploadProgress} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Files type summary */}
      {!loading && files.length > 0 && (
        <div className="mt-4">
          <FilesSummary files={files} />
        </div>
      )}

      {/* Files list */}
      <div className="mt-5 space-y-3">
        {loading ? (
          <p className="rounded-lg border border-dashed border-[#D4B27A]/20 p-8 text-center text-[#F5E9D1]/40">
            Loading files…
          </p>
        ) : files.length === 0 ? (
          <p className="rounded-lg border border-dashed border-[#D4B27A]/20 p-8 text-center text-[#F5E9D1]/40">
            {isAdmin
              ? 'No files yet. Click "+ Upload file" to add the first one.'
              : 'No files shared yet.'}
          </p>
        ) : (
          files.map((file) => (
            <FileRow
              key={file.id}
              file={file}
              isAdmin={isAdmin}
              onToggleVisibility={toggleVisibility}
              onDelete={deleteFile}
              onDownload={downloadFile}
              busy={busy}
            />
          ))
        )}
      </div>
    </section>
  );
}
