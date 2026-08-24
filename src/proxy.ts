import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const requestHeaders = new Headers(req.headers);

  // Bypass: login page and auth API
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/admin/auth")
  ) {
    return NextResponse.next();
  }

  // Guard all /admin routes
  if (pathname.startsWith("/admin")) {
    const cookie = req.cookies.get("admin_session");
    if (cookie?.value !== "1") {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/mentoring" || pathname.startsWith("/mentoring/")) {
    requestHeaders.set("x-site-locale", "ru");
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*", "/mentoring", "/mentoring/:path*"],
};
