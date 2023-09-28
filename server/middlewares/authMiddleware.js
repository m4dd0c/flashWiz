import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsync } from "../utils/catchAsyncError.js";
export const authMiddleware = catchAsync((req, res, next) => {
  console.log('m1');
  const { token } = req.cookies;
  console.log('token', req.cookies);
  if (!token) return next(new ErrorHandler(401, "unauthorized user"));
  console.log('m2');
  const ideal = jwt.verify(token, process.env.JWT_SEC);
  console.log('m3');
  if (!ideal) return next(new ErrorHandler(401, "unauthorized user"));
  else {
    req.id = ideal.id;
    console.log('m4');
    next();
  }
});
