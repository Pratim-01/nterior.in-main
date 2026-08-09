import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const redirectRoutes = [
  // "/login",
  "/signup",
  "/forgot-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (redirectRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/error", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};