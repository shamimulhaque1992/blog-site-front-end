import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./utils/jwt";
import { cookies } from "next/headers";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/news"];

const routeMatches = (route: string, pathName: string) =>
  pathName === route || pathName.startsWith(`${route}/`);

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
      )
    : null;

  let userRole = null;

  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (decodedAccessToken?.success && typeof decodedAccessToken !== "string") {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  // redirect authenticated user from auth routes
  if (
    accessToken &&
    AUTH_ROUTES.some((route) => routeMatches(route, pathName))
  ) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    }

    // return NextResponse.redirect(new URL("/", request.url));
  }

  // authenticate user for protected routes

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    routeMatches(route, pathName),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    routeMatches(route, pathName),
  );

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // redirect users to the authorized routes
  if (pathName.startsWith("/dashboard") && userRole !== "USER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathName.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathName.startsWith("/author-dashboard") &&
    userRole !== "AUTHOR"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
