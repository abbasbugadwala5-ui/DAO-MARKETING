export const metadata = {
  title: 'Thank you — DAO Marketing',
  description: 'Your enquiry has been received. A real person will reply within one business day.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://daomarketing.com/thank-you' },
};

export default function ThankYouPage() {
  return (
    <main className="ty-page">
      <section className="ty-wrap">
        <div className="ty-seal" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
            <path
              d="M14 25l7 7 14-15"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="ty-eyebrow">Enquiry received · Dubai</div>

        <h1 className="ty-title">
          Thank you — your message is <em>on its way</em>.
        </h1>

        <p className="ty-lede">
          A real person reads every enquiry and will reply with a clear next
          step within one business day. Keep an eye on your inbox.
        </p>

        <div className="ty-actions">
          <a href="/" className="ty-btn ty-btn-primary">Back to home</a>
          <a href="/work" className="ty-btn ty-btn-ghost">See our work</a>
        </div>
      </section>

      <style>{`
        .ty-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 24px;
          background: var(--color-paper);
          color: var(--color-ink);
        }
        .ty-wrap {
          max-width: 620px;
          text-align: center;
          animation: ty-rise 0.9s cubic-bezier(.22,.61,.36,1) both;
        }
        .ty-seal {
          width: 78px;
          height: 78px;
          margin: 0 auto 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid var(--color-inksoft);
          color: var(--color-ink);
        }
        .ty-eyebrow {
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-inksoft);
          margin-bottom: 22px;
        }
        .ty-title {
          font-family: var(--font-serif);
          font-weight: 500;
          font-size: clamp(32px, 5vw, 52px);
          line-height: 1.1;
          color: var(--color-ink);
          margin: 0 0 22px;
        }
        .ty-title em { font-style: italic; }
        .ty-lede {
          font-family: var(--font-display);
          font-size: 16px;
          line-height: 1.7;
          color: var(--color-inksoft);
          max-width: 460px;
          margin: 0 auto 40px;
        }
        .ty-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .ty-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 30px;
          border-radius: 999px;
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: transform 0.4s var(--ease), opacity 0.4s var(--ease);
        }
        .ty-btn:hover { transform: translateY(-2px); }
        .ty-btn-primary {
          background: var(--color-ink);
          color: var(--color-paper);
        }
        .ty-btn-ghost {
          border: 1px solid var(--color-inksoft);
          color: var(--color-ink);
        }
        @keyframes ty-rise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
