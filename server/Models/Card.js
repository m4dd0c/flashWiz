import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  userId: {
    ref: "Auth",
    type: mongoose.Schema.ObjectId,
  },
  subject: String,
  last_score: {
    type: Number,
    default: 0,
  },
  qa: [
    { question: String, answer: String, score: { type: Number, default: 0 } },
  ],
});
export const Card = mongoose.model("Card", cardSchema);
