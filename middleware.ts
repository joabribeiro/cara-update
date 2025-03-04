import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { TOKEN_KEY } from "./lib/token";
import { decryptKey } from "./lib/utils";

export function middleware(request: NextRequest) {
  const encryptedKey = request.cookies.get(TOKEN_KEY)?.value;

  if (!encryptedKey) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const accessKey = decryptKey(encryptedKey);
    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      return NextResponse.next();
    }
  } catch (error) {
    console.log(error);
  }

  const netxResponse = NextResponse.redirect(new URL("/", request.url));

  netxResponse.cookies.delete(TOKEN_KEY);

  return netxResponse;
}

export const config = {
  matcher: "/admin",
};
