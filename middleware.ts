import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const slug = host.split('.')[0];
  const reserved = ['www', 'meez', 'vercel', 'localhost'];

  const pathname = request.nextUrl.pathname;

  // Không rewrite nếu đang truy cập file tĩnh, API, hoặc trang chủ "/" của domain gốc
  const isPublicAsset = pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.includes('.');
  // Chỉ bỏ qua "/" nếu là domain gốc (localhost:3000 hoặc buukins.com)
  const isRootDomain = reserved.includes(slug);

  if (isPublicAsset) return NextResponse.next();

  // Nếu là subdomain và path là "/", rewrite sang /[slug]
  if (!isRootDomain && pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${slug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
