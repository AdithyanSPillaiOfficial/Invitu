import { ObjectId } from "mongodb";
import { fetchObjectsByParam, getUserWithSession, updateDocumentObjectwithId } from "../db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const req = await request.json();

    try {
        if (!(req.sessionid && req.event && req.eventid)) {
            return NextResponse.json({
                success: false,
                rescode: 0,
                error: "Invalid Request"
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

        const event = await fetchObjectsByParam("_id", new ObjectId(req.eventid), "events");
        if (event.length < 1) {
            return NextResponse.json({
                success: false,
                rescode: 305,
                error: "Unable to find the event"
            })
        }

        if (event[0].owner.toString() !== user._id.toString()) {
            console.log(event[0].owner);
            console.log(user._id);
            return NextResponse.json({
                success: false,
                rescode: 306,
                error: "You are not the owner of the event"
            })
        }

        const update = await updateDocumentObjectwithId("events", new ObjectId(req.eventid), req.event);
        if (update) {
            return NextResponse.json({
                success: true
            })
        }
        else {
            return NextResponse.json({
                success: false,
                rescode: 302,
                error: "Error While Modifying info"
            })
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            rescode: 202,
            error: "Something went wrong"
        })
    }
}