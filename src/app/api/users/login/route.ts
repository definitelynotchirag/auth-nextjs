import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }

        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }

        const tokendata = {
            id : user._id,
            email: user.email,
            username: user.username,

        }
        const token = jwt.sign(tokendata, process.env.TOKEN_SECRET!,{expiresIn:"1h"});
react
        const response = NextResponse.json({message:"Login successful",token},{status:200});

        response.cookies.set("token", token, {
            httpOnly: true,

        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }

}