export const metadata = {
  title: 'Privacy Policy',
  description: 'How DAO Marketing collects, uses and protects your personal data.',
  alternates: { canonical: 'https://daomarketing.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <section className="legal-wrap">
        <div className="legal-eyebrow">Legal</div>
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-meta">Last updated: 25 May 2026</p>

        <div className="legal-body">
          <p>
            DAO Marketing Management LLC (&ldquo;DAO Marketing&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;) respects your privacy. This policy describes what
            personal data we collect when you use{' '}
            <strong>daomarketing.com</strong> and how we handle it.
          </p>

          <h2>Data we collect</h2>
          <ul>
            <li>
              <strong>Contact form submissions:</strong> name, email, company,
              service, budget, project details — sent only when you submit the
              form on our contact page.
            </li>
            <li>
              <strong>Analytics:</strong> Google Analytics 4 records pseudonymous
              events (page views, scroll depth, outbound clicks) along with
              standard browser signals (language, device class, country at
              city-level only). We do not link this to your identity.
            </li>
            <li>
              <strong>Server logs:</strong> our hosting provider (Vercel) keeps
              short-lived access logs containing IP and user-agent for security
              and performance.
            </li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>Reply to your enquiry within one business day.</li>
            <li>Send a proposal when you ask for one.</li>
            <li>Understand which content and services are working, in aggregate.</li>
          </ul>

          <h2>What we do not do</h2>
          <ul>
            <li>Sell your data to anyone.</li>
            <li>Use your enquiry to add you to a newsletter without consent.</li>
            <li>Run third-party advertising trackers or remarketing pixels.</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            See our <a href="/cookies">Cookie Policy</a> for the full list.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us to access, correct or delete any personal data we
            hold by emailing{' '}
            <a href="mailto:fraz@daomarketing.com">fraz@daomarketing.com</a>.
            We respond within 30 days as required under UAE Federal Decree-Law
            No. 45 of 2021 on Personal Data Protection, and respect equivalent
            rights under GDPR for EU residents.
          </p>

          <h2>Contact</h2>
          <p>
            DAO Marketing Management LLC<br />
            The One Tower, 24th Floor · Office 9<br />
            Sheikh Zayed Road, Dubai, UAE<br />
            <a href="mailto:fraz@daomarketing.com">fraz@daomarketing.com</a>
          </p>
        </div>
      </section>
    </main>
  );
}
