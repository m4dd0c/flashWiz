import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../theme/style";
import { formatMe } from "../../api/api";

const Top = ({ numOfCards, isCards }) => {
  return (
    <View className="bg-white w-full pl-4">
      <Text style={styles.title} className="my-6">
        Playground
      </Text>
      {isCards && (
        <View className="flex justify-center items-start px-3">
          <Text style={styles.thick}>
            Number of Cards: {formatMe(numOfCards) ?? "XX"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Top;
