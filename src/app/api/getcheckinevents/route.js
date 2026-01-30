import { NextResponse } from "next/server";
import { fetchObjectsByParam, fetchObjectsByParams, getUserWithSession } from "../db";

export async function POST(request) {
    const req = await request.json();
    
    try {
        if (!req.sessionid) {
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

        //const events = await fetchObjectsByParam('checkinaccounts', user._id, 'events');
        const events = await fetchObjectsByParams('events', {
            $or: [
                {checkinaccounts : user._id},
                {owner: user._id}
            ]
        })
        if(!events) {
            return NextResponse.json({
                success: false,
                rescode: 306,
                error: "Error While Getting associated Checkin Accounts"
            });
        }
        events.forEach(event => {
            delete event.checkinaccounts;
            if(event.owner.toString() == user._id.toString()) {
                event.owned = true;
            }
        })


        return NextResponse.json({
            success: true,
            rescode: 100,
            events: events
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            rescode: 202,
            error: "Something went wrong"
        })
    }
}