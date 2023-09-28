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
import { reset } from "../../store/actions/authAction";
import LoadingScreen from "../LoadingScreen";
import { showInfo } from "../../api/api";
const Reset = ({ navigation }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showError, setShowError] = useState(false);
  const { loading, msg, err } = useSelector((state) => state.auth);
  // submit handler
  const submitHandler = () => {
    if (confirmPass !== password) {
      return setShowError(true);
    } else {
      setShowError(false);
    }
    dispatch(reset(otp, password));
  };
  
  //showing toast
  useEffect(() => {
    if (msg) {
      showInfo(msg, dispatch);
      setTimeout(() => navigation.navigate("login"), 1000);
    }
    if (err) {
      showInfo(err, dispatch, 0);
    }
  }, [msg, err]);
  return loading ? (
    <LoadingScreen />
  ) : (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View>
        <Text style={{ ...styles.title, fontSize: 30 }} className="my-6">
          Reset Password
        </Text>
      </View>
      <ScrollView>
        <View className="my-8">
          <Image
            source={require("../../../assets/images/reset.jpg")}
            alt="loading.."
            className="h-56 w-56 m-auto"
          />
        </View>
        <View className="flex justify-center items-center">
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4 my-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="Reset Password OTP"
            onChangeText={setOtp}
            value={otp}
          />
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4 my-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="New Strong Password"
            onChangeText={setPassword}
            value={password}
          />
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="Confirm New Password"
            onChangeText={setConfirmPass}
            value={confirmPass}
          />
          <Text
            className={!showError ? "hidden" : "text-red-400 mt-1"}
            style={styles.reg}
          >
            Both New Password and Confirm Password must Match!
          </Text>
          <TouchableOpacity
            onPress={submitHandler}
            disabled={!password || !otp || !confirmPass}
            style={{ width: wp("80%") }}
            className="my-4 rounded-xl bg-slate-700 py-3"
          >
            <Text className="text-white text-lg" style={styles.btn}>
              RESET PASSWORD
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reset;
