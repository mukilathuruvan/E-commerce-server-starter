import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/server-starter");
    console.log("connected to db.");
  } catch (err) {
    console.log(`while connecting db ${err.message}`);
  }
};

export default connectDatabase;
