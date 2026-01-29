import { NextResponse } from "next/server";
import { getDB, getUserWithSession } from "../db";
import { ObjectId } from "mongodb";

export async function POST(request) {
    const req = await request.json();
    const db = await getDB();

    try {
        if (!req.sessionid || !req.inviteid) {
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
        const result = await db.collection("events").updateOne(
            { 
                "attendees.inviteid": new ObjectId(req.inviteid),
                "_id": new ObjectId(req.eventid),
                $or: [
                    {"owner" : new ObjectId(user._id)},
                    {"checkinaccounts": new ObjectId(user._id)}
                ]
            },   // find doc + array element
            {
                $set: {
                    "attendees.$.status": "Checked In"
                }
            }
        );

        if(result.modifiedCount > 0) {
            return NextResponse.json({
                success: true,
            })
        }
        else {
            return NextResponse.json({
                success: false,
                rescode: 305,
                error: "Invalid event ID or You cannot checkin this user"
            })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            rescode: 202,
            error: "Something went wrong"
        })
    }

}