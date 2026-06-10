'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function PortalShell({ children, user, profile }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [signingOut, setSigningOut] = useState(false);

  // Login page or no user — render bare (no shell)
  if (pathname === '/portal/login' || !user) {
    return <>{children}</>;
  }

  const isAdmin = profile?.role === 'admin';

  const navLinks = [
    { href: '/portal/dashboard', label: 'Dashboard' },
    ...(isAdmin ? [{ href: '/portal/clients', label: 'Clients' }] : []),
    { href: '/portal/settings', label: 'Settings' },
  ];

  const signOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push('/portal/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5E9D1] flex">
      <aside className="w-64 border-r border-[#D4B27A]/15 flex flex-col bg-gradient-to-b from-[#0A0908] to-[#13110D]">
        <div className="p-8 border-b border-[#D4B27A]/15">
          <Link href="/" className="font-serif italic text-2xl font-medium text-[#D4B27A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            DAO<span className="text-[#F5E9D1]/60 text-sm not-italic ml-2 tracking-[0.2em] uppercase" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>Portal</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map(link => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontFamily: "'JetBrains Mono', 'Schibsted Grotesk', monospace" }}
                className={`block px-4 py-3 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                  active
                    ? 'bg-[#D4B27A]/10 text-[#D4B27A] border-l-2 border-[#D4B27A]'
                    : 'text-[#F5E9D1]/60 hover:text-[#D4B27A] hover:bg-[#D4B27A]/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#D4B27A]/15">
          <div className="flex items-center gap-3 mb-4 p-3 bg-[#D4B27A]/5">
            <div className="w-9 h-9 rounded-full bg-[#D4B27A]/20 flex items-center justify-center text-sm text-[#D4B27A]" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
              {(profile?.full_name?.[0] || user.email[0]).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
                {profile?.full_name || 'User'}
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#F5E9D1]/40" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
                {profile?.role === 'admin' ? 'Admin' : 'Client'}
              </div>
            </div>
          </div>
          <button
            onClick={signOut}
            disabled={signingOut}
            style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}
            className="w-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#F5E9D1]/50 hover:text-[#D4B27A] transition-colors"
          >
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
