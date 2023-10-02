import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader = () => {
  return <ActivityIndicator animating={true} size="large" color="#666666" />;
};

export default Loader;
