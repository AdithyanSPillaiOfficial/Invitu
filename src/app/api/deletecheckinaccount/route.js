import { NextResponse } from "next/server";
import { fetchObjectsByParam, getDB, getUserWithSession } from "../db";
import { ObjectId } from "mongodb";

export async function POST(request) {
    const req = await request.json();;
    try {
        if (!req.sessionid || !req.deleteusermail || !req.eventid) {
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

        let delUser = await fetchObjectsByParam('email', req.deleteusermail, 'users');
        if (delUser.length < 1) {
            return NextResponse.json({
                success: false,
                rescode: 503,
                error: "An account associated with given mail doesnot exist"
            })
        }
        delUser = delUser[0];

        const db = await getDB();
        const result = await db.collection("events").updateOne(
            { _id: new ObjectId(req.eventid) },
            {
                $pull: {
                    checkinaccounts: new ObjectId(delUser._id)
                }
            }
        );

        if (result.modifiedCount > 0) {
            return NextResponse.json({
                success: true,
            })
        }
        else {
            return NextResponse.json({
                success: false,
                rescode: 5.3,
                error: "The event is not associated with your account"
            })
        }



    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            rescode: 202,
            error: "Something went wrong"
        })
    }
}