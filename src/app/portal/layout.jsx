import { createClient } from '@/lib/supabase/server';
import PortalShell from '@/components/portal/PortalShell';

export const metadata = {
  title: 'Portal · DAO Marketing',
  description: 'Project portal for DAO Marketing clients and team.',
  robots: { index: false, follow: false },
};

/* Hide the root layout's marketing chrome (Navbar, Footer, ScrollIndicator,
   WhatsAppFloat, film-grain) ONLY while a /portal/* route is rendered.
   Selectors stay scoped to this layout's children via the [data-portal] flag
   set on the wrapper div below. */
const PORTAL_CHROME_CSS = `
  body:has([data-portal]) .dao-nav,
  body:has([data-portal]) .dao-footer,
  body:has([data-portal]) .wa-float,
  body:has([data-portal]) .scroll-ind { display: none !important; }
  body:has([data-portal])::before { display: none !important; }
  body:has([data-portal]) { background: #0A0908 !important; }
`;

export default async function PortalLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PORTAL_CHROME_CSS }} />
      <div data-portal>
        <PortalShell user={user} profile={profile}>
          {children}
        </PortalShell>
      </div>
    </>
  );
}
