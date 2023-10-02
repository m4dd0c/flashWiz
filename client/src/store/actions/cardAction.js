import { err, fetchCardsRes, req, res } from "../reducer/cardReducer";
import { instance } from "../constants/constants";
// fetch cards
export const fetchCards = () => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.get("/card/");
    dispatch(fetchCardsRes(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// create Card
export const createCard = (question, answer, subject) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.post("/card/action", {
      question,
      answer,
      subject,
    });
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// delete card
export const deleteCard = (card_id, qa_id) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.delete("/card/action", {
      params: {
        card_id,
        qa_id,
      },
    });
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// update qa score
export const updateQAScore = (score, card_id, qa_id) => async (dispatch) => {
  try {
    console.log(score);
    dispatch(req());
    const { data } = await instance.put(
      "/card/action",
      { score },
      {
        params: {
          card_id,
          qa_id,
        },
      }
    );
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// update score
export const updateScore = (id) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.get(`/card/action/${id}`);
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// delete subject
export const deleteSubject = (id) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.delete(`/card/action/${id}`);
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
