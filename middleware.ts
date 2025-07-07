import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const slug = host.split('.')[0];
  const reserved = ['www', 'meez', 'vercel', 'localhost'];

  const pathname = request.nextUrl.pathname;

  // Không rewrite nếu đang truy cập file tĩnh, API, hoặc trang chủ "/"
  const isPublicAsset = pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.includes('.');
  if (isPublicAsset || pathname === '/') return NextResponse.next();

  if (!reserved.includes(slug)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${slug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
