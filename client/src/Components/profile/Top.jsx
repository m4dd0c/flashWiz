import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import {
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
} from "react-native-heroicons/outline";
import { styles } from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authAction";
const Top = ({ user }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState("");
  // logout itself
  const logoutFunc = () => {
    console.log("logged out");
    dispatch(logout());
  };

  // logout feedback
  const logoutHandler = () => {
    Alert.alert(
      "Logout",
      "Do you want to Logout ?",
      [
        {
          text: "No, I Don't",
          style: "cancel",
        },
        {
          text: "Yes, Logout",
          onPress: () => logoutFunc(),
        },
      ],
      { cancelable: false }
    );
  };
  const navigationHandler = (path) => {
    navigation.navigate(path);
  };
  return (
    <>
      <View className="flex-row justify-between items-center mx-6 my-4">
        <Text style={{ ...styles.title, color: "#F8FAFC" }}>Profile</Text>
        <View className="flex-row">
          <TouchableOpacity onPress={() => navigationHandler("edit")}>
            <PencilIcon color="white" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={logoutHandler} className="ml-4">
            <ArrowRightOnRectangleIcon color="red" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row items-center justify-evenly mt-5">
        <View className="h-38 w-38 rounded-full mb-4">
          <Image
            className="h-36 w-36 rounded-full"
            source={
              avatar
                ? { uri: user?.avatar?.url }
                : require("../../../assets/images/contact.jpg")
            }
            alt="loading..."
          />
        </View>
        <View>
          <Text
            className="text-3xl mb-5"
            style={{ ...styles.thick, color: "white" }}
          >
            {user?.name}
          </Text>
          <Text style={{ ...styles.thick, color: "#F8FAFC" }}>
            {user?.email}
          </Text>
          <Text className="text-lg" style={{ ...styles.thick, color: "white" }}>
            Total Subject: 5
          </Text>
          {!user?.verification && (
            <TouchableOpacity onPress={() => navigationHandler("verify")}>
              <View className="flex-row items-center">
                <Text
                  className="text-lg"
                  style={{ ...styles.thick, color: "red" }}
                >
                  Verify Your Account{" "}
                </Text>
                <ExclamationTriangleIcon size={20} color={"red"} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default Top;
