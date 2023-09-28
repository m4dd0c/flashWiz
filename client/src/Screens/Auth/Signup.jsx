import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import mime from "mime";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { PencilIcon } from "react-native-heroicons/outline";
import { styles } from "../../theme/style";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../store/actions/authAction";
import axios from "axios";
import { instance } from "../../store/constants/constants";
const Signup = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  // submit handler
  const submitHandler = async () => {
    console.log("submit register");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", {
      uri: avatar,
      type: mime.getType("avatar"),
      name: avatar.split("/").pop(),
    });
    dispatch(signup(formData));

    // dispatch(login("manishsuthar078@gmail.com", "password"));
  };
  // const {user} = useSelector(state => state.auth)
  // console.log(user);
  useEffect(() => {
    if (route.params && route.params.avatar) {
      setAvatar(route.params.avatar);
    }
  }, [route]);
  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View>
        <Text style={styles.title}>REGISTER</Text>
      </View>
      <ScrollView>
        <View
          style={{ height: hp("80%") }}
          className="flex justify-center items-center"
        >
          <View className="h-38 w-38 rounded-full mb-4">
            <View className="border-2 border-slate-100 rounded-full">
              <Image
                className="h-36 w-36 rounded-full"
                source={
                  avatar
                    ? { uri: avatar }
                    : require("../../../assets/images/contact.jpg")
                }
                alt="loading..."
              />
            </View>
            <View
              className="bg-slate-100 p-2 w-8 h-8 flex justify-center items-center rounded-full"
              style={{ left: wp("25%"), bottom: hp("4%") }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("camera", { path: "signup" })
                }
              >
                <PencilIcon size={20} color={"black"} />
              </TouchableOpacity>
            </View>
          </View>

          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="Name, eg: John Doe"
            onChangeText={setName}
            value={name}
          />
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
            onPress={submitHandler}
            // disabled={!name || !email || !password || !avatar}
            style={{ width: wp("80%") }}
            className="my-4 rounded-xl bg-slate-700 py-3"
          >
            <Text className="text-white text-lg" style={styles.btn}>
              SIGN UP
            </Text>
          </TouchableOpacity>
          <Text>{"\n"}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text className="text-slate-800" style={styles.reg}>
              Already own an Account ? SIGN IN
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
