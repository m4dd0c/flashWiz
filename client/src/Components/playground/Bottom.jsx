import React from "react";
import { Image, View } from "react-native";
import check from "../../../assets/images/check.png";
import cross from "../../../assets/images/cross.png";
const SideLight = () => {
  return (
    <View className="flex-row justify-around pb-4 items-center bg-white w-screen">
      <View className="box">
        <Image source={cross} alt="loading..." className="h-14 w-14" />
      </View>
      <View className="box">
        <Image source={check} alt="loading..." className="h-14 w-14" />
      </View>
    </View>
  );
};

export default SideLight;
