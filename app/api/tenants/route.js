import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Property } from "@/models/Property";
import { Tenant } from "@/models/Tenant";
import { User } from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  try {
    const cookieStore = await cookies();
    const token = await cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication is required!" },
        { status: 401 },
      );
    }

    // use your verification token
    const decoded = verifyToken(token);
    const userId = decoded.id; //matches what you put in signToken

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const tenants = await Tenant.find({ owner: userId }).populate("property");

    if (tenants.length === 0) {
      return NextResponse.json({
        message: `Hi ${user.username}, you don't have any tenant yet!`,
        properties: [],
      });
    }

    return NextResponse.json(tenants, { status: 201 });
  } catch (err) {
    console.error("Tenants error", err.message);

    if (err.message === "Invalid or expired token") {
      return NextResponse.json(
        {
          error: "Session expired. Please log in again.",
        },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { error: "Server error.Please try again!" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const cookieStore = await cookies();
    const token = await cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication is required!" },
        { status: 401 },
      );
    }

    // use your verification token
    const decoded = verifyToken(token);
    const userId = decoded.id; //matches what you put in signToken

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const { name, phone, unitNumber, property, moveInDate } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Tenant name is required" },
        { status: 400 },
      );
    }

    if (!phone) {
      return NextResponse.json(
        { error: "Tenant phone number is required" },
        { status: 400 },
      );
    }

    if (!unitNumber) {
      return NextResponse.json(
        { error: "Unit number  is required" },
        { status: 400 },
      );
    }

    const tenant = await Tenant.create({
      owner: userId,
      name,
      phone,
      unitNumber: unitNumber,
      property: property.name,
      moveInDate,
    });

    console.log(tenant);

    return NextResponse.json(
      { success: true, message: "Tenant added" },
      tenant,
      { status: 201 },
    );
  } catch (err) {
    console.error("Error adding tenant", err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
