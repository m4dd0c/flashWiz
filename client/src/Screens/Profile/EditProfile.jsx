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
// import mime from "mime";
import mime from "mime";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  Cog6ToothIcon,
  EnvelopeIcon,
  PencilIcon,
} from "react-native-heroicons/outline";
import { styles } from "../../theme/style";
const EditProfile = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  // submit handler
  const submitHandler = () => {
    console.log("submit register");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("avatar", {
      uri: avatar,
      type: mime.getType("avatar"),
      name: avatar.split("/").pop(),
    });
  };
  useEffect(() => {
    if (route.params && route.params.avatar) {
      setAvatar(route.params.avatar);
    }
  }, [route]);
  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View className="flex-row justify-between items-center">
        <Text style={{...styles.title, fontSize: 35}}>Edit Profile</Text>
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.navigate("contact")}>
            <EnvelopeIcon color="black" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("dangerZone")} className='ml-4'>
            <Cog6ToothIcon color="black" size={30} />
          </TouchableOpacity>
        </View>
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
                    : require("../../../assets/adaptive-icon.png")
                }
                alt="loading..."
              />
            </View>
            <View
              className="bg-slate-100 p-2 w-8 h-8 flex justify-center items-center rounded-full"
              style={{ left: wp("25%"), bottom: hp("4%") }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("camera", { path: "edit" })}
              >
                <PencilIcon size={20} color={"black"} />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4"
            style={{ ...styles.reg, width: wp("80%") }}
            placeholder="Name, eg: John Doe"
            onChangeText={setName}
            value={name}
          />
          <View
            className="flex-row justify-between"
            style={{ width: wp("80%") }}
          >
            <TouchableOpacity
              onPress={submitHandler}
              disabled={!name}
              style={{ width: wp("38%") }}
              className="my-4 rounded-xl bg-slate-700 py-3"
            >
              <Text className="text-lg text-white" style={styles.btn}>
                EDIT PROFILE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("profile")}
              style={{ width: wp("38%") }}
              className="my-4 rounded-xl border-2 border-slate-700 py-3"
            >
              <Text className="text-slate-700 text-lg" style={styles.btn}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
