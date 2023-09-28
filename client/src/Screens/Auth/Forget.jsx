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
import { forget } from "../../store/actions/authAction";
import LoadingScreen from "../LoadingScreen";
import { showInfo } from "../../api/api";

const Forget = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, msg, err } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  // submit handler
  const submitHandler = () => {
    dispatch(forget(email));
  };
  //showing toast
  useEffect(() => {
    if (msg) {
      showInfo(msg, dispatch);
      setTimeout(() => {
        navigation.navigate("reset");
      }, 1000);
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
          Forget Password
        </Text>
      </View>
      <ScrollView>
        <View className="my-10">
          <Image
            source={require("../../../assets/images/forget.png")}
            alt="loading.."
            className="h-56 w-56 m-auto"
          />
        </View>
        <View className="flex justify-center items-center">
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4 my-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="Email, eg: john@doe.tld"
            onChangeText={setEmail}
            value={email}
          />
          <TouchableOpacity
            onPress={submitHandler}
            disabled={!email}
            style={{ width: wp("80%") }}
            className="my-4 rounded-xl bg-slate-700 py-3"
          >
            <Text className="text-white text-lg" style={styles.btn}>
              SEND RESET LINK
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("reset")}
            style={{ width: wp("80%") }}
            className="my-4"
          >
            <Text className="text-sm" style={styles.btn}>
              Already Have an OTP ?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forget;
