import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: Number,
      required: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    expriryAt: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    overwriteModels: true,
    validateBeforeSave: true,
  }
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
