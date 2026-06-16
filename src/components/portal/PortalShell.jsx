'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogoFull } from '@/components/portal/ui/Logo';
import '@/app/portal/portal.css';

const SHELL_CSS = `
#dao-shell { display: flex; min-height: 100vh; background: #0A0908; position: relative; }
#dao-shell .dao-content { flex: 1; min-width: 0; }

/* Sidebar — desktop default */
#dao-sidebar { width: 248px; flex-shrink: 0; min-height: 100vh; background: #14120D; border-right: 1px solid rgba(212,178,122,0.12); padding: 24px 16px; display: flex; flex-direction: column; box-sizing: border-box; z-index: 30; }
#dao-sidebar * { box-sizing: border-box; }
#dao-sidebar .dao-brand { padding: 16px 8px 8px; margin-bottom: 32px; display: flex; align-items: center; justify-content: center; }
#dao-sidebar .dao-navsec { font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #6E6A60; padding: 0 12px; margin-bottom: 10px; }
#dao-sidebar .dao-sidenav a { display: flex; align-items: center; gap: 12px; padding: 11px 12px; border-radius: 8px; font-size: 14px; color: rgba(245,233,209,0.62); text-decoration: none; margin-bottom: 2px; transition: all 0.15s ease; }
#dao-sidebar .dao-sidenav a:hover { background: rgba(245,233,209,0.04); color: #F5E9D1; }
#dao-sidebar .dao-sidenav a.active { background: rgba(212,178,122,0.12); color: #D4B27A; }
#dao-sidebar .dao-sidenav a svg { width: 18px; height: 18px; flex-shrink: 0; }
#dao-sidebar .dao-sidenav a .dao-badge { margin-left: auto; min-width: 22px; height: 20px; padding: 0 7px; border-radius: 999px; background: #D4B27A; color: #0A0908; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; line-height: 1; }
#dao-sidebar .dao-sidenav a.active .dao-badge { background: #E5BB5C; }
#dao-topbar .dao-tb-bell { position: relative; }
#dao-topbar .dao-tb-bell-dot { position: absolute; top: -2px; right: -2px; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 999px; background: #D4B27A; color: #0A0908; font-size: 10px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; line-height: 1; border: 2px solid #14120D; }
#dao-sidebar .dao-spacer { flex: 1; }
#dao-sidebar .dao-user { display: flex; align-items: center; gap: 11px; padding: 12px; border-top: 1px solid rgba(212,178,122,0.12); }
#dao-sidebar .dao-avatar { width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0; background: rgba(212,178,122,0.14); border: 1px solid rgba(212,178,122,0.22); color: #D4B27A; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; }
#dao-sidebar .dao-uname { font-size: 13px; color: #F5E9D1; line-height: 1.3; }
#dao-sidebar .dao-urole { font-size: 11px; color: #9C968A; text-transform: capitalize; }
#dao-sidebar .dao-signout { margin-top: 8px; padding: 8px 12px; font-size: 12px; color: #9C968A; background: none; border: none; cursor: pointer; text-align: left; width: 100%; display: flex; align-items: center; gap: 10px; font-family: inherit; }
#dao-sidebar .dao-signout svg { width: 17px; height: 17px; flex-shrink: 0; }
#dao-sidebar .dao-signout:hover { color: #D4B27A; }

/* Mobile topbar — hidden on desktop */
#dao-topbar { display: none; }
#dao-backdrop { display: none; }

/* ============== MOBILE / TABLET ============== */
@media (max-width: 1023px) {
  #dao-shell { flex-direction: column; }

  #dao-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #14120D;
    border-bottom: 1px solid rgba(212,178,122,0.12);
    padding: 12px 16px;
    position: sticky;
    top: 0;
    z-index: 25;
    height: 60px;
    flex-shrink: 0;
  }
  #dao-topbar .dao-burger {
    width: 40px; height: 40px;
    background: transparent;
    border: 1px solid rgba(212,178,122,0.18);
    border-radius: 9px;
    color: #D4B27A;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    padding: 0;
  }
  #dao-topbar .dao-burger:hover { background: rgba(212,178,122,0.08); }
  #dao-topbar .dao-burger svg { width: 20px; height: 20px; }
  #dao-topbar .dao-tb-brand { display: flex; align-items: center; }
  #dao-topbar .dao-tb-avatar {
    width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
    background: rgba(212,178,122,0.14);
    border: 1px solid rgba(212,178,122,0.22);
    color: #D4B27A;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 500;
  }

  /* Sidebar becomes drawer */
  #dao-sidebar {
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    width: 280px;
    max-width: 86vw;
    transform: translateX(-100%);
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 40px rgba(0,0,0,0.6);
  }
  #dao-shell.drawer-open #dao-sidebar { transform: translateX(0); }

  /* Backdrop */
  #dao-backdrop {
    display: block;
    position: fixed; inset: 0;
    background: rgba(10,9,8,0.7);
    backdrop-filter: blur(4px);
    z-index: 20;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
  #dao-shell.drawer-open #dao-backdrop {
    opacity: 1;
    pointer-events: auto;
  }

  /* Content gets full width on mobile, no left padding from sidebar */
  #dao-shell .dao-content { width: 100%; }

  /* Body scroll lock when drawer open (visual only — actual lock done via JS) */
  #dao-shell.drawer-open { overflow: hidden; }
}

/* Very small screens */
@media (max-width: 480px) {
  #dao-topbar { padding: 10px 14px; }
}
`;

const NAV_ICONS = {
  '/portal/dashboard': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
  ),
  '/portal/inbox': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
  ),
  '/portal/clients': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  '/portal/settings': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
};

const SIGNOUT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
);

const BURGER_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

export default function PortalShell({ children, user, profile }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [signingOut, setSigningOut] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [unreadTotal, setUnreadTotal] = useState(0);

  // Fetch unread count
  const fetchUnread = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/portal/inbox', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      setUnreadTotal(data.total || 0);
    } catch {}
  }, [user]);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Refresh unread on route change (catches mark-read after user reads chat)
  useEffect(() => {
    fetchUnread();
  }, [pathname, fetchUnread]);

  // Realtime: any message change → refresh count.
  // RLS filters to messages the user can see, so others' chats don't fire here.
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel('shell-inbox')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => { fetchUnread(); }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [supabase, user, fetchUnread]);

  // Body scroll lock when drawer open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Login page or no user — render bare (no shell)
  if (pathname === '/portal/login' || !user) {
    return <>{children}</>;
  }

  const isAdmin = profile?.role === 'admin';

  const navLinks = [
    { href: '/portal/dashboard', label: 'Dashboard' },
    { href: '/portal/inbox', label: 'Inbox', badge: unreadTotal },
    ...(isAdmin ? [{ href: '/portal/clients', label: 'Clients' }] : []),
    { href: '/portal/settings', label: 'Settings' },
  ];

  function isActive(href) {
    if (href === '/portal/dashboard') return pathname === href;
    return pathname.startsWith(href);
  }

  const signOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push('/portal/login');
    router.refresh();
  };

  const initial = (profile?.full_name?.[0] || user.email?.[0] || '?').toUpperCase();

  return (
    <div id="dao-shell" className={drawerOpen ? 'drawer-open' : ''} data-portal>
      <style dangerouslySetInnerHTML={{ __html: SHELL_CSS }} />

      {/* Mobile top bar */}
      <header id="dao-topbar">
        <button
          type="button"
          className="dao-burger dao-tb-bell"
          aria-label={unreadTotal > 0 ? `Open menu (${unreadTotal} unread)` : 'Open menu'}
          onClick={() => setDrawerOpen(true)}
        >
          {BURGER_ICON}
          {unreadTotal > 0 && (
            <span className="dao-tb-bell-dot">{unreadTotal > 9 ? '9+' : unreadTotal}</span>
          )}
        </button>
        <div className="dao-tb-brand">
          <LogoFull height={36} />
        </div>
        <Link href="/portal/settings" aria-label="Account" className="dao-tb-avatar">
          {initial}
        </Link>
      </header>

      {/* Backdrop (mobile only — covers content when drawer open) */}
      <div
        id="dao-backdrop"
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside id="dao-sidebar">
        <div className="dao-brand">
          <LogoFull height={88} />
        </div>

        <div className="dao-navsec">Workspace</div>
        <nav className="dao-sidenav">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? 'active' : ''}
            >
              {NAV_ICONS[item.href]}
              <span>{item.label}</span>
              {item.badge > 0 && <span className="dao-badge">{item.badge > 99 ? '99+' : item.badge}</span>}
            </Link>
          ))}
        </nav>

        <div className="dao-spacer" />

        <div className="dao-user">
          <div className="dao-avatar">{initial}</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="dao-uname">{profile?.full_name || user.email}</div>
            <div className="dao-urole">{profile?.role || 'user'}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className="dao-signout"
        >
          {SIGNOUT_ICON}
          {signingOut ? 'Signing out…' : 'Sign out'}
        </button>
      </aside>

      <main className="dao-content">{children}</main>
    </div>
  );
}
