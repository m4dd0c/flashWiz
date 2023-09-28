import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsync } from "../utils/catchAsyncError.js";
export const authMiddleware = catchAsync((req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler(401, "unauthorized user"));
  const ideal = jwt.verify(token, process.env.JWT_SEC);
  if (!ideal) return next(new ErrorHandler(401, "unauthorized user"));
  else {
    req.id = ideal.id;
    next();
  }
});
