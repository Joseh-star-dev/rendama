import mongoose, { Types } from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    property: { type: Types.ObjectId, ref: "Property", required: true },
    unitNumber: { type: Number, required: true, unique: true },
    rent: { type: Number, required: true },
    tenant: { type: Types.ObjectId, ref: "Tenant", default: null },
    status: { type: String, enum: ["vacant", "occupied", "maintenance"] },
    dueDay: {
      type: Number,
      default: 5, // rent due day of month
    },
  },
  { timestamps: true },
);

unitSchema.index({ property: 1, unitNumber: 1 }, { unique: true });
export const Unit = mongoose.models.Unit || mongoose.model("Unit", unitSchema);
