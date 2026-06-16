'use client';
// src/components/portal/ui/SectionHeader.jsx

export default function SectionHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-end justify-between gap-4 mb-5 ${className}`}>
      <div>
        <h2 className="text-[20px] font-semibold text-[#FAFAFA] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-[13px] text-[#A1A1AA]">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
