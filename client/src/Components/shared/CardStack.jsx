import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeCards from "react-native-swipe-cards-deck";
import Card from "./Card";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import StatusCard from "./StatusCard";

const CardStack = ({ stack, handleWrong, handleCorrect }) => {

  const yupActions = {
    onAction: (card) => handleCorrect(stack._id, card._id),
    show: false,
  };
  const nopeActions = {
    onAction: (card) => handleWrong(stack._id, card._id),
    show: false,
  };
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white w-full flex-row ">
      <View style={{ height: hp("60%") }}>
        <SwipeCards
          cards={stack?.qa}
          className="relative"
          renderCard={(cardData) => {
            return (
              <View
                style={{ width: wp("80%"), height: hp("60%") }}
                key={cardData._id}
              >
                <Card data={cardData} isStack={true} />
              </View>
            );
          }}
          keyExtractor={(cardData) => String(cardData._id)}
          renderNoMoreCards={() => <StatusCard />}
          actions={{
            nope: nopeActions,
            yup: yupActions,
          }}
          smoothTransition={true}
          stack={true}
          stackDepth={4}
          stackOffsetX={8}
          stackOffsetY={7}
        />
      </View>
    </SafeAreaView>
  );
};

export default CardStack;
