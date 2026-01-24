import { NextResponse } from "next/server";
import { addObject, fetchObjectsByParam } from "../../db";
const bcrypt = require("bcrypt");
export async function POST(request) {
    const req = await request.json();
    try {
        const hashedPassword = await bcrypt.hash(req.password, 10);

        const newUser = {
            name: req.name,
            username: req.username,
            email: req.email,
            password: hashedPassword
        };

        const users = await fetchObjectsByParam("username", req.username, "users");
        if(users.length > 0) {
            return NextResponse.json({
                success : false,
                rescode : 203,
                error : "Username already exists"
            })
        }
        const userId = await addObject(newUser, "users");
        console.log("Userid : ", userId)
        if(userId?.ecode && userId?.ecode === 11000) {
            return NextResponse.json({
            success : false,
            error : "An Account with same username or email already exist"
        })
        }
        else if (userId){
            return NextResponse.json({
                success : true,
                userId : userId
            })
        }
        else return NextResponse.json({
            success : false,
            error : "Unknown error occurred"
        })
    
    } catch(e) {
        console.error(e);
        return NextResponse.json({
            success : false,
            error : e.message || "Something went wrong"
        })
    }
}