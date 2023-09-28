import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must contain atleast 3 character"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please Provide a valid Email"],
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, "Password must contain atleast 6 character"],
  },
  verificationOTP: {
    type: String,
    default: undefined,
  },
  verificationOTPExpire: Date,
  verification: {
    default: false,
    type: Boolean,
  },
  resetOTP: String,
  resetOTPExpire: Date,
  role: {
    type: String,
    default: "user",
    required: true,
  },
  avatar: {
    url: String,
    public_id: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

authSchema.method("genToken", function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SEC, {
    expiresIn: `${process.env.TOKEN_EXP}d`,
  });
});

authSchema.method("comparePass", async function (password) {
  return await bcrypt.compare(password, this.password);
});

authSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(15));
  } else {
    next();
  }
});

authSchema.index({ verificationOTPExpire: 1 }, { expireAfterSeconds: 0 });

export const Auth = mongoose.model("Auth", authSchema);
