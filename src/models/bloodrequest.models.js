import mongoose, { Schema } from "mongoose";
import {
  AvailableBloodTypes,
  AvailableBloodRequestStatus,
} from "../utils/constants.js";

const bloodRequestSchema = new Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    bloodType: {
      type: String,
      required: [true, "Blood type is required"],
      enum: AvailableBloodTypes,
    },
    unitsNeeded: {
      type: Number,
      required: [true, "Number of units needed is required"],
      min: [1, "At least 1 unit is required"],
    },
    urgency: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    hospital: {
      type: String,
      required: [true, "Hospital name is required"],
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    requiredBy: {
      type: Date,
      required: [true, "Required by date is required"],
    },
    status: {
      type: String,
      enum: AvailableBloodRequestStatus,
      default: "pending",
    },
    reason: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fulfilledBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fulfilledDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Index for efficient queries
bloodRequestSchema.index({ status: 1, urgency: 1 });
bloodRequestSchema.index({ bloodType: 1, status: 1 });

const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);

export default BloodRequest;
