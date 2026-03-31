// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs"; // assuming you're using bcrypt

export async function POST(request) {
  await connectDB();

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    //check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email!" },
        { status: 401 },
      );
    }
    // Create safe payload (never include password or sensitive fields)
    const payload = {
      id: user._id.toString(),
      email: user.email,
      username: user.username, // optional
      role: user.role || "user", // optional
    };

    const token = signToken(payload);

    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        user: { id: user._id, email: user.email, username: user.username }, // optional safe user data
      },
      { status: 200 },
    );

    // Set the HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
