// middleware 
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

export async function proxy(request: NextRequest) {
    // creating the database or connecting to it if it is already made ever time we hit route that is not excluded same for storage
    await Promise.all(
    [getOrCreateDB(),
    getOrCreateStorage()
    ]
      )
    return NextResponse.next()
}

export const config = {
    // middleware  will run on every route except  one in the reg ex i.e {api,_next/static,_next/image,favicon.com}
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
