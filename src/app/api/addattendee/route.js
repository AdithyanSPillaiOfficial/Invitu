import { NextResponse } from "next/server";
import { addObject, fetchObjectsByParams, getUserWithSession, updateDocumentObjectwithId, updateDocumentwithId } from "../db";
import { ObjectId } from "mongodb";

export async function POST(request) {
    const req = await request.json();

    try {
        if (!(req.sessionid && req.eventid && req.attendee)) {
            console.log("Invalid Request : ", req)
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
        if (!(event && event.length == 1)) {
            return NextResponse.json({
                success: false,
                rescode: 201,
                error: "No Such event registered in your account"
            })
        }

        const {attendees, ...modEvent} = event; 
        const addedInvite = await addObject({eventid : req.eventid, attendee : req.attendee, event : modEvent}, "invites");
        if(!addedInvite) {
            return NextResponse.json({
                success : false,
                rescode : 204,
                error : "Error occured while adding invite"
            })
        }

        // const updatedEvent = await updateDocumentwithId("events", req.eventid, "attendees", [...event[0].attendees, req.attendee] );
        req.attendee.inviteid = addedInvite;
        const updatedEvent = await updateDocumentwithId(
            "events",
            req.eventid,
            "attendees",
            [...(event[0]?.attendees || []), req.attendee]
        );

        // const updatedEvent = await updateDocumentObjectwithId(
        //     "events",
        //     req.eventid,
        //     {attendees : [...(event[0]?.attendees || []), req.attendee], inviteid : addedInvite}
        // );


        if (updatedEvent) {
            return NextResponse.json({
                success: true,
                rescode: 100,
                event: event[0],
                inviteid : addedInvite
            })
        }
        else {
            return NextResponse.json({
                success: false,
                rescode: 203,
                error: "Error occured while updating the event"
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            rescode: 202,
            error: "Something went wrong"
        })
    }
}