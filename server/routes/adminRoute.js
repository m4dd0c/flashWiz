import express from "express";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  changeRole,
  deleteUser,
  fetchUsers,
} from "../controllers/adminController.js";
const router = express.Router();

router
  .route("/action/:uid")
  .get(authMiddleware, adminMiddleware, changeRole)
  .delete(authMiddleware, adminMiddleware, deleteUser);

router.route("/users").get(authMiddleware, adminMiddleware, fetchUsers);

export default router;
