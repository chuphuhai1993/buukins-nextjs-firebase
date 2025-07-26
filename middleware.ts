import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const slug = host.split('.')[0];
  const reserved = ['www', 'vercel', 'localhost'];

  const pathname = request.nextUrl.pathname;

  const isPublicAsset = pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.includes('.');
  
  // Kiểm tra domain gốc: chỉ có 2 phần (buukins.com, localhost:3000, ...)
  const hostParts = host.split('.');
  // Nếu là buukins.com hoặc localhost:3000 hoặc www.buukins.com thì là root domain
  const isRootDomain =
    (hostParts.length === 2 && hostParts[1].includes('com')) ||
    (hostParts.length === 2 && reserved.includes(slug)) ||
    (hostParts.length === 3 && reserved.includes(slug));

  if (isPublicAsset) return NextResponse.next();

  // Nếu là subdomain và path là "/", rewrite sang /[slug]
  if (!isRootDomain && pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${slug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
