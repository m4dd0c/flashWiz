import React from "react";
import FlipCard from "react-native-flip-card";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { getGradient } from "../../theme/style";
import FrontBack from "./FrontBack";

const Card = ({ data, isStack = true, card_id = null }) => {
  const fColors = getGradient();
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
      <FrontBack isFront={true} customColors={fColors} data={data} isStack={isStack} card_id={card_id} />
      <FrontBack isFront={false} customColors={fColors} data={data} isStack={isStack} card_id={card_id} />
    </FlipCard>
  );
};

export default Card;
