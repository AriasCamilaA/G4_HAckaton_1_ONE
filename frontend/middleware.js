import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/manageKeys') || url.pathname.startsWith('/logs')) {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname.startsWith('/login') || url.pathname.startsWith('/registration')) {
    if (token) {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/Dashboard',
    '/Dashboard/:path*',
    '/manageKeys/:path*',
    '/Model/:path*',
    '/logs/:path*',
    '/login',
    '/registration',
  ],
};
