import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Property } from "@/models/Property";
import { Unit } from "@/models/Unit";
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

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "Account not found!" },
        { status: 401 },
      );
    }

    const units = await Unit.find({ owner: user._id }).populate(
      "property owner",
    );
    if (!units || units.length === 0) {
      return NextResponse.json({
        message: "Your have not registered any property",
      });
    }

    return NextResponse.json(units);
  } catch (error) {
    console.error("Error getting units", error.message);
    return NextResponse.json({ error: "Server Error!" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const token = (await cookies()).get("auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required!" },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "Account not found!" },
        { status: 401 },
      );
    }

    const { property, unitNumber, rent, tenant, status, dueDay } =
      await req.json();

    if (!property) {
      return NextResponse.json(
        { error: "Property is required" },
        { status: 400 },
      );
    } else if (!unitNumber) {
      return NextResponse.json(
        { error: "Unit number is required" },
        { status: 400 },
      );
    } else if (rent === null) {
      return NextResponse.json(
        { error: "Rent amount is required" },
        { status: 400 },
      );
    } else if (!status) {
      return NextResponse.json(
        { error: "Unit status  is required" },
        { status: 400 },
      );
    } else if (!dueDay) {
      return NextResponse.json(
        { error: "Rent payment date  is required" },
        { status: 400 },
      );
    }

    const propertyExits = await Property.findOne({ name: property });
    if (!propertyExits) {
      return NextResponse.json(
        {
          error: "Property not found. Create the property first!",
        },
        { status: 400 },
      );
    }

    //check if the unit number already exists fot THIS property.
    const duplicateUnit = await Unit.findOne({
      property: propertyExits,
      unitNumber: unitNumber,
    });

    if (duplicateUnit) {
      return NextResponse.json(
        {
          error: `Unit ${unitNumber} already exists in ${propertyExits.name}`,
        },
        { status: 409 },
      );
    }

    const unit = await Unit.create({
      owner: userId,
      property: propertyExits,
      unitNumber,
      rent,
      tenant: tenant ? tenant._id : null,
      status,
      dueDay,
    });

    return NextResponse.json({ message: "Unit created successfully.", unit });
  } catch (error) {
    console.error("unit creation error: ", error.message);
    return NextResponse.json(
      { error: "Failed to create unit!. Try again" },
      { status: 500 },
    );
  }
}
