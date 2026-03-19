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
      .collation({ locale: "en", strength: 2 })
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
        { error: "Authentication required!" },
        { status: 401 },
      );
    }

    // use your verification token
    const decoded = verifyToken(token);
    const userId = decoded.id; //matches what you put in signToken

    const { name, location, description, totalUnits } = await req.json();

    if (!name.trim()) {
      return NextResponse.json(
        { error: "Property name is required" },
        { status: 400 },
      );
    }

    if (!location.trim()) {
      return NextResponse.json(
        { error: "Property location is required" },
        { status: 400 },
      );
    }
    if (totalUnits < 1) {
      return NextResponse.json(
        { error: "Total units must be a positive integer" },
        { status: 400 },
      );
    }

    const owner = await User.findById(userId).select("_id name email"); //only what is needed

    if (!owner) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    //check if the property already exist
    const existing = await Property.findOne({
      owner: userId,
      name: name.trim(),
    }).collation({ locale: "en", strength: 2 });

    if (existing) {
      return NextResponse.json(
        { error: "Property name already exists (case-insensitive)" },
        { status: 409 },
      );
    }

    const property = await Property.create({
      owner: owner._id, //almost always better to store just the ID
      name: name.trim(),
      location: location.trim(),
      description: description?.trim() || "",
      totalUnits,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Property created successfully",
        property,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Property creation error", err.message);
    if (err.name === "MongoServerError" && err.code === 11000) {
      return NextResponse.json(
        { error: "You already have a property with this name." },
        { status: 409 }, //conflict
      );
    }

    //generic server error
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 },
    );
  }
}
