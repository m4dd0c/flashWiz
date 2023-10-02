import React, { useEffect, useState } from "react";
import {
  Alert,
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
import { createCard, fetchCards } from "../../store/actions/cardAction";
import { showInfo } from "../../api/api";
import LoadingScreen from "../LoadingScreen";
const CreateCard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, msg, err } = useSelector((state) => state.cards);
  //card
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");

  // submit handler
  const submitHandler = async () => {
    await dispatch(createCard(question, answer, subject));
    dispatch(fetchCards());
  };

  //cancel handler
  const cancelHandler = () => {
    Alert.alert(
      "Go Back",
      "Do you want to Cancel ?",
      [
        {
          text: "No, Dont Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          onPress: () => navigation.navigate("profile"),
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  //toast
  useEffect(() => {
    if (msg) {
      showInfo(msg, dispatch, 1, "card");
      setTimeout(() => navigation.navigate("profile"), 1000);
    }
    if (err) showInfo(err, dispatch, 0, "card");
  }, [msg, err]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View>
        <Text style={{ ...styles.title, fontSize: 35 }}>Create Card</Text>
      </View>
      <ScrollView>
        <View className="flex justify-center items-center">
          <View className="mt-5">
            <Image
              source={require("../../../assets/images/cards.jpg")}
              alt="loading.."
              className="h-56 w-56 m-auto"
            />
          </View>
          <TextInput
            className="bg-slate-50 rounded-lg p-4"
            style={{
              verticalAlign: "top",
              height: 120,
              width: wp("80%"),
              ...styles.reg,
            }}
            multiline
            numberOfLines={5}
            placeholder="Question, eg: Who created C language ?"
            onChangeText={setQuestion}
            value={question}
          />
          <TextInput
            className="bg-slate-50 rounded-lg p-4 my-3"
            style={{
              verticalAlign: "top",
              height: 150,
              width: wp("80%"),
              ...styles.reg,
            }}
            multiline
            numberOfLines={5}
            placeholder="Answer to Question, eg: Denis Ritche"
            onChangeText={setAnswer}
            value={answer}
          />
          <TextInput
            className="bg-slate-50 h-12 rounded-lg px-4"
            style={{ width: wp("80%"), ...styles.reg }}
            placeholder="Subject, eg: Computer Science"
            onChangeText={setSubject}
            value={subject}
          />
          <View className="flex-row w-full justify-evenly">
            <TouchableOpacity
              onPress={submitHandler}
              disabled={!question || !answer || !subject}
              style={{ width: wp("40%") }}
              className="my-4 rounded-xl bg-slate-600 py-3"
            >
              <Text className="text-white text-lg" style={styles.btn}>
                Create
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelHandler}
              style={{ width: wp("35%") }}
              className="my-4 rounded-xl border-2 border-slate-500 py-3"
            >
              <Text className="text-slate-400 text-lg" style={styles.btn}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateCard;
