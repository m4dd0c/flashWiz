import { Auth } from "../Models/Auth.js";
import { Card } from "../Models/Card.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsync } from "../utils/catchAsyncError.js";

export const createCard = catchAsync(async (req, res, next) => {
  const { question, answer, subject } = req.body;
  if (!question || !answer || !subject) {
    return next(new ErrorHandler(404, "All Fields are Required!"));
  }
  const uid = req.id;
  if (!uid) return next(new ErrorHandler(401, "unauthorized user"));
  const user = await Auth.findById(uid);
  if (!user) return next(new ErrorHandler(401, "unauthorized user"));

  //finding required card with given subject
  let card = await Card.findOne({ userId: uid, subject });
  //if card already present
  if (!card) {
    card = await Card.create({
      userId: uid,
      subject,
      card: {
        qa: [],
      },
    });
  }
  card.qa.unshift({ question, answer });
  await card.save();
  res.status(201).json({ success: true, msg: "Card Created!" });
});

export const deleteCard = catchAsync(async (req, res, next) => {
  const { card_id, qa_id } = req.query;
  if (!card_id || !qa_id)
    return next(new ErrorHandler(404, "Card Not Found with this Subject!"));
  const uid = req.id;
  if (!uid) return next(new ErrorHandler(401, "unauthorized user"));
  const user = await Auth.findById(uid);
  if (!user) return next(new ErrorHandler(401, "unauthorized user"));

  const card = await Card.findOne({ userId: uid, _id: card_id });
  if (!card) return next(new ErrorHandler(401, "Access Denied!"));
  const reducedArray = card.qa.filter(
    (qaItem) => qaItem._id.toString() !== qa_id
  );
  card.qa = reducedArray;
  await card.save();
  res.status(200).json({ success: true, msg: "Card Deleted!" });
});

export const deleteSubject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler(404, "Card Already Deleted!"));
  const uid = req.id;
  if (!uid) return next(new ErrorHandler(401, "unauthorized user"));
  const user = await Auth.findById(uid);
  if (!user) return next(new ErrorHandler(401, "unauthorized user"));
  const card = await Card.findOne({ _id: id, userId: uid });
  if (!card) return next(new ErrorHandler(404, "Subject Not Found!"));
  card.deleteOne();
  res.status(200).json({ success: true, msg: "Subject Deleted!" });
});

export const updateScore = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler(404, "Invalid card_id!"));

  const uid = req.id;
  if (!uid) return next(new ErrorHandler(401, "unauthorized user"));
  const user = await Auth.findById(uid);
  if (!user) return next(new ErrorHandler(401, "unauthorized user"));

  const card = await Card.findOne({ _id: id, userId: uid });
  if (!card) return next(new ErrorHandler(404, "Card Not Found!"));
  const len = card.qa.length;
  let score = 0;
  for (let i = 0; i < len; i++) {
    score += Number(card.qa[i].score);
  }
  card.last_score = score;
  await card.save();
  res.status(200).json({ success: true, msg: "New Score Updated!" });
});

export const fetchCards = catchAsync(async (req, res, next) => {
  const uid = req.id;
  if (!uid) return next(new ErrorHandler(401, "unauthorized user"));
  const user = await Auth.findById(uid);
  if (!user) return next(new ErrorHandler(401, "unauthorized user"));
  const cards = await Card.find({ userId: uid });
  if (!cards) return next(new ErrorHandler(404, "No Card Found Yet!"));
  return res.status(200).json({ success: true, cards });
});
export const updateQAScore = catchAsync(async (req, res, next) => {
  const { score } = req.body;

  if (score === null || score === undefined)
    return next(new ErrorHandler(404, "Invalid Score"));

  const { card_id, qa_id } = req.query;
  if (!card_id || !qa_id)
    return next(new ErrorHandler(404, "Card Not Found with this Subject!"));
  const uid = req.id;
  if (!uid) return next(new ErrorHandler(401, "unauthorized user"));
  const user = await Auth.findById(uid);
  if (!user) return next(new ErrorHandler(401, "unauthorized user"));

  const card = await Card.findOne({ userId: uid, _id: card_id });
  if (!card) return next(new ErrorHandler(401, "Access Denied!"));

  for (let i = 0; i < card.qa.length; i++) {
    if (card.qa[i]._id.toString() === qa_id) {
      card.qa[i].score = Number(score);
      break;
    }
  }
  await card.save();
  res.status(200).json({ success: true, msg: "Card QA Updated!" });
});
