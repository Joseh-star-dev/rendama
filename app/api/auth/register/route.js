// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { sendVerificationEmail } from "@/lib/mail";
import crypto from "crypto";
import bcrypt from "bcryptjs"; // ← ADD THIS

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { username, email, password, confirmPassword } = body;

    // Basic validation
    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!username?.trim()) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 },
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      // ← 6 is too weak in 2025
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 },
      );
    }

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }

    // Hash password (await!)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate secure token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user
    const user = await User.create({
      email: email.toLowerCase().trim(),
      username: username.trim(),
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiry: Date.now() + 60 * 60 * 1000, // 1 hour
      isVerified: false,
    });

    // Send verification email (should be fire-and-forget in production)
    // Consider moving to queue/resend if email fails
    sendVerificationEmail(email, verificationToken).catch((err) => {
      console.error("Email sending failed but user was created:", err);
      // Optionally: mark user as needing re-verification or notify admin
    });

    return NextResponse.json(
      {
        message:
          "Account created. Please check your email to verify your account.",
        // You could return userId or temporary token if you want to auto-login after verification
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    // In production: don't leak MongoDB validation / duplicate key errors to client
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
