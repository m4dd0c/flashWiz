import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { styles } from "../../theme/style";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/authAction";
import LoadingScreen from "../LoadingScreen";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("manish@gmail.com");
  const [password, setPassword] = useState("password");
  const { loading } = useSelector((state) => state.auth);

  // submit handler
  const submitHandler = async () => {
    dispatch(login(email, password));
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View>
        <Text style={styles.title}>Login</Text>
      </View>
      <ScrollView>
        <View className="my-6">
          <Image
            source={require("../../../assets/images/login.jpg")}
            alt="loading..."
            className="h-56 w-56 mx-auto"
          />
        </View>
        <View
          className="flex justify-center items-center"
        >
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4 m-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="Email, eg: john@doe.tld"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="Strong Password"
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("forget")}
            className="-left-24 mt-2"
          >
            <Text style={styles.reg}>Forgotten Password ?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={submitHandler}
            disabled={!email || !password}
            style={{ width: wp("80%") }}
            className="my-4 rounded-xl bg-slate-700 py-3"
          >
            <Text className="text-white text-lg" style={styles.btn}>
              SIGN IN
            </Text>
          </TouchableOpacity>
          <Text>{"\n"}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text className="text-slate-800" style={styles.reg}>
              Don't Have any Account ? SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
