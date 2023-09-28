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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { styles } from "../theme/style";
const Contact = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  // submit handler
  const submitHandler = () => {
    console.log("submit contact msg");
  };
  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View>
        <Text style={styles.title}>Contact</Text>
      </View>
      <ScrollView>
        <View className="my-3">
          <Image
            source={require("../../assets/images/contact-us.png")}
            alt="loading.."
            className="h-56 w-56 m-auto"
          />
        </View>
        <View className="flex justify-center items-center">
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="Name, eg: John Doe"
            onChangeText={setName}
            value={name}
          />
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4 mt-2 mb-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="Email, eg: john@doe.tld"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="Subject, eg: feedback or contact"
            onChangeText={setSubject}
            value={subject}
          />
          <TextInput
            className="bg-slate-50 rounded-lg px-4 py-4 mt-2"
            style={{
              width: wp("80%"),
              textAlignVertical: "top",
              ...styles.reg,
            }}
            placeholder="Your Message..."
            onChangeText={setMsg}
            value={msg}
            multiline={true}
            numberOfLines={7}
          />
          <TouchableOpacity
            onPress={submitHandler}
            disabled={!email || !msg || !name || !subject}
            style={{ width: wp("80%") }}
            className="my-4 rounded-xl bg-slate-700 py-3"
          >
            <Text className="text-white text-lg" style={styles.btn}>
              SEND MAIL
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Contact;
