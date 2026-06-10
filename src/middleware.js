import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Only run middleware on /portal/* routes
  if (!request.nextUrl.pathname.startsWith('/portal')) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Login page: redirect to dashboard if already authenticated
  if (request.nextUrl.pathname === '/portal/login') {
    if (user) {
      return NextResponse.redirect(new URL('/portal/dashboard', request.url));
    }
    return response;
  }

  // All other /portal/* routes: require authentication
  if (!user) {
    return NextResponse.redirect(new URL('/portal/login', request.url));
  }

  // /portal/clients route: admin only
  if (request.nextUrl.pathname.startsWith('/portal/clients')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/portal/dashboard', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/portal/:path*'],
};
