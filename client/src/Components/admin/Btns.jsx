import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRole, deleteUserAdmin, fetchAllUsers } from "../../store/actions/adminAction";
import { Alert, TouchableOpacity, View } from "react-native";
import { ArrowPathIcon, TrashIcon } from "react-native-heroicons/outline";

export const Btns = ({ id }) => {
  //dispatch
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // change role
  const changeUserRole = async () => {
    if (user._id === id) {
      return Alert.alert(
        "Can't Change Role",
        "Loggedin admin's Role can't be Changed!",
        [{ text: "okay", style: "cancel" }],
        { cancelable: true }
      );
    }
    await dispatch(changeRole(id));
    dispatch(fetchAllUsers());
  };

  // delete user
  const deleteUserAccount = async () => {
    if (user._id === id) {
      return Alert.alert(
        "Can't Delete Account",
        "Loggedin Admin can't be Deleted!",
        [{ text: "okay", style: "cancel" }],
        { cancelable: true }
      );
    }
    await dispatch(deleteUserAdmin(id));
    dispatch(fetchAllUsers());
  };

  const popup = (title, message, cancelText, proceedText, isRole) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: cancelText,
          style: "cancel",
        },
        {
          text: proceedText,
          onPress: () => (isRole ? changeUserRole() : deleteUserAccount()),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className="flex-row justify-evenly items-center">
      <TouchableOpacity
        onPress={() =>
          popup(
            "Change Role",
            "Are you sure You want to Change user's Role",
            "No, I don't",
            "Yes, Change Role",
            true
          )
        }
      >
        <ArrowPathIcon size={25} color={"black"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          popup(
            "Delete User's Account",
            "Are you sure You want to Delete Name's Account",
            "No, I don't",
            "Yes, Delete",
            false
          )
        }
      >
        <TrashIcon size={25} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};
