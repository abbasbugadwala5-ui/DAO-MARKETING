'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="dao-footer">
      <div className="df-mask-wrap">
        <div className="df-mask-text">DAO MARKETING</div>
      </div>

      <div className="df-contact-grid">
        <div className="df-contact-big">
          <div className="df-contact-label">Contact</div>

          <a
            href="tel:+971504425845"
            className="df-contact-line"
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'phone_click', {
                  phone: '+971504425845',
                  location: 'footer',
                });
              }
            }}
          >
            <svg className="df-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+971 50 442 5845</span>
          </a>

          <a
            href="tel:+97141234567"
            className="df-contact-line"
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'landline_click', {
                  phone: '+97141234567',
                  location: 'footer',
                });
              }
            }}
          >
            <svg className="df-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 7h8M8 11h8M8 15h5" />
            </svg>
            <span>+971 4 123 4567</span>
          </a>

          <a
            href="mailto:fraz@daomarketing.com"
            className="df-contact-line"
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'email_click', {
                  email: 'fraz@daomarketing.com',
                  location: 'footer',
                });
              }
            }}
          >
            <svg className="df-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
              <path d="m3 6 9 7 9-7" />
            </svg>
            <span>fraz@daomarketing.com</span>
          </a>

          <div className="df-social-block">
            <div className="df-social-label">Follow</div>
            <div className="df-social-row">
              <a
                href="https://www.instagram.com/daomarketing"
                target="_blank"
                rel="noopener noreferrer"
                className="df-social-icon-link"
                aria-label="DAO Marketing on Instagram"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'social_click', {
                      network: 'instagram',
                      location: 'footer',
                    });
                  }
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="3.8" />
                  <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/dao-marketing-management-llc/"
                target="_blank"
                rel="noopener noreferrer"
                className="df-social-icon-link"
                aria-label="DAO Marketing on LinkedIn"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'social_click', {
                      network: 'linkedin',
                      location: 'footer',
                    });
                  }
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@daomarketing"
                target="_blank"
                rel="noopener noreferrer"
                className="df-social-icon-link"
                aria-label="DAO Marketing on TikTok"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'social_click', {
                      network: 'tiktok',
                      location: 'footer',
                    });
                  }
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.14V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.93a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" />
                </svg>
              </a>
              <a
                href="https://wa.me/971504425845?text=Hi%20DAO%2C%20I%27m%20interested%20in%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="df-social-icon-link"
                aria-label="DAO Marketing on WhatsApp"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'whatsapp_click', {
                      number: '+971504425845',
                      location: 'footer',
                    });
                  }
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
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
            <p style={{ marginTop: 12, opacity: 0.6 }}>DAO Marketing Management LLC</p>
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
        </div>
      </div>

      <div className="df-base">
        <span>DAO Marketing Management LLC</span>
        <span>© 2026 — All rights reserved</span>
      </div>
    </footer>
  );
}
