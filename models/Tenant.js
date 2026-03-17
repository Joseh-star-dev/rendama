import mongoose, { Types } from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: { type: String, required: true },

    unit: {
      type: Types.ObjectId,
      ref: "Unit",
    },

    property: {
      type: Types.ObjectId,
      ref: "Property",
    },

    moveInDate: Date,
  },
  { timestamps: true },
);

export const Tenant =
  mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);
