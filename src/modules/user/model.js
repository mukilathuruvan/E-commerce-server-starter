import mongoose from "mongoose";

export const USER_SOURCE_ENUM = {
  google: "google",
  mobile: "mobile",
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      trim: true,
      required: true,
      validate: (value) => !!USER_SOURCE_ENUM[value],
    },
    email: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

const User = mongoose.model("User", userSchema);

export default User;
