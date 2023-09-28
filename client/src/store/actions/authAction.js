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
    console.log("login");
    dispatch(req());
    const { data } = await instance.post("/auth/login", { email, password });
    console.log("daata aa gya");
    dispatch(authRes(data));
  } catch (error) {
    console.log(error?.response);
    dispatch(authRej(error.response.data.error));
  }
};
// signup 2
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(req());
    console.log("signuppp req");
    const { data } = await instance.post("/auth/register", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("signuppp res");
    dispatch(authRes(data));
  } catch (error) {
    console.log("signuppp rej");
    console.log(error.response);
    dispatch(authRej(error.response.data.error));
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
    console.log(error);
    dispatch(err(error.response.data.error));
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
    console.log(error);
    dispatch(err(error.response.data.error));
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
    console.log(error);
    dispatch(err(error.response.data.error));
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
    console.log(error);
    dispatch(err(error.response.data.error));
  }
};
// edit profile 7
export const editProfile = (userData) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.put(
      "/auth/me",
      { userData },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          l,
        },
      }
    );
    dispatch(res(data));
  } catch (error) {
    console.log(error);
    dispatch(err(error.response.data.error));
  }
};
// fetch user 8
export const fetchUser = () => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.get("/auth/me");
    console.log('fectch luser\n');
    dispatch(fetchUserRes(data));
  } catch (error) {
    console.log(error);
    dispatch(err(error.response.data.error));
  }
};
// verify user 9
export const verify = (otp) => async (dispatch) => {
  console.log('hehre 1');
  try {
    dispatch(req());
    const { data } = await instance.post("/auth/me", { otp }, {withCredentials: true});
    console.log('hehre 2');
    dispatch(res(data));
  } catch (error) {
    console.log('hehre 3');
    console.log(error.response.data);
    dispatch(err(error.response.data.error));
  }
};
// logout 10
export const logout = () => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.get("/auth/logout");
    dispatch(logoutRes(data));
  } catch (error) {
    console.log(error);
    dispatch(err(error.response.data.error));
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
    console.log(error);
    dispatch(err(error.response.data.error));
  }
};
