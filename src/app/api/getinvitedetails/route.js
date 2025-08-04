import { NextResponse } from "next/server";
import { fetchObjectsByParam } from "../db";
import { ObjectId } from "mongodb";

export async function POST(request) {
    try {
        const req = await request.json();
        const invite = await fetchObjectsByParam("_id", new ObjectId(req.inviteid), "invites");
        if(!invite) {
            return NextResponse.json({
                success : false,
                error : "Invalid invite"
            })
        }

        const event = await fetchObjectsByParam("_id", new ObjectId(invite[0].eventid), "events");
        if(!event) {
            return NextResponse.json({
                success : false,
                error : "Invalid Event"
            })
        }
        
        invite[0].event = event[0]
        console.log(invite[0].event)

        return NextResponse.json({
            success : true,
            invite : invite[0]
        })
    } catch (error) {
        return NextResponse.json({
            success : false,
            error : "Something went wrong"
        })
    }
}