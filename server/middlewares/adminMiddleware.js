import { ErrorHandler } from "../utils/ErrorHandler.js";
import { Auth } from "../Models/Auth.js";
import { catchAsync } from "../utils/catchAsyncError.js";
export const adminMiddleware = catchAsync(async (req, res, next) => {
  const id = req.id;
  if (!id) return next(new ErrorHandler(401, "unauthorized user"));
  const user = await Auth.findById(id);
  const role = user.role;
  if (role === "user") return next(new ErrorHandler(401, "access denied"));
  else next();
});
