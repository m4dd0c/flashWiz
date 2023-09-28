import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { styles } from "../../theme/style";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../../store/actions/authAction";
import LoadingScreen from "../LoadingScreen";
import { showInfo } from "../../api/api";
const Verify = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { loading, msg, err } = useSelector((state) => state.auth);
  // submit handler
  const submitHandler = async () => {
    dispatch(verify(otp));
  };

  useEffect(() => {
    if (msg) showInfo(msg, dispatch);
    if (err) showInfo(err, dispatch, 0);
  }, [err, msg]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View>
        <Text style={styles.title}>VERIFY ACCOUNT</Text>
      </View>
      <ScrollView>
        <View className="my-6">
          <Image
            source={require("../../../assets/images/change.jpg")}
            alt="loading..."
            className="h-56 w-56 mx-auto"
          />
        </View>
        <View className="flex justify-center items-center">
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4 m-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="OTP Here"
            onChangeText={setOtp}
            value={otp}
          />
          <TouchableOpacity
            onPress={submitHandler}
            disabled={!otp}
            style={{ width: wp("80%") }}
            className="my-4 rounded-xl bg-slate-700 py-3"
          >
            <Text className="text-white text-lg" style={styles.btn}>
              VERIFY ACCOUNT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verify;
