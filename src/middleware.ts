import { NextRequest, NextResponse } from "next/server";
import { analytics } from "./utils/analytics";

export default async function middleware(req: NextRequest) {
    if(req.nextUrl.pathname === "/") {
        console.error("Redirecting to /home");
        try{
            analytics.track("pageview", {
                page: "/",
                countrry: req.geo?.country,
            });
        } catch (e) {
            console.error(e);
        }
    }

    return NextResponse.next();
}

export const matcher = {
    matcher: ['/']
}