import { error } from "console";
import { NextResponse } from "next/server";
import { fetchObjectsByParam } from "../db";
import { ObjectId } from "mongodb";

async function getEventDetails(eventId) {
    console.log(eventId);
    const eventList = await fetchObjectsByParam("_id", new ObjectId(String(eventId)), "events");
    const event = eventList[0];
    delete event.attendees;
    delete event.owner;
    delete event.checkinaccounts;
    delete event._id
    return event;

}

export async function POST(request) {
    try {
        const req = await request.json();
        const searchText = req.searchtext;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;

        if (emailRegex.test(searchText)) {
            let invites = await fetchObjectsByParam("attendee.email", searchText, "invites");
            if (invites && invites.length > 0) {
                invites = await Promise.all(invites.map(async ({ _id, eventid, ...rest }) => ({ ...rest, id: _id, eventid, event: await getEventDetails(eventid) })));
                return NextResponse.json({
                    success: true,
                    invites: invites
                })
            }
            return NextResponse.json({
                success: false,
                error: "No Invites found"
            })
        }
        else if (phoneRegex.test(searchText)) {
            let invites = await fetchObjectsByParam("attendee.phone", searchText, "invites");
            if (invites && invites.length > 0) {
                invites = invites.map(({ _id, ...rest }) => ({ ...rest, id: _id }));
                return NextResponse.json({
                    success: true,
                    invites: invites
                })
            }
            return NextResponse.json({
                success: false,
                error: "No Invites found"
            })
        }
        else {
            return NextResponse.json({
                success: false,
                error: "Invalid Value",
                rescode: 604
            })
        }


    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "Something Went Wrong",
            rescode: 603
        })
    }
}