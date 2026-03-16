import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const pathname = req.nextUrl.pathname;

  const publicPaths = ["/", "/signup", "/favicon.ico", "/robots.txt"];

  const session = cookieStore.get("session");

  // If user is authenticated, block access to public routes
  if (
    session &&
    (publicPaths.includes(pathname) ||
      pathname === "/" ||
      pathname === "/signup")
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  } else if (!session && publicPaths.includes(pathname)) {
    // If user is not authenticated, allow access to public routes
    return NextResponse.next();
  }

  // Always allow internal paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/public") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/assets/")
  ) {
    return NextResponse.next();
  }

  // Block access to protected routes if no session
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
