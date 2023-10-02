import {
  clearErr as authErr,
  clearMsg as authMsg,
} from "../store/reducer/authReducer";
import {
  clearErr as adminErr,
  clearMsg as adminMsg,
} from "../store/reducer/adminReducer";
import {
  clearErr as cardErr,
  clearMsg as cardMsg,
} from "../store/reducer/cardReducer";
import Toast from "react-native-toast-message";

//show info msg function to show toaster
export const showInfo = (msg, dispatch, isMsg = true, type = "auth") => {
  if (isMsg) {
    Toast.show({
      type: "success",
      text1: msg,
    });
    if (type === "auth") {
      dispatch(authMsg());
    } else if (type === "admin") {
      dispatch(adminMsg());
    } else {
      dispatch(cardMsg());
    }
  }
  if (!isMsg) {
    Toast.show({
      type: "error",
      text1: `Failed!`,
      text2: msg,
      //   text2: "Please try again after sometime",
    });
    if (type === "auth") {
      dispatch(authErr());
    } else if (type === "admin") {
      dispatch(adminErr());
    } else {
      dispatch(cardErr());
    }
  }
};
// number formatter
export const formatMe = (num) => {
  return num < 10 ? "0" + num : num;
};
