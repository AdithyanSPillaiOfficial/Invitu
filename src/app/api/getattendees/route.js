import { NextResponse } from "next/server";
import { fetchObjectsByParam, getUserWithSession } from "../db";
import { ObjectId } from "mongodb";

export async function POST(request) {
    const req = await request.json();
    try {
        if (!req.sessionid || !req.eventid) {
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
        const events = await fetchObjectsByParam('_id', new ObjectId(req.eventid), 'events');
        if(events.length < 1) {
            return NextResponse.json({
                success: false,
                rescode: 303,
                error: "Invalid Event"
            })
        }
        const event = events[0];
        
        if(!event.owner.equals(user._id) && !event.checkinaccounts?.some(id => id.equals(user._id))) {
            return NextResponse.json({
                success: false,
                rescode: 506,
                error: "This Event is not Assiciated WIth Your Account"
            })
        }
        delete event.owner;
        delete event.checkinaccounts;
        return NextResponse.json({
            success: true,
            attendees: event.attendees
        })
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            rescode: 202,
            error: "Something went wrong"
        })
    }
}