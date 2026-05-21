'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [visible, setVisible] = useState(!isHome);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (isHome) setVisible(y > window.innerHeight * 0.7);
      else setVisible(true);
      setScrolled(y > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] flex items-center justify-between px-6 py-6 transition-all duration-500 md:px-10 lg:px-14 ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none -translate-y-3 opacity-0'
      }`}
    >
      {/* ── Brand pill ─────────────────────────────────────────────── */}
      <Link
        href="/"
        aria-label="DAO Studio — Home"
        className={`group flex items-center rounded-full border border-white/40 bg-white/75 p-2.5 shadow-[0_2px_4px_rgba(18,23,42,0.04),0_10px_30px_-8px_rgba(18,23,42,0.18)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_2px_4px_rgba(18,23,42,0.04),0_14px_36px_-8px_rgba(18,23,42,0.22)] ${
          scrolled ? 'border-white/60 bg-white/85' : ''
        }`}
      >
        {/* Dark badge so the white-fill logo SVG reads against the light pill */}
        <span className="relative grid h-16 w-16 flex-none place-items-center overflow-hidden rounded-full bg-[#12172A] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/5">
          <img
            src="/logo/logo.svg"
            alt=""
            aria-hidden
            className="h-[56px] w-[56px] object-contain"
          />
        </span>
      </Link>

      {/* ── Nav links ──────────────────────────────────────────────── */}
      <nav className="relative flex flex-1 items-center justify-evenly mx-6 md:mx-10">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`group relative text-[16px] tracking-[0.01em] transition-colors duration-300 ${
                active
                  ? 'font-semibold text-[#12172A]'
                  : 'font-medium text-[#12172A]/70 hover:text-[#12172A]'
              }`}
            >
              {l.label}
              <span
                aria-hidden
                className={`absolute -bottom-1 left-0 h-px bg-[#12172A] transition-all duration-300 ${
                  active ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <Link
        href="/contact"
        className="group hidden items-center gap-2.5 rounded-full bg-[#12172A] px-9 py-[18px] text-[16px] font-medium tracking-[0.02em] text-white shadow-[0_10px_30px_-8px_rgba(18,23,42,0.45)] ring-1 ring-white/5 transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#0a0f1c] hover:shadow-[0_14px_36px_-8px_rgba(18,23,42,0.55)] sm:flex"
      >
        Start a project
        <span
          aria-hidden
          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[12px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </Link>
    </header>
  );
}
