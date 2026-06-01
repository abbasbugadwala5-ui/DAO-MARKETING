export const metadata = {
  title: 'Terms of Service',
  description: 'The terms under which DAO Marketing provides services and operates daomarketing.com.',
  alternates: { canonical: 'https://daomarketing.com/terms' },
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <section className="legal-wrap">
        <div className="legal-eyebrow">Legal</div>
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-meta">Last updated: 25 May 2026</p>

        <div className="legal-body">
          <p>
            These terms govern your use of <strong>daomarketing.com</strong> and
            any services delivered by DAO Marketing Management LLC. Engaging us
            for paid work falls under a separate written agreement; these terms
            cover this website and any pre-engagement communication.
          </p>

          <h2>Use of the site</h2>
          <p>
            The content on this site — words, images, video, code — is owned by
            DAO Marketing unless attributed to a client or third party. You may
            view, link to and quote it under fair-use principles. You may not
            republish, scrape or train models on it without written permission.
          </p>

          <h2>Enquiries</h2>
          <p>
            Submitting the contact form is an enquiry, not a binding engagement.
            We&rsquo;ll reply within one business day. A project only begins
            once a Statement of Work is signed by both parties.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The site is provided &ldquo;as is&rdquo;. We make no warranties about
            uptime, accuracy or fitness for a particular purpose beyond what is
            promised in a signed engagement.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the United Arab Emirates.
            Any dispute will be resolved in the courts of Dubai.
          </p>

          <h2>Contact</h2>
          <p>
            DAO Marketing Management LLC<br />
            <a href="mailto:fraz@daomarketing.com">fraz@daomarketing.com</a>
          </p>
        </div>
      </section>
    </main>
  );
}
