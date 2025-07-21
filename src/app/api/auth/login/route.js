import { NextResponse } from "next/server";
import { addObject, fetchObjectsByParam } from "../../db";
const bcrypt = require("bcrypt");

export async function POST(request) {
    const req = await request.json();
    try {
        const user = await fetchObjectsByParam("email", req.email, "users");

        if (bcrypt.compare(user[0].password, req.password)) {
            delete user[0].password
            user[0].id = user[0]._id
            delete user[0]._id
            const sessionId = await addObject(user[0], "sessions");
            if (sessionId) {
                return NextResponse.json({
                    success: true,
                    sessionid: sessionId,
                    user : user[0]
                })
            } else {
                return NextResponse.json({
                    success: false,
                    rescode: 310,
                    error: "Invalid Credentials"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                rescode: 310,
                error: "Invalid Credentials"
            })
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            rescode: 300,
            error: e
        })
    }
}