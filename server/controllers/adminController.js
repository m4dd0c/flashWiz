import { Auth } from "../Models/Auth.js";
import { Card } from "../Models/Card.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsync } from "../utils/catchAsyncError.js";

// getusers endpoint controller
export const fetchUsers = catchAsync(async (req, res, next) => {
  const uid = req.id;
  if (!uid)
    return next(new ErrorHandler(401, "Access Denied, Only Admin can access"));
  const user = await Auth.findOne({ _id: uid, role: "admin" });
  if (!user)
    return next(new ErrorHandler(401, "Access Denied, Only Admin can access"));

  // get all users
  const users = await Auth.find({});
  res.status(200).json({ success: true, users });
});
// delete user
export const deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.uid;
  const uid = req.id;
  if (!uid)
    return next(new ErrorHandler(401, "Access Denied, Only Admin can access"));
  const user = await Auth.findOne({ _id: uid, role: "admin" });
  if (!user)
    return next(new ErrorHandler(401, "Access Denied, Only Admin can access"));

  // delete user
  const task = await Auth.findByIdAndDelete(userId);
  if (!task)
    return next(
      new ErrorHandler(
        401,
        "Some Error Occured. Can't Delete User at this Moment!"
      )
    );
  //delete all cards
  const cards = await Card.find({ userId: userId });
  cards.forEach((card) => card.deleteOne());
  res.status(200).json({ success: true, msg: "user deleted!" });
});
// change role
export const changeRole = catchAsync(async (req, res, next) => {
  const clientId = req.params.uid;
  const uid = req.id;
  if (!uid)
    return next(new ErrorHandler(401, "Access Denied, Only Admin can access"));
  const user = await Auth.findOne({ _id: uid, role: "admin" });
  if (!user)
    return next(new ErrorHandler(401, "Access Denied, Only Admin can access"));

  const client = await Auth.findById(clientId);
  if (!client) return next(new ErrorHandler(404, "user not found!"));
  const newRole = client.role === "admin" ? "user" : "admin";
  // changing role user
  client.role = newRole;
  await client.save();
  res.status(200).json({ success: true, msg: "user role updated!" });
});
