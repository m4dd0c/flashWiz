import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../theme/style";

const DangerZone = () => {
  //delete Account request
  const deleteAccount = () => {
    console.log("account deleted");
  };

  const deleteHandler = () => {
    console.log("delete handler");
    //showing alert before proceeding
    Alert.alert(
      "Delete Your Account",
      "Are you sure You want to Delete Account ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete Account",
          onPress: () => deleteAccount(),
        },
      ]
    );
  };
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showError, setShowError] = useState(false);

  // submit handler
  const submitHandler = () => {
    if (confirmPass !== newPass) {
      return setShowError(true);
    } else {
      setShowError(false);
    }
    console.log("submit change");
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View style={{ height: hp("50%") }} className="border-2">
          <Text
            style={{ ...styles.title, fontSize: 30 }}
            className="my-10 text-center"
          >
            Change Password
          </Text>
          <View className="flex justify-center items-center">
            <TextInput
              className="bg-slate-50 h-12 rounded-lg px-4 "
              style={{ width: wp("80%"), ...styles.reg }}
              placeholder="Current Password"
              onChangeText={setCurrPass}
              value={currPass}
            />
            <TextInput
              className="bg-slate-50 h-12 rounded-lg px-4 my-4"
              style={{ width: wp("80%"), ...styles.reg }}
              placeholder="New Strong Password"
              onChangeText={setNewPass}
              value={newPass}
            />
            <TextInput
              className="bg-slate-50 h-12 rounded-lg px-4"
              style={{ width: wp("80%"), ...styles.reg }}
              placeholder="Confirm New Password"
              onChangeText={setConfirmPass}
              value={confirmPass}
            />
            <Text
              className={!showError ? "hidden" : "text-red-400 right-4 mt-1"}
            >
              Both New Password and Confirm Password must Match!
            </Text>
            <TouchableOpacity
              onPress={submitHandler}
              disabled={!currPass || !newPass || !confirmPass}
              style={{ width: wp("80%") }}
              className="my-4 rounded-xl bg-slate-600 py-3"
            >
              <Text className="text-white text-lg" style={styles.btn}>
                CHANGE PASSWORD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ height: hp("42.7%") }}
          className="w-full flex justify-center items-center bg-red-50"
        >
          <View style={{ width: wp("80%") }}>
            <Text style={styles.title}>Danger Zone</Text>
            <TouchableOpacity
              onPress={deleteHandler}
              className="rounded-xl bg-red-400 py-3 my-4"
              style={{ width: wp("38%") }}
            >
              <Text className="text-white text-lg" style={styles.btn}>
                Delete Account
              </Text>
            </TouchableOpacity>
            <Text style={styles.reg}>
              Account Once Deleted can never be Retrived, Step carefully ahead.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DangerZone;
