import { instance } from "../constants/constants";
import { err, getUsersRes, req, res } from "../reducer/adminReducer";
//fetch all users
export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.get("/admin/users");
    dispatch(getUsersRes(data));
  } catch (error) {
    console.log(error);
    dispatch(err(error.response.data.error));
  }
};
// delete any user
export const deleteUserAdmin = (id) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.delete(`/admin/action/${id}`);
    dispatch(res(data));
  } catch (error) {
    console.log(error);
    dispatch(err(error.response.data.error));
  }
};
//change role
export const changeRole = (id) => async (dispatch) => {
  try {
    dispatch(req());
    const { data } = await instance.get(`/admin/action/${id}`);
    dispatch(res(data));
  } catch (error) {
    console.log(error);
    dispatch(err(error.response.data.error));
  }
};
