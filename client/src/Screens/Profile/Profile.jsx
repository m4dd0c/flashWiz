import React, { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Top from "../../Components/profile/Top";
import Bottom from "../../Components/profile/Bottom";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../LoadingScreen";
import { fetchCards } from "../../store/actions/cardAction";

const Profile = () => {
  const dispatch = useDispatch();
  //state
  const { user, loading } = useSelector((state) => state.auth);
  const { loading: cardLoading, cards } = useSelector((state) => state.cards);
  const isLoading = loading || cardLoading;

  //fetch cards
  useEffect(() => {
    dispatch(fetchCards());
  }, []);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <SafeAreaView className="bg-white flex-1">
      <View className="bg-slate-800" style={{ height: hp("40%") }}>
        <Top user={user} length={cards?.length} />
      </View>
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          bottom: 30,
        }}
        className="bg-white overflow-hidden"
      >
        <Bottom cards={cards} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
