import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../theme/style";
import { TrashIcon } from "react-native-heroicons/outline";
import { useDispatch } from "react-redux";
import { deleteCard, fetchCards } from "../../store/actions/cardAction";

const FrontBack = ({ data, customColors, isFront, isStack, card_id }) => {
  const dispatch = useDispatch();
  //delete card
  const dispatchDeleteCard = async () => {
    if (!card_id) {
      return Alert.alert(
        "Error - Couldn't Delete Card",
        "Reason - Card Id Not Found",
        [
          {
            text: "Okay",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else {
      await dispatch(deleteCard(card_id, data._id));
      dispatch(fetchCards());
    }
  };
  //popup
  const popup = () => {
    Alert.alert(
      "Are you sure",
      "You want to delete this Card ?",
      [
        {
          text: "No, Don't Delete",
          style: "cancel",
        },
        {
          text: "Yes, Delete It",
          onPress: dispatchDeleteCard,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <LinearGradient
      colors={[customColors.a, customColors.b]}
      className="flex justify-center items-center"
    >
      <View className="h-full w-full py-4 flex justify-between">
        <View className="flex-row justify-evenly items-center">
          <Text
            className="text-xl text-center"
            style={{ ...styles.thick, color: "rgba(255,255,255,0.8)" }}
          >
            {isFront ? "Question" : "Answer"}
          </Text>
          {!isStack && (
            <TouchableOpacity onPress={popup}>
              <TrashIcon size={20} color={"white"} />
            </TouchableOpacity>
          )}
        </View>
        <View>
          <Text
            className="text-xl text-center"
            style={{ ...styles.thick, color: "white" }}
          >
            {isFront ? data?.question : data?.answer}
          </Text>
        </View>
        <View>
          <Text
            className="text-xl text-center"
            style={{ ...styles.thick, color: "rgba(255,255,255,0.8)" }}
          >
            Tap to Flip
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default FrontBack;
