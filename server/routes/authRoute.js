import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  changePassword,
  contact,
  deleteProfile,
  editProfile,
  forgetPassword,
  loadUser,
  login,
  logout,
  resetPassword,
  signup,
  verify,
} from "../controllers/authController.js";
const router = express.Router();

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/register").post(signup);
router
  .route("/me")
  .get(authMiddleware, loadUser)
  .post(authMiddleware, verify)
  .put(authMiddleware, editProfile)
  .delete(deleteProfile);
router.route("/password/change").put(authMiddleware, changePassword);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset").put(resetPassword);
router.route("/contact").post(contact);
export default router;
