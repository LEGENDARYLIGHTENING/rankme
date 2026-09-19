import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // 1. Force non-WWW canonical domain (301 Permanent Redirect)
  if (hostname.toLowerCase().startsWith('www.')) {
    const cleanHost = hostname.replace(/^www\./i, '');
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    return NextResponse.redirect(`${protocol}://${cleanHost}${url.pathname}${url.search}`, 301);
  }

  // 2. Redirect legacy /home and /home/ alias to root /
  if (url.pathname === '/home' || url.pathname === '/home/') {
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }

  // 3. Strip trailing slash (except root) to prevent duplicate content indexing
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, and public files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)$).*)',
  ],
};
