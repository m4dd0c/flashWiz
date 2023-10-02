import { instance } from "../constants/constants";
import {
  err,
  req,
  res,
  authRej,
  authRes,
  fetchUserRes,
  logoutRes,
} from "../reducer/authReducer";

//login 1
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.post("/auth/login", { email, password });
    dispatch(authRes(data));
  } catch (error) {
    dispatch(authRej(error?.response?.data?.message));
  }
};
// signup 2
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.post("/auth/register", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(authRes(data));
  } catch (error) {
    dispatch(authRej(error?.response?.data?.message));
  }
};
// change Password 3
export const change = (currPass, newPass) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.put("/auth/password/change", {
      currPass,
      newPass,
    });
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// forget password 4
export const forget = (email) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.post(
      "/auth/password/forget/",
      { email },
      { withCredentials: false }
    );
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// reset password 5
export const reset = (otp, newPass) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.put(
      "/auth/password/reset",
      { otp, newPass },
      { withCredentials: false }
    );
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// delete profile 6
export const deleteProfile = (email, password) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.delete("/auth/me", {
      data: { email, password },
    });
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// edit profile 7
export const editProfile = (userData) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.put("/auth/me", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// fetch user 8
export const fetchUser = () => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.get("/auth/me");
    dispatch(fetchUserRes(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// verify user 9
export const verify = (otp) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.post("/auth/me", { otp });
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// logout 10
export const logout = () => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.get("/auth/logout");
    dispatch(logoutRes(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// logout 11
export const contact = (name, email, subject, msg) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.post("/auth/contact", {
      name,
      email,
      subject,
      msg,
    });
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
