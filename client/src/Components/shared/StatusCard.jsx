import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../theme/style";

const StatusCard = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-xl" style={styles.thick}>
        No More Cards left...
      </Text>
    </SafeAreaView>
  );
};

export default StatusCard;
