import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Property } from "@/models/Property";
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
        { error: "Authentication required!" },
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

    const properties = await Property.find({ owner: user._id })
      .sort({ createdAt: -1 })
      .lean();

    if (properties.length === 0) {
      return NextResponse.json({
        message: `Hi ${user.username}, you don't have any property yet!`,
        properties: [],
      });
    }
    return NextResponse.json(properties, { status: 201 });
  } catch (error) {
    console.error("Properties error", error.message);

    if (error.message === "Invalid or expired token") {
      return NextResponse.json(
        {
          error: "Session expired. Please log in again.",
        },
        { status: 401 },
      );
    }
    return NextResponse.json({ error: "Server error.Please try again!" });
  }
}

export async function POST(req) {
  await connectDB();

  try {
    const cookieStore = await cookies();
    const token = await cookieStore.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required!" },
        { status: 401 },
      );
    }

    // use your verification token
    const decoded = verifyToken(token);
    const userId = decoded.id; //matches what you put in signToken

    const { name, location, description, totalUnits } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Property name is required" },
        { status: 400 },
      );
    }

    if (!location) {
      return NextResponse.json(
        { error: "Property location is required" },
        { status: 400 },
      );
    }
    if (!totalUnits) {
      return NextResponse.json(
        { error: "Number of units is required" },
        { status: 400 },
      );
    }

    const owner = await User.findById(userId).select("-password");

    if (!owner) {
      return NextResponse.json({ error: "Account not found" }, { status: 401 });
    }

    //check if the property already exist
    const property = new Property({
      owner: owner,
      name,
      location,
      description,
      totalUnits,
    });

    await property.save();

    return NextResponse.json(
      { property, message: "Property created" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: "Server error!" });
  }
}
