'use client';
// src/components/portal/ui/EmptyState.jsx

export default function EmptyState({ title, message, action, className = '' }) {
  return (
    <div className={`rounded-lg border border-dashed border-[#27272A] bg-[#131316]/30 px-6 py-12 text-center ${className}`}>
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1C1C20] border border-[#27272A]">
        <div className="h-1.5 w-1.5 rounded-full bg-[#D4B27A]/60" />
      </div>
      <h3 className="text-[15px] font-medium text-[#FAFAFA]">{title}</h3>
      {message && (
        <p className="mt-1.5 mx-auto max-w-sm text-[13px] text-[#A1A1AA] leading-relaxed">
          {message}
        </p>
      )}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
