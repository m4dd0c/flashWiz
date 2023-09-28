import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "FlashWiz" });
    console.log("Connection with DB successful");
  } catch (error) {
    console.log("Connection with DB failed");
  }
};
