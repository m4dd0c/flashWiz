import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../theme/style";

const FrontBack = ({ customColors, isFront, num }) => {
  return (
    <LinearGradient
      colors={[customColors.a, customColors.b]}
      className="flex justify-center items-center"
    >
      <View className="h-full w-full py-4 flex justify-between">
        <View>
          <Text
            className="text-xl text-center"
            style={{ ...styles.thick, color: "rgba(255,255,255,0.8)" }}
          >
            {isFront ? `QUESTION ${num}` : "Answer"} 
          </Text>
        </View>
        <View>
          <Text
            className="text-xl text-center"
            style={{ ...styles.thick, color: "white" }}
          >
            {isFront ? "front" : "back"}
          </Text>
        </View>
        <View>
          <Text
            className="text-xl text-center"
            style={{ ...styles.thick, color: "rgba(255,255,255,0.8)" }}
          >
            Tap to Flip
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default FrontBack;
