import { NextResponse } from "next/server";
import { fetchObjectsByParam, getDB, getUserWithSession } from "../db";
import { ObjectId } from "mongodb";

export async function POST(request) {
    const req = await request.json();;
    try {
        if (!req.sessionid || !req.newusermail || !req.eventid) {
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

        let newUser = await fetchObjectsByParam('email', req.newusermail, 'users');
        if (newUser.length < 1) {
            return NextResponse.json({
                success: false,
                rescode: 503,
                error: "An account associated with given mail doesnot exist"
            })
        }
        newUser = newUser[0];

        const db = await getDB();
        const result = await db.collection("events").updateOne(
            {
                _id: new ObjectId(req.eventid),
                $or: [
                    { owner: new ObjectId(user._id) },
                    { checkinaccounts: new ObjectId(user._id) }
                ]
            },
            {
                $addToSet: {
                    checkinaccounts: new ObjectId(newUser._id)
                }
            }
        );

        if(result.modifiedCount > 0) {
            return NextResponse.json({
                success: true,
                newuser: {
                    name : newUser.name,
                    email: newUser.email
                }
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