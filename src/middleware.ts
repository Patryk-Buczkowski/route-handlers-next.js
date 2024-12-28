import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const themePreference = request.cookies.get("theme");

  if (!themePreference) {
    response.cookies.set("theme", "dar");
  }

  response.headers.set('defHeader', 'defValue')
  // if (request.nextUrl.pathname === "/profile") {
  //     return NextResponse.redirect(new URL("/hello", request.url));
  // }
  //   return NextResponse.redirect(new URL("/", request.url));

  return response;
}

// export const config = {
//   matcher: "/profile",
// };
