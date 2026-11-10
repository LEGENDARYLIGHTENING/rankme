import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  const strippedPath =
    pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  // 1. Force non-WWW canonical domain + strip trailing slash in one 301 hop
  if (hostname.toLowerCase().startsWith('www.')) {
    const cleanHost = hostname.replace(/^www\./i, '');
    const protocol =
      hostname.includes('localhost') || hostname.includes('127.0.0.1') ? 'http' : 'https';
    return NextResponse.redirect(`${protocol}://${cleanHost}${strippedPath}${search}`, 301);
  }

  // 2. Redirect legacy /home and /home/ alias to root /
  if (pathname === '/home' || pathname === '/home/') {
    return NextResponse.redirect(new URL(`/${search}`, request.url), 301);
  }

  // 3. Strip trailing slash (except root) with explicit 301
  if (pathname !== '/' && pathname.endsWith('/')) {
    return NextResponse.redirect(new URL(`${strippedPath}${search}`, request.url), 301);
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
