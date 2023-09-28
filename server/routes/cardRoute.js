import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createCard,
  deleteCard,
  deleteSubject,
  updateScore,
  fetchCards,
  updateQAScore
} from "../controllers/cardController.js";
const router = express.Router();

router.route("/").get(authMiddleware, fetchCards);
router
  .route("/action")
  .put(authMiddleware, updateQAScore)
  .post(authMiddleware, createCard)
  .delete(authMiddleware, deleteCard);

router
  .route("/action/:id")
  .delete(authMiddleware, deleteSubject)
  .get(authMiddleware, updateScore);
router.route("/score");
export default router;
