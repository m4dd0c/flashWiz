import React from "react";
import { Text, View } from "react-native";
import Loader from "../Components/Layout/Loader";
import { styles } from "../theme/style";

const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="flex-row items-center">
        <Loader />
        <Text className="px-2 uppercase" style={styles.thick}>
          Loading...
        </Text>
      </View>
    </View>
  );
};

export default LoadingScreen;
