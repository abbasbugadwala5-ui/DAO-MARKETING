'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/daostudio' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/daostudio' },
  { label: 'Behance', href: 'https://behance.net/daostudio' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [visible, setVisible] = useState(!isHome);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isHome) { setVisible(true); return; }
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const go = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <header className={`dao-nav ${visible ? '' : 'is-hidden'} ${open ? 'is-open' : ''}`}>
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="nav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="nav-menu-icon" aria-hidden><span /><span /></span>
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>

        <Link href="/" onClick={go('/')} className="nav-mark" aria-label="DAO Studio — Home">
          <img src="/logo/logo.svg" alt="DAO Studio" className="nav-mark-logo" />
        </Link>

        <Link href="/contact" onClick={go('/contact')} className="nav-cta">Start a project</Link>
      </header>

      <aside className={`nav-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <button type="button" className="nav-overlay-bg" onClick={() => setOpen(false)} aria-label="Close menu" />
        <div className="nav-panel">
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
              <a href="mailto:fraz@daomarketing.com" className="nav-panel-fact">fraz@daomarketing.com</a>
              <a href="tel:+971504425845" className="nav-panel-fact">+971 50 442 5845</a>
            </div>
            <div>
              <div className="nav-panel-label">Studio</div>
              <p className="nav-panel-fact">
                The One Tower<br />
                Sheikh Zayed Road<br />
                24th Floor · Office 9<br />
                Dubai, UAE
              </p>
            </div>
            <div>
              <div className="nav-panel-label">Social</div>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="nav-panel-fact">{s.label}</a>
              ))}
            </div>
            <div>
              <div className="nav-panel-label">Entity</div>
              <p className="nav-panel-fact">DAO Marketing LLC</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
