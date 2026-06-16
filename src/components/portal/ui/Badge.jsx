'use client';
// src/components/portal/ui/Badge.jsx

const variants = {
  default: 'bg-[#1C1C20] text-[#A1A1AA] border-[#27272A]',
  gold: 'bg-[rgba(212,178,122,0.1)] text-[#D4B27A] border-[rgba(212,178,122,0.25)]',
  success: 'bg-[rgba(34,197,94,0.1)] text-[#22C55E] border-[rgba(34,197,94,0.25)]',
  warning: 'bg-[rgba(234,179,8,0.1)] text-[#EAB308] border-[rgba(234,179,8,0.25)]',
  danger: 'bg-[rgba(239,68,68,0.1)] text-[#EF4444] border-[rgba(239,68,68,0.25)]',
  muted: 'bg-[#1C1C20] text-[#71717A] border-[#27272A]',
};

export default function Badge({ variant = 'default', children, className = '', ...props }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
