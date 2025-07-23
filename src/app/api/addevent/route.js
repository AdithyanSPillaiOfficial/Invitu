import { NextResponse } from "next/server";
import { addObject, getUserWithSession } from "../db";

export async function POST(request) {
    try {
        const req = await request.json();


        if(!(req.sessionid && req.event)) {
            return NextResponse.json({
                success : false,
                rescode : 0,
                error : "Invalid Request"
            })
        }

        const user = await getUserWithSession(req.sessionid);
        console.log(user);
        if (!user) {
            return NextResponse.json({
                success: false,
                rescode: 301,
                error: "Invalid Session"
            })
        }

        const eventId = await addObject({...req.event, owner : user._id}, "events");
        if (eventId) {
            return NextResponse.json({
                success: true,
                rescode: 100,
                eventid: eventId
            })
        }
        else {
            return NextResponse.json({
                success: false,
                rescode: 201,
                error: "Error while creating the event"
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