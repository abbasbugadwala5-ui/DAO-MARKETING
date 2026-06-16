// src/lib/portal/constants.js
// Shared portal constants. Keep these in sync with the DB CHECK constraints
// on projects.status and milestones.status.

export const PROJECT_STATUSES = [
  'proposal',
  'discovery',
  'in_progress',
  'review',
  'delivered',
  'completed',
  'on_hold',
];

// Label + accent colour per status (matches the dashboard StatusBadge palette).
export const STATUS_META = {
  proposal:    { label: 'Proposal',    color: '#7A8470' },
  discovery:   { label: 'Discovery',   color: '#D4B27A' },
  in_progress: { label: 'In Progress', color: '#E5BB5C' },
  review:      { label: 'In Review',   color: '#A85E3B' },
  delivered:   { label: 'Delivered',   color: '#3E8055' },
  completed:   { label: 'Completed',   color: '#5B9C72' },
  on_hold:     { label: 'On Hold',     color: '#8B3A3A' },
};

export const MILESTONE_STATUSES = ['pending', 'in_progress', 'completed'];

export const MILESTONE_META = {
  pending:     { label: 'Pending',     color: 'rgba(212,178,122,0.30)' },
  in_progress: { label: 'In Progress', color: '#E5BB5C' },
  completed:   { label: 'Completed',   color: '#D4B27A' },
};

export const SERVICE_TYPES = [
  'brand_identity',
  'web_development',
  'cinematic_content',
  'social_media',
  'paid_media',
  'seo',
  'full_service',
  'consultation',
];

export const SERVICE_TYPE_META = {
  brand_identity:    { label: 'Brand Identity' },
  web_development:   { label: 'Web Development' },
  cinematic_content: { label: 'Cinematic Content' },
  social_media:      { label: 'Social Media' },
  paid_media:        { label: 'Paid Media' },
  seo:               { label: 'SEO' },
  full_service:      { label: 'Full Service' },
  consultation:      { label: 'Consultation' },
};
