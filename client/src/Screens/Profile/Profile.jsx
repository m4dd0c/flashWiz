import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Top from "../../Components/profile/Top";
import Bottom from "../../Components/profile/Bottom";
import { useSelector } from "react-redux";
import LoadingScreen from "../LoadingScreen";
const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  console.log(user);
  return loading ? (
    <LoadingScreen />
  ) : (
    <SafeAreaView className="bg-white flex-1">
      <View className="bg-slate-800" style={{ height: hp("40%") }}>
        <Top user={user} />
      </View>
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          bottom: 30,
        }}
        className="bg-white overflow-hidden"
      >
        <Bottom />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
