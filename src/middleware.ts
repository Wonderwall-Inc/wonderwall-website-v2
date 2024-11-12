import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

export function middleware(request: NextRequest): NextResponse<unknown> {
  const pathname = request.nextUrl.pathname

  if (!pathname.includes('admin') && !pathname.includes('ja-jp') && !pathname.includes('en-us')) {
    console.log('redirecting')
    return NextResponse.redirect(new URL(`/ja-jp${pathname}`, request.url))
  }

  if (pathname === '/en') {
    return NextResponse.redirect(new URL(`/en-us`, request.url))
  }

  return NextResponse.next()
}
