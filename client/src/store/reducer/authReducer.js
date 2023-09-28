import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    isAuth: false,
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
    // for login and signup
    authRes: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuth = true;
      state.msg = action.payload.msg;
    },
    authRej: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuth = false;
      state.err = action.payload;
    },
    // for signout
    logoutRes: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuth = false;
      state.msg = action.payload.msg;
    },
    // get profile
    fetchUserRes: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    clearMsg: (state) => {
      state.msg = null;
    },
    clearErr: (state) => {
      state.err = null;
    },
  },
});
export const { authRej, authRes, clearErr, clearMsg,  fetchUserRes, logoutRes, res, req, err } =
  authReducer.actions;
export default authReducer.reducer;
