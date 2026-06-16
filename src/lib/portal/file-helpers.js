// src/lib/portal/file-helpers.js
import crypto from 'crypto';

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB
export const SIGNED_URL_EXPIRY_SECONDS = 60;
export const STORAGE_BUCKET = 'project-files';

// Allowed MIME types — strict whitelist
export const ALLOWED_MIME_TYPES = [
  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  // Images
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  // Archives
  'application/zip',
  'application/x-zip-compressed',
];

export const FILE_TYPE_EXTENSIONS = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'text/plain': 'txt',
  'text/csv': 'csv',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'application/zip': 'zip',
  'application/x-zip-compressed': 'zip',
};

export function validateFile(file) {
  if (!file || typeof file === 'string') {
    return { error: 'No file provided' };
  }
  if (!file.size || file.size === 0) {
    return { error: 'File is empty' };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { error: `File too large. Max ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB` };
  }
  if (!file.type) {
    return { error: 'File type not detected' };
  }
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { error: `File type ${file.type} not allowed` };
  }
  return { ok: true };
}

// Build storage path: {project_id}/{file_uuid}.{ext}
export function buildStoragePath(projectId, mimeType) {
  const ext = FILE_TYPE_EXTENSIONS[mimeType] || 'bin';
  const fileUuid = crypto.randomUUID();
  return `${projectId}/${fileUuid}.${ext}`;
}

// Sanitize original filename — strip dangerous chars but preserve readability
export function sanitizeFilename(filename) {
  if (!filename) return 'untitled';
  // Strip path traversal attempts
  const base = filename.replace(/^.*[\\/]/, '');
  // Limit length
  return base.slice(0, 200);
}
