export const metadata = {
  title: 'Cookie Policy',
  description: 'The cookies and similar technologies used by daomarketing.com.',
  alternates: { canonical: 'https://daomarketing.com/cookies' },
};

export default function CookiesPage() {
  return (
    <main className="legal-page">
      <section className="legal-wrap">
        <div className="legal-eyebrow">Legal</div>
        <h1 className="legal-title">Cookie Policy</h1>
        <p className="legal-meta">Last updated: 25 May 2026</p>

        <div className="legal-body">
          <p>
            This site uses a small number of cookies and similar
            browser-storage mechanisms. We do not run advertising trackers or
            remarketing pixels.
          </p>

          <h2>Cookies we use</h2>
          <ul>
            <li>
              <strong>Strictly necessary</strong> — set by our hosting provider
              (Vercel) for security, basic request routing and abuse
              prevention. Cannot be turned off.
            </li>
            <li>
              <strong>Google Analytics 4</strong> (<code>_ga</code>,{' '}
              <code>_ga_*</code>) — measures aggregate usage. Anonymous, no
              cross-site tracking. Expires after 2 years. You can opt out via{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&rsquo;s opt-out browser add-on
              </a>{' '}
              or by enabling &ldquo;Do Not Track&rdquo; in your browser.
            </li>
          </ul>

          <h2>Local storage</h2>
          <p>
            We use the browser&rsquo;s local storage to remember small
            preferences (for example, whether scroll animations should run on
            return visits). No personal data is stored there.
          </p>

          <h2>Third-party services</h2>
          <p>
            Embedded fonts are served by Google Fonts. Submitting the contact
            form transmits your message via our Microsoft 365 SMTP relay. Both
            providers set their own cookies which are governed by their
            respective privacy policies.
          </p>

          <h2>Changes</h2>
          <p>
            If we add or remove cookies, we&rsquo;ll update this page and the
            &ldquo;last updated&rdquo; date above. For questions, write to{' '}
            <a href="mailto:fraz@daomarketing.com">fraz@daomarketing.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
