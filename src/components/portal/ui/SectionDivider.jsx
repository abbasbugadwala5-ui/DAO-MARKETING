'use client';
// src/components/portal/ui/SectionDivider.jsx

const DISPLAY = { fontFamily: "'Bodoni Moda', Georgia, serif" };

export default function SectionDivider({ eyebrow, title, subtitle, action, className = '' }) {
  return (
    <header className={`mt-16 md:mt-20 ${className}`}>
      {/* Decorative hairline + eyebrow */}
      <div className="flex items-center gap-4 mb-4">
        <span className="h-px w-12 bg-[#D4B27A]/30" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4B27A]">
          {eyebrow}
        </span>
        <span className="h-px flex-1 bg-[#D4B27A]/15" />
      </div>

      {/* Title + action row */}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl text-[#F5E9D1]" style={DISPLAY}>
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 text-sm text-[#F5E9D1]/55 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}
