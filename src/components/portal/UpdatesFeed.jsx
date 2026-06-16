'use client';

export default function UpdatesFeed({ updates }) {
  const serifItalic = { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' };
  const sans = { fontFamily: "'Schibsted Grotesk', sans-serif" };

  const visible = (updates || [])
    .filter(u => u.visible_to_client !== false)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (visible.length === 0) {
    return (
      <p style={{ ...serifItalic, color: 'rgba(245, 233, 209, 0.4)' }} className="text-sm">
        Updates from your team will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-px bg-[#D4B27A]/10">
      {visible.map((u) => (
        <div
          key={u.id}
          className="bg-[#0A0908] p-4 sm:p-6 border-l-2 border-[#D4B27A]/30 hover:border-[#D4B27A] transition-colors"
        >
          <div className="flex items-baseline justify-between gap-3 sm:gap-4 mb-3 flex-wrap">
            <h3 style={serifItalic} className="text-base sm:text-lg text-[#F5E9D1]">{u.title}</h3>
            <div style={sans} className="text-[10px] uppercase tracking-[0.2em] text-[#F5E9D1]/40 whitespace-nowrap">
              {new Date(u.created_at).toLocaleDateString('en-AE', { day: 'numeric', month: 'short' })}
            </div>
          </div>
          <p style={sans} className="text-sm sm:text-base text-[#F5E9D1]/70 leading-relaxed whitespace-pre-wrap">{u.content}</p>
          {u.posted_by?.full_name && (
            <div style={sans} className="text-[10px] uppercase tracking-[0.2em] text-[#D4B27A]/60 mt-4">
              — {u.posted_by.full_name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
