import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="dao-footer">
      <div className="df-mask-wrap">
        <div className="df-mask-text">DAO MARKETING</div>
      </div>

      <div className="df-contact-grid">
        <div className="df-contact-big">
          <a href="tel:+971504425845">+971 50 442 5845</a>
          <a href="mailto:fraz@daomarketing.com">fraz@daomarketing.com</a>
        </div>
        <div className="df-contact-meta">
          <div>
            <div className="df-contact-label">Studio</div>
            <p>
              The One Tower<br />
              Sheikh Zayed Road<br />
              24th Floor · Office 9<br />
              Dubai, UAE
            </p>
            <p style={{ marginTop: 12, opacity: 0.6 }}>DAO Marketing LLC</p>
          </div>
          <div>
            <div className="df-contact-label">Pages</div>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/work">Work</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <div className="df-contact-label">Legal</div>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
          <div>
            <div className="df-contact-label">Social</div>
            <a href="https://www.instagram.com/daomarketing" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/company/dao-marketing-management-llc/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="df-base">
        <span>DAO Marketing LLC</span>
        <span>© 2026 — All rights reserved</span>
      </div>
    </footer>
  );
}
