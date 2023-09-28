import { createSlice } from "@reduxjs/toolkit";

const cardReducer = createSlice({
  name: "cards",
  initialState: {
    cards: null,
    loading: false,
    msg: null,
    err: null,
  },
  reducers: {
    req: (state) => {
      state.loading = true;
    },
    // for change,forget,reset pass, editprofile, verify acc
    res: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    err: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
    // get profile
    fetchCardsRes: (state, action) => {
      state.loading = false;
      state.cards = action.payload.cards;
    },
    clearMsg: (state) => {
      state.msg = null;
    },
    clearErr: (state) => {
      state.err = null;
    },
  },
});
export const { req, res, clearErr, clearMsg, err, fetchCardsRes } =
  cardReducer.actions;
export default cardReducer.reducer;
