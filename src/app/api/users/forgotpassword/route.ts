import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({email});

    if(!user){
        return NextResponse.json(
            {error: "User Does Not Exist!"},
            {status : 400}
        )
    }


    console.log(reqBody);
    await sendEmail({email, emailType: "RESET", userId: user._id});
    
    return NextResponse.json({
      message: "Email Sent",
      success: true
  })


  } catch (error: any) {
    return NextResponse.json({error:error.message},{status:500})

  }
}
