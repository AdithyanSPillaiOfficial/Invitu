import { deleteObjectWithQuery, fetchObjectsByParams, getUserWithSession } from "../db";
import { NextResponse } from "next/server";


const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();


// Connection URL and Database Name
const username = encodeURIComponent(process.env.DB_UNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@cluster0.kf2qhwd.mongodb.net/?retryWrites=true&w=majority`; // Update with your MongoDB URI if hosted remotely
const dbName = 'Invitu'; // Update with your desired database name
const collectionName = 'users'; // Update with your desired collection name

// Initialize MongoDB client
const client = new MongoClient(uri);

let db; // This will hold the connection to the database

// Helper function to connect to the database
const connectToDatabase = async () => {
    try {
        if (!db) {
            await client.connect();
            db = client.db(dbName);
            console.log('Connected to database successfully');
        }
    } catch (err) {
        console.error('Database connection failed:', err);
    }
};

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

        const deleteStatus = await deleteObjectWithQuery("invites", { _id: new ObjectId(req.inviteid) });

        await connectToDatabase()
        const updateStatus = await db.collection("events").updateOne(
            { _id: new ObjectId(req.eventid) },
            { $pull: { attendees: { inviteid: new ObjectId(req.inviteid) } } }
        )

        console.log(updateStatus)

        if(deleteStatus && updateStatus.modifiedCount > 0) {
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