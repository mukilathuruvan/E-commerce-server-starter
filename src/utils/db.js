import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mukilathuruvan5241:Mukil_5241@cluster0.bqjj0vd.mongodb.net/"
    );
    console.log("connected to db.");
  } catch (err) {
    console.log(`while connecting db ${err.message}`);
  }
};

export default connectDatabase;
