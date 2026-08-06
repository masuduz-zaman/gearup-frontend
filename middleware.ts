import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("role")?.value; // customer | provider | admin
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Role Based Redirection Protection
    if (pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/dashboard/provider") && userRole !== "provider" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }

    if (pathname.startsWith("/dashboard/customer") && userRole !== "customer") {
      return NextResponse.redirect(new URL("/dashboard/provider", request.url));
    }
  }


  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};