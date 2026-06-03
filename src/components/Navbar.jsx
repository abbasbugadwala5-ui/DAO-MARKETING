'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/daomarketing',
    network: 'instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/dao-marketing-management-llc/',
    network: 'linkedin',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@daomarketing',
    network: 'tiktok',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.14V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.93a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/daomarketingmanagement',
    network: 'facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [visible, setVisible] = useState(!isHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (isHome) setVisible(y > window.innerHeight * 0.7);
      else setVisible(true);
      setScrolled(y > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const closeTimer = useRef(null);
  const handleEnter = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpen(true);
  };
  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };

  const go = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <header className={`dao-nav ${visible ? '' : 'is-hidden'} ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <button
          type="button"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onFocus={handleEnter}
          className="nav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="nav-menu-icon" aria-hidden><span /><span /></span>
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>

        <Link href="/" onClick={go('/')} className="nav-mark" aria-label="DAO Marketing Management — Home">
          <img src="/logo/logo-mark.svg" alt="DAO Marketing Management" className="nav-mark-logo" />
        </Link>

        <Link href="/contact" onClick={go('/contact')} className="nav-cta">Start a project</Link>
      </header>

      <aside
        className={`nav-overlay ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <button type="button" className="nav-overlay-bg" onClick={() => setOpen(false)} aria-label="Close menu" />
        <div
          className="nav-panel"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <nav className="nav-panel-links">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-panel-link${active ? ' is-active' : ''}`}
                  onClick={go(l.href)}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="nav-panel-foot">
            <div>
              <div className="nav-panel-label">Contact</div>
              <a href="tel:+971504425845" className="nav-panel-fact nav-panel-line">
                <svg className="nav-panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+971 50 442 5845</span>
              </a>
              <a href="tel:+97141234567" className="nav-panel-fact nav-panel-line">
                <svg className="nav-panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8c0-1.7 1.7-3 4-3h10c2.3 0 4 1.3 4 3v2.5c0 .8-.7 1.5-1.5 1.5h-1L17 9H7l-1.5 3h-1C3.7 12 3 11.3 3 10.5V8z" />
                  <rect x="6" y="13" width="12" height="8" rx="1" />
                  <circle cx="9" cy="16" r="0.6" fill="currentColor" />
                  <circle cx="12" cy="16" r="0.6" fill="currentColor" />
                  <circle cx="15" cy="16" r="0.6" fill="currentColor" />
                  <circle cx="9" cy="19" r="0.6" fill="currentColor" />
                  <circle cx="12" cy="19" r="0.6" fill="currentColor" />
                  <circle cx="15" cy="19" r="0.6" fill="currentColor" />
                </svg>
                <span>(04) 879 0716</span>
              </a>
              <a href="mailto:fraz@daomarketing.com" className="nav-panel-fact nav-panel-line">
                <svg className="nav-panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                  <path d="m3 6 9 7 9-7" />
                </svg>
                <span>fraz@daomarketing.com</span>
              </a>
            </div>
            <div>
              <div className="nav-panel-label">Studio</div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=The+One+Tower+Sheikh+Zayed+Road+Dubai"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-panel-fact"
              >
                The One Tower<br />
                Sheikh Zayed Road<br />
                24th Floor · Office 9<br />
                Dubai, UAE
              </a>
            </div>
            <div>
              <div className="nav-panel-label">Follow</div>
              <div className="nav-panel-social-row">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-panel-social"
                    aria-label={`DAO Marketing on ${s.label}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="nav-panel-label">Entity</div>
              <p className="nav-panel-fact">DAO Marketing Management LLC</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
