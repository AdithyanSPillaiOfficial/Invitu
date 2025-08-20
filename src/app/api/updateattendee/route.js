import { NextResponse } from 'next/server';
import { fetchObjectsByParams, getUserWithSession, updateDocumentwithId } from '../db';

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
    try {
        const req = await request.json();

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

        const update = await updateDocumentwithId("invites", req.attendee.inviteid, "attendee", req.attendee);
        if (!update) {
            return NextResponse.json({
                success: false,
                rescode: 303,
                error: "Error while updating invite"
            })
        }


        await connectToDatabase();
        req.attendee.inviteid = typeof req.attendee.inviteid === "string" ? new ObjectId(req.attendee.inviteid) : req.attendee.inviteid;
        const result = await db.collection("events").updateOne(
            { _id: new ObjectId(req.eventid), "attendees.inviteid": req.attendee.inviteid},
            { $set: { "attendees.$": req.attendee } }
        )
        console.log(req.attendee.inviteid, result);
        if (result.modifiedCount > 0) {
            return NextResponse.json({
                success: true,
                rescode: 100
            })
        }
        else {
            return NextResponse.json({
                success: false,
                rescode: 302,
                error: "Error While Modifying info"
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