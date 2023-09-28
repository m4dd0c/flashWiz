import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../theme/style";

const Top = () => {
  return (
    <View className="bg-white w-full pl-4">
      <Text style={styles.title} className="my-6">
        Playground
      </Text>
      <View className="flex justify-around items-center">
        <View className="flex-row justify-around w-screen">
          <Text style={{ ...styles.thick, color: "green" }}>Correct: 05</Text>
          <Text style={styles.thick}>Number of Cards: 10</Text>
          <Text
            style={{ ...styles.thick, color: "red" }}
            className="text-red-100"
          >
            Wrong: 05
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Top;
