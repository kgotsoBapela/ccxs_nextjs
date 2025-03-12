import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const session = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/admin') && session?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (pathname.startsWith('/profile') && !session) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/profile/:path*', '/admin/:path*'],
};