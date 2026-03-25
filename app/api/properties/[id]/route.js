import { getAuthenticatedUser } from "@/lib/auth-helper";
import { connectDB } from "@/lib/db";
import { Property } from "@/models/Property";
import { Unit } from "@/models/Unit";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();

  const { user, error, status } = await getAuthenticatedUser();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const { id } = await params;
    console.log("User Id", user._id);
    // console.log("property id", id);

    const propertyId = await Property.findOne({ owner: user._id, _id: id });
    if (!propertyId) {
      return NextResponse.json(
        { error: `Property ${id} not found` },
        { status: 401 },
      );
    }

    const registeredUnits = await Unit.find({ property: propertyId });

    if (!registeredUnits) {
      return NextResponse.json({ error: "No units found!" }, { status: 401 });
    } else {
      console.log("total units :", registeredUnits);
    }

    return NextResponse.json(
      { message: "Data retrieved successfully", registeredUnits },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error getting property details", error.message);
    return NextResponse.json({ error: "Something Happened!" });
  }
}
