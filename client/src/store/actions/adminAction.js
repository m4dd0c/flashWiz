import { instance } from "../constants/constants";
import { err, getUsersRes, req, res } from "../reducer/adminReducer";
//fetch all users
export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.get("/admin/users");
    dispatch(getUsersRes(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
// delete any user
export const deleteUserAdmin = (id) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.delete(`/admin/action/${id}`);
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
//change role
export const changeRole = (id) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.get(`/admin/action/${id}`);
    dispatch(res(data));
  } catch (error) {
    dispatch(err(error?.response?.data?.message));
  }
};
