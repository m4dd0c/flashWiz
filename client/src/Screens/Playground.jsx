import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardStack from "../Components/shared/CardStack";
import Top from "../Components/playground/Top";
import Bottom from "../Components/playground/Bottom";

const Playground = () => {
  const handleWrong = () => {
    console.log("nope");
    return true;
  };
  const handleCorrect = () => {
    console.log("yup");
    return true;
  };
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Top />
      <CardStack handleCorrect={handleCorrect} handleWrong={handleWrong} />
      <Bottom />
    </SafeAreaView>
  );
};

export default Playground;
