import mongoose, { Schema } from "mongoose";
import {
  AvailableBloodTypes,
  AvailableDonationStatus,
} from "../utils/constants.js";

const bloodDonorSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    bloodType: {
      type: String,
      required: [true, "Blood type is required"],
      enum: AvailableBloodTypes,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    lastDonationDate: {
      type: Date,
    },
    medicalHistory: {
      type: String,
      trim: true,
    },
    isEligible: {
      type: Boolean,
      default: true,
    },
    donationStatus: {
      type: String,
      enum: AvailableDonationStatus,
      default: "pending",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const BloodDonor = mongoose.model("BloodDonor", bloodDonorSchema);

export default BloodDonor;
