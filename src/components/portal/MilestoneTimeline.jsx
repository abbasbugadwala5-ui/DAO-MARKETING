'use client';

export default function MilestoneTimeline({ milestones }) {
  const sorted = [...milestones].sort((a, b) => a.order_index - b.order_index);

  const serifItalic = { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' };
  const sans = { fontFamily: "'Schibsted Grotesk', sans-serif" };

  if (sorted.length === 0) {
    return (
      <p style={{ ...serifItalic, color: 'rgba(245, 233, 209, 0.4)' }} className="text-sm">
        Milestones will appear here as your project progresses.
      </p>
    );
  }

  return (
    <div className="space-y-0">
      {sorted.map((m, i) => (
        <div key={m.id} className="flex items-start gap-4 py-3">
          <div className="relative flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full border-2 transition-colors ${
              m.status === 'completed' ? 'bg-[#D4B27A] border-[#D4B27A]'
              : m.status === 'in_progress' ? 'bg-transparent border-[#D4B27A] animate-pulse'
              : 'bg-transparent border-[#F5E9D1]/30'
            }`} />
            {i < sorted.length - 1 && (
              <div className={`w-px flex-1 mt-1 min-h-[40px] ${
                m.status === 'completed' ? 'bg-[#D4B27A]' : 'bg-[#F5E9D1]/15'
              }`} />
            )}
          </div>
          <div className="flex-1 pb-4">
            <div
              style={serifItalic}
              className={`text-base ${m.status === 'completed' ? 'text-[#D4B27A]' : 'text-[#F5E9D1]'}`}
            >
              {m.title}
            </div>
            {m.description && (
              <div style={sans} className="text-[#F5E9D1]/55 text-sm mt-1">{m.description}</div>
            )}
            {m.completed_at && (
              <div style={sans} className="text-[9px] uppercase tracking-[0.2em] text-[#F5E9D1]/35 mt-2">
                Completed · {new Date(m.completed_at).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            )}
            {m.status === 'in_progress' && (
              <div style={sans} className="text-[9px] uppercase tracking-[0.2em] text-[#D4B27A] mt-2">
                In progress
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
