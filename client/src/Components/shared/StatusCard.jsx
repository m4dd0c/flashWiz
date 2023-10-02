import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../theme/style";
import { useNavigation } from "@react-navigation/native";

const StatusCard = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 justify-between items-center">
      <View></View>
      <View className="w-4/5">
        <Text className="text-xl" style={styles.thick}>
          No More Cards left...{"\n\n"}You can always Create Cards if You don't
          have no card
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("profile")}
          className="my-4"
        >
          <Text style={{ ...styles.thick, color: "skyblue" }}>
            Go to Profile
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-screen">
        <View>
          <Text
            className="text-3xl mb-10 bg-gray-50 text-center py-2"
            style={{ ...styles.thick, color: "gray" }}
          >
            Quick Note
          </Text>
        </View>
        <View className="flex-row justify-evenly">
          <View>
            <Text className="mr-7" style={styles.thick}>
              Swipe Left if
            </Text>
          </View>
          <View>
            <Text className="ml-7" style={styles.thick}>
              Swipe Right if
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StatusCard;
