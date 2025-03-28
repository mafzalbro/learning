import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(request: NextRequest) {
  const session = await auth();

  if (
    !session?.user?.name &&
    request.nextUrl.pathname !== "/" &&
    request.nextUrl.pathname !== "/api/auth/signin"
  ) {
    return NextResponse.redirect(
      new URL("/?error_alert=unauthorized", request.url)
    );
  } else {
    return NextResponse.next();
  }
}

// export const config = {
//   matcher: "/:path*",
// };

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|woff2?|eot|ttf|otf|ttc|json|xml|txt)$).*)",
  ],
};
