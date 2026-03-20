import mongoose, { Types } from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    unitNumber: { type: String, required: true, unique: true },
    rent: { type: Number, required: true },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      default: null,
    },
    status: { type: String, enum: ["vacant", "occupied", "maintenance"] },
    dueDay: {
      type: Date,
      default: 5, // rent due day of month
    },
  },
  { timestamps: true },
);

unitSchema.index({ property: 1, unitNumber: 1 }, { unique: true });
export const Unit = mongoose.models.Unit || mongoose.model("Unit", unitSchema);
