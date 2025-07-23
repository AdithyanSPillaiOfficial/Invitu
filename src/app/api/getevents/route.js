import { NextResponse } from "next/server";
import { fetchObjectsByParam, getUserWithSession } from "../db";

export async function POST(request) {
    try {
        const req = await request.json();
        if (!req.sessionid) {
            return NextResponse.json({
                success: false,
                rescode: 0,
                error: "Invalid Request"
            })
        }

        const user = await getUserWithSession(req.sessionid);
        if (user) {
            const events = await fetchObjectsByParam("owner", user._id, "events");
            console.log(events);
            return NextResponse.json({
                success: true,
                rescode: 100,
                events: events
            })
        }
        else {
            return NextResponse.json({
                success: false,
                rescode: 301,
                error: "Invalid Session"
            })
        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            rescode: 202,
            error: "Something went wrong"
        })
    }
} 