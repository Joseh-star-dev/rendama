import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.delete("auth-token", { path: "/" });
  // response.cookies.delete("refresh-token", { path: "/" });

  return response;
}
