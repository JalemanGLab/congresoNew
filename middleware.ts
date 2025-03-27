import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas que requieren autenticación
const protectedRoutes = [
  "/assistants",
  "/profile",
  "/scanqr",
  "/search",
  "/alerts",
  "/management",
];

// Rutas públicas
const publicRoutes = ["/login", "/"];

// Rutas específicas por rol
const assistantRoutes = ["/profile", "/scanqr"];
const adminRoutes = ["/assistants", "/management"];

function parseJwt(token: string) {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (e) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("_cm_sec")?.value;
  const { pathname } = request.nextUrl;

  // Si no hay token y es ruta protegida -> redirigir a login
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si hay token
  if (token) {
    try {
      const decoded = parseJwt(token);
      const userRole = decoded?.role;

      // Si está en rutas públicas, redirigir según rol
      if (publicRoutes.some((route) => pathname === route)) {
        const redirectUrl =
          userRole === "assistant" ? "/profile" : "/assistants";
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }

      // Verificar acceso según rol
      if (
        userRole === "assistant" &&
        adminRoutes.some((route) => pathname.startsWith(route))
      ) {
        return NextResponse.redirect(new URL("/profile", request.url));
      }

      // Si todo está bien, permitir el acceso
      return NextResponse.next();
    } catch (error) {
      // Si hay error con el token, limpiar y redirigir a login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("_cm_sec");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/assistants/:path*",
    "/profile/:path*",
    "/scanqr/:path*",
    "/search/:path*",
    "/alerts/:path*",
    "/management/:path*",
    "/login",
    "/"
  ]
};
