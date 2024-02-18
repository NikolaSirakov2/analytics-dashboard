import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
    if(req.nextUrl.pathname === "/") {
        console.error("Redirecting to /home");
    }
}