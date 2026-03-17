import mongoose, { model, Mongoose, Types } from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: { type: String, required: true },
    description: { type: String },
    totalUnits: { type: Number, required: true },
  },
  { timestamps: true },
);

//unique compound index
propertySchema.index({ owner: 1, name: 1 }, { unique: true });
export const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);
