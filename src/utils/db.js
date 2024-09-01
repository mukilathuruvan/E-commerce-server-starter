import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected to db.");
  } catch (err) {
    console.log(`while connecting db ${err.message}`);
  }
};

export default connectDatabase;
