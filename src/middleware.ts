import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest): NextResponse<unknown> {
  const pathname = request.nextUrl.pathname

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ja-jp', request.url))
  }

  if (pathname === '/en') {
    return NextResponse.redirect(new URL(`/en-us`, request.url))
  }

  return NextResponse.next()
}
