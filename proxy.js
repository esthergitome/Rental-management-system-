import { NextResponse } from 'next/server';

export function proxy(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  // 1. Handle the root route (/) redirect
  if (pathname === '/') {
    return NextResponse.redirect(new URL(token ? '/dashboard' : '/login', request.url));
  }

  // 2. Protect dashboard routes
  const protectedPaths = ['/dashboard', '/properties', '/tenants', '/payments', '/reports'];
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Prevent logged-in users from going back to login
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/properties/:path*', '/tenants/:path*', '/payments/:path*', '/reports/:path*', '/login'],
};
