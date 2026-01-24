import { deleteObjectWithQuery, fetchObjectsByParams, getUserWithSession, pullFromDocumentArray } from "../db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request) {
    const req = await request.json();
    try {
        if (!(req.sessionid && req.eventid && req.inviteid)) {
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
        //console.log("Event",event);
        if (!(event && event.length == 1 && event[0].owner.toString() === user._id.toString())) {
            return NextResponse.json({
                success: false,
                rescode: 201,
                error: "No Such event registered in your account"
            })
        }

        const invite = await fetchObjectsByParams("invites", { _id: new ObjectId(req.inviteid) });
        if (invite.length === 0) {
            return NextResponse.json({
                success: false,
                rescode: 303,
                error: "Invite not found"
            })
        }

        if (invite[0].eventid !== req.eventid) {
            return NextResponse.json({
                success: false,
                rescode: 304,
                error: "Invite does not belong to this event"
            })
        }

        const deleteStatus = await deleteObjectWithQuery("invites", { _id: new ObjectId(req.inviteid) });

        const updateStatus = await pullFromDocumentArray(
            "events",
            new ObjectId(req.eventid),
            "attendees",
            { inviteid: new ObjectId(req.inviteid) }
        );

        if(deleteStatus && updateStatus) {
            return NextResponse.json({
                success : true,
                rescode : 100
            })
        }

        else {
            return NextResponse.json({
                success: false,
                rescode : 302,
                error : "Error while deleting the invite"
            });
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