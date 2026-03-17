// app/api/auth/reset-password/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import crypto from "crypto"; // optional — for extra token validation ideas

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { token, password, confirmPassword } = body;

    // 1. Better validation
    if (!token?.trim()) {
      return NextResponse.json(
        { error: "Reset token is required" },
        { status: 400 },
      );
    }

    if (!password || password.length < 8) {
      // ← Raise minimum (5 is too low in 2025/2026)
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

    // 2. Find user with valid token (important: both conditions in one query)
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    }).select("+password"); // usually not needed, but explicit

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" }, // ← same message for both cases (security: don't leak whether token exists)
        { status: 400 },
      );
    }

    // Optional: extra paranoia — check token format if you generate UUIDs/crypto tokens
    // if (!/^[0-9a-f]{32,}$/i.test(token)) { ... invalid ... }

    // 3. Update password (pre-save hook should hash it)
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    // 4. Optional: you could log this event or send confirmation email
    // await sendPasswordResetSuccessEmail(user.email);

    return NextResponse.json(
      {
        message:
          "Password reset successful. You can now log in with your new password.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Password reset error:", error);
    // Never expose internal error details to client
    return NextResponse.json(
      { error: "Failed to reset password. Please try again later." },
      { status: 500 },
    );
  }
}
