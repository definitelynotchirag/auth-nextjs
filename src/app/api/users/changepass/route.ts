import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getgid } from "process";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user } = reqBody;
    console.log(user.token);

    console.log("hereeee")

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(user.confirmpassword, salt);

    
    const userr = await User.findOne({forgotPasswordToken: user.token, forgotPasswordTokenExpiry: {$gt: Date.now()}});


  

    if (!userr) {
      return NextResponse.json({error: "Invalid token"}, {status: 400})
  }

    console.log(userr);

    userr.password = hashedPassword;
    await userr.save();

    return NextResponse.json(
      { message: "Updated Successfully" },
      { status: 201 }
    );
    

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}

