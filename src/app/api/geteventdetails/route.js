import { ObjectId } from "mongodb";
import { fetchObjectsByParams, getUserWithSession } from "../db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const req = await request.json();

    try {

        if (!(req.sessionid && req.eventid)) {
            return NextResponse.json({
                success: false,
                rescode: 0,
                error: "Invalid Request"
            })
        }

        const user = await getUserWithSession(req.sessionid);

        if (!user) {
            return NextResponse.json({
                success: false,
                rescode: 301,
                error: "Invalid Session"
            })
        }

        const event = await fetchObjectsByParams("events", { _id: new ObjectId(req.eventid), owner: user._id });
        if (event && event.length == 1) {
            return NextResponse.json({
                success: true,
                rescode: 100,
                event: event[0]
            })
        }
        else {
            return NextResponse.json({
                success: false,
                rescode: 201,
                error: "No Such event registered in your account"
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