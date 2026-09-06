import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const AUTH_SECRET =
  process.env.AUTH_SECRET || "abhi_chai_code_orange_portfolio_secret_key_2026_super_secure";
const SECRET_KEY = new TextEncoder().encode(AUTH_SECRET);
const SESSION_COOKIE_NAME = "abhi_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /admin paths
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/admin/login";
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  let isValid = false;
  if (token) {
    try {
      await jwtVerify(token, SECRET_KEY, { algorithms: ["HS256"] });
      isValid = true;
    } catch {
      isValid = false;
    }
  }

  // If visiting login page while already authenticated, redirect to admin dashboard
  if (isLoginPage && isValid) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // If accessing protected admin routes without valid session, redirect to login
  if (!isLoginPage && !isValid) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
