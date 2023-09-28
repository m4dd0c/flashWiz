import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeCards from "react-native-swipe-cards-deck";
import Card from "./Card";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import StatusCard from "./StatusCard";

const CardStack = ({handleWrong, handleCorrect}) => {

  const yupActions = {
    onAction: handleCorrect,
    show: false,
  };
  const nopeActions = {
    onAction: handleWrong,
    show: false,
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white w-full flex-row ">
      <View style={{ height: hp("60%") }}>
        <SwipeCards
          cards={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
          className="relative"
          renderCard={(cardData) => (
            <View style={{ width: wp("80%"), height: hp("60%") }}>
              <Card data={cardData} isStack={true} num={cardData} />
            </View>
          )}
          keyExtractor={(cardData) => String(cardData)}
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
