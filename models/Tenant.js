import mongoose, { Types } from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
    unitNumber: { type: String, required: true },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    moveInDate: Date,
    rentStatus: { type: String, enum: ["paid", "pending"], default: "pending" },
    rentAmount: Number,
    rentDueDate: Date,
    lastNotified: Date,
  },

  { timestamps: true },
);

export const Tenant =
  mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);
