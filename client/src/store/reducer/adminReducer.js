import { createSlice } from "@reduxjs/toolkit";

const adminReducer = createSlice({
  name: "admin",
  initialState: {
    users: null,
    loading: false,
    err: null,
    msg: null,
  },
  reducers: {
    req: (state) => {
      state.loading = true;
    },
    //change role , delete user
    res: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    err: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
    // all users
    getUsersRes: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    },
    clearMsg: (state) => {
      state.msg = null;
    },
    clearErr: (state) => {
      state.err = null;
    },
  },
});

export const { getUsersRes, req, res, err, clearErr, clearMsg } = adminReducer.actions;
export default adminReducer.reducer;
