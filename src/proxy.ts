// middleware
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";
import env from "./env";

const hasAppwriteConfig = Boolean(
  env.appwrite.endpoint &&
  env.appwrite.endpoint !== "undefined" &&
  env.appwrite.projectId &&
  env.appwrite.projectId !== "undefined",
);

export async function proxy(request: NextRequest) {
  if (!hasAppwriteConfig) {
    return NextResponse.next();
  }

  const initPromise = Promise.allSettled([
    getOrCreateDB(),
    getOrCreateStorage(),
  ]);
  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve("timeout"), 1500),
  );

  await Promise.race([initPromise, timeoutPromise]);
  return NextResponse.next();
}

export const config = {
  // middleware will run on every route except the ones in the regex
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
