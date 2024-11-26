import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { GetCurrentUser } from "./utils/getCurrentUser";
import { useAppSelector } from "./redux/hooks";
import { useCurrentToken } from "./redux/features/Auth/authSlice";
import { verifyToken } from "./utils/veryfyToken";

const AuthRoutes = ['/login', '/register']

type Role = keyof typeof roleBasedRoutes

const roleBasedRoutes = {
  user: [/^\/user/],
  ADMIN: [/^\/admin/],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('refreshToken')?.value
  let user = null
  if (token) {
    user = verifyToken(token)
  }

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next()
    }
    else {
      NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url))
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role]

    if (routes.some(route => pathname.match(route))) {
      return NextResponse.next()
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/response"],
};
