export const metadata = {
  title: 'Project · DAO Marketing Portal',
};

export default async function ProjectDetailPlaceholder({ params }) {
  const { id } = await params;
  const serifItalic = { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' };
  const sans = { fontFamily: "'Schibsted Grotesk', sans-serif" };

  return (
    <div className="p-12">
      <a href="/portal/dashboard" style={sans} className="inline-block text-[10px] uppercase tracking-[0.3em] text-[#D4B27A] hover:text-[#E5BB5C] mb-8">
        ← Back to dashboard
      </a>
      <div style={sans} className="text-[10px] uppercase tracking-[0.3em] text-[#D4B27A]/60 mb-4">
        Phase 3 — Project detail
      </div>
      <h1 style={serifItalic} className="text-5xl text-[#F5E9D1] mb-4">
        Project detail<span className="text-[#D4B27A]">.</span>
      </h1>
      <p style={sans} className="text-[#F5E9D1]/60 max-w-xl">
        Full project edit view with milestone management, updates posting, and file upload — coming in Phase 3.
      </p>
      <div style={sans} className="mt-8 text-[10px] uppercase tracking-[0.2em] text-[#F5E9D1]/40">
        Project ID: {id}
      </div>
    </div>
  );
}
