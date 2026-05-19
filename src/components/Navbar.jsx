'use client';
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
  return (
    <header className="fixed inset-x-0 top-0 z-[120] flex items-center justify-between px-4 py-4 md:px-6">
      <Link href="/" className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_8px_24px_rgba(18,23,42,0.10)]">
        <span className="text-[15px] font-bold tracking-[-0.03em] text-[#12172A]">DAO</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#E0612E]" />
      </Link>

      <nav className="flex items-center gap-1 rounded-full bg-white p-1 shadow-[0_8px_24px_rgba(18,23,42,0.10)]">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link key={l.href} href={l.href}
              className={`rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 md:px-4 ${
                active ? 'bg-[#12172A] text-white' : 'text-[#12172A] hover:bg-[#ECEAE3]'}`}>
              {l.label}
            </Link>
          );
        })}
      </nav>

      <Link href="/contact"
        className="hidden items-center gap-2 rounded-full bg-[#12172A] px-5 py-2.5 text-[13px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 sm:flex">
        Start a project <span aria-hidden>↗</span>
      </Link>
    </header>
  );
}
