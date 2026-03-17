import mongoose, { Types } from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    tenant: {
      type: Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    property: {
      type: Types.ObjectId,
      ref: "Property",
    },

    unit: {
      type: Types.ObjectId,
      ref: "Unit",
    },

    amount: Number,

    month: String, // e.g. "2026-03"

    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },

    method: {
      type: String,
      enum: ["cash", "mpesa", "bank"],
    },
  },
  { timestamps: true },
);

export const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
