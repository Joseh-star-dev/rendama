// app/api/auth/resend-verification/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { sendVerificationEmail } from "@/lib/mail";
import crypto from "crypto";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // We don't want to leak whether email exists → same message
      return NextResponse.json(
        {
          message:
            "If the email exists, a new verification link has been sent.",
        },
        { status: 200 },
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: "Your email is already verified." },
        { status: 400 },
      );
    }

    // Generate fresh token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: "A new verification link has been sent to your email." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
