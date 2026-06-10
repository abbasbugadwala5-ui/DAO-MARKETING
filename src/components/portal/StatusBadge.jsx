const STATUS_CONFIG = {
  proposal:    { label: 'Proposal',    color: '#7A8470', bg: 'rgba(122, 132, 112, 0.15)' },
  discovery:   { label: 'Discovery',   color: '#D4B27A', bg: 'rgba(212, 178, 122, 0.15)' },
  in_progress: { label: 'In progress', color: '#E5BB5C', bg: 'rgba(229, 187, 92, 0.15)' },
  review:      { label: 'Review',      color: '#A85E3B', bg: 'rgba(168, 94, 59, 0.15)' },
  delivered:   { label: 'Delivered',   color: '#3E8055', bg: 'rgba(62, 128, 85, 0.15)' },
  completed:   { label: 'Completed',   color: '#5B9C72', bg: 'rgba(91, 156, 114, 0.20)' },
  on_hold:     { label: 'On hold',     color: '#A85E5E', bg: 'rgba(168, 94, 94, 0.15)' },
};

export default function StatusBadge({ status, large = false }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.proposal;
  const sans = { fontFamily: "'Schibsted Grotesk', sans-serif" };

  return (
    <span
      style={{
        ...sans,
        color: config.color,
        backgroundColor: config.bg,
        borderColor: config.color + '40',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
      className={`inline-flex items-center gap-2 uppercase tracking-[0.18em] ${
        large ? 'px-4 py-2 text-xs' : 'px-3 py-1.5 text-[10px]'
      }`}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}
