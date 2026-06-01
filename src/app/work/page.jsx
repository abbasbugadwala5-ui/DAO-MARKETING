import Link from 'next/link';

export const metadata = {
  title: 'Selected Work',
  description:
    'Cinematic content, social, and brand work for Dubai property and lifestyle brands. Most of our active engagements are under NDA — case studies coming soon.',
  alternates: { canonical: 'https://daomarketing.com/work' },
  openGraph: {
    title: 'Selected Work — DAO Marketing',
    description:
      'Cinematic content, social, and brand work for Dubai property and lifestyle brands.',
    url: 'https://daomarketing.com/work',
    siteName: 'DAO Marketing',
    type: 'website',
    locale: 'en_AE',
  },
};

export default function WorkPage() {
  return (
    <main className="legal-page">
      <section className="legal-wrap">
        <div className="legal-eyebrow">Selected Work</div>
        <h1 className="legal-title">
          Cinematic social <em>and websites</em> for Dubai property and
          lifestyle brands.
        </h1>

        <div className="legal-body">
          <p className="legal-lede">
            Most of our active engagements are under NDA. Detailed case studies
            are landing here as approvals come through.
          </p>

          <h2>What we&rsquo;re working on</h2>
          <ul>
            <li>
              <strong>Cinematic content</strong> — reels, hero films, brand
              docs.
            </li>
            <li>
              <strong>Social-first creative</strong> — always-on programs across
              Instagram, TikTok, LinkedIn and YouTube Shorts.
            </li>
            <li>
              <strong>Web platforms</strong> — Next.js builds with
              performance-tuned content models for property and lifestyle
              brands.
            </li>
            <li>
              <strong>Brand identity</strong> — strategy and visual systems for
              founder-led companies in Dubai.
            </li>
          </ul>

          <h2>Want to see specific work?</h2>
          <p>
            Tell us what category you&rsquo;d like to see and we&rsquo;ll send a
            short reel under NDA.{' '}
            <Link href="/contact" className="legal-link">
              Start a conversation →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
