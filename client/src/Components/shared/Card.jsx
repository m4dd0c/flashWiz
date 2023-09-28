import React from "react";
import FlipCard from "react-native-flip-card";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { getGradient } from "../../theme/style";
import FrontBack from "./FrontBack";

const Card = ({ data = [1, 2, 3, 4, 5], isStack = true, num }) => {
  const fColors = getGradient();
  const bColors = getGradient();

  return (
    <FlipCard
      style={
        isStack
          ? {
              width: wp("80%"),
              height: hp("70%"),
            }
          : {
              width: wp("43%"),
              height: hp("30%"),
            }
      }
      friction={20}
      perspective={500}
      flipHorizontal={true}
      flipVertical={false}
      className="overflow-hidden rounded-xl"
    >
      <FrontBack isFront={true} customColors={fColors} num={num} />
      <FrontBack isFront={false} customColors={bColors} num={num} />
    </FlipCard>
  );
};

export default Card;
