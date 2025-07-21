import { NextResponse } from "next/server";
import { addObject, fetchObjectsByParam } from "../../db";
const bcrypt = require("bcrypt");
export async function POST(request) {
    const req = await request.json();
    try {
        req.password = await bcrypt.hash(req.password, 10)
        const users = await fetchObjectsByParam("username", req.username, "users");
        if(users.length > 0) {
            return NextResponse.json({
                sucess : false,
                rescode : 203,
                error : "Username already exists"
            })
        }
        const userId = await addObject(req, "users")
        return NextResponse.json({
            sucess : true,
            userId : userId
        })
    } catch(e) {
        console.error(e);
        return NextResponse.json({
            sucess : false,
            error : e
        })
    }
}