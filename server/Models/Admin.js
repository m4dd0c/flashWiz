import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  totalusers: {},
});

export const Admin = mongoose.model("Admin", adminSchema);
