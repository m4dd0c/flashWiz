import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardStack from "../Components/shared/CardStack";
import Top from "../Components/playground/Top";
import Bottom from "../Components/playground/Bottom";
import { useDispatch, useSelector } from "react-redux";
import { updateQAScore, updateScore } from "../store/actions/cardAction";

const Playground = ({ route }) => {
  const dispatch = useDispatch();
  const { cards } = useSelector((state) => state.cards);

  //states
  const [category, setCategory] = useState(null);
  const [filteredCards, setFilteredCards] = useState({});
  const [lastCard, setLastCard] = useState(null);
  const [currNum, setCurrNum] = useState(1);

  // update total score if its last card
  const updateTotalScore = (qa_id, c_id) => {
    if (qa_id === lastCard) dispatch(updateScore(c_id));
  };

  // update score
  const handleWrong = (c_id, qa_id) => {
    dispatch(updateQAScore(0, c_id, qa_id));
    updateTotalScore(qa_id, c_id);
    return true;
  };
  const handleCorrect = (c_id, qa_id) => {
    dispatch(updateQAScore(1, c_id, qa_id));
    updateTotalScore(qa_id, c_id);
    return true;
  };

  //card to send - filtering
  const stack = (cat) => {
    const filtered = cards.filter((item) => item.subject === cat);
    setFilteredCards(filtered[0]);
    //setting last qa_id to lastCard state
    setLastCard(filtered[0]?.qa[filtered[0]?.qa?.length - 1]?._id);
  };

  // getting category to filter
  useEffect(() => {
    if (cards && cards.length > 0) {
      if (!category) {
        setFilteredCards(cards[0]);
        setLastCard(cards[0]?.qa[cards[0]?.qa?.length - 1]?._id);
      } else {
        stack(category);
      }
    }
  }, [cards, category]);

  //getting category
  useEffect(() => {
    if (route.params && route.params.category)
      setCategory(route.params.category);
  }, [route]);
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Top numOfCards={filteredCards?.qa?.length} isCards={cards} />
      <CardStack
        handleCorrect={handleCorrect}
        handleWrong={handleWrong}
        stack={filteredCards}
      />
      <Bottom />
    </SafeAreaView>
  );
};

export default Playground;

// import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import CardStack from "../Components/shared/CardStack";
// import Top from "../Components/playground/Top";
// import Bottom from "../Components/playground/Bottom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateQAScore, updateScore } from "../store/actions/cardAction";

// const Playground = ({ route }) => {
//   const dispatch = useDispatch();
//   const { cards } = useSelector((state) => state.cards);

//   //states
//   const [category, setCategory] = useState(null);
//   const [filteredCards, setFilteredCards] = useState(cards && cards[0]);
//   const [lastCard, setLastCard] = useState(
//     cards && cards.length > 0 && cards[0]?.qa[cards[0]?.qa?.length - 1]?._id
//   );

//   // update total score if its last card
//   const updateTotalScore = (qa_id, c_id) => {
//     if (qa_id === lastCard) dispatch(updateScore(c_id));
//   };

//   // update score
//   const handleWrong = (c_id, qa_id) => {
//     dispatch(updateQAScore(0, c_id, qa_id));
//     updateTotalScore(qa_id, c_id);
//     return true;
//   };
//   const handleCorrect = (c_id, qa_id) => {
//     dispatch(updateQAScore(1, c_id, qa_id));
//     updateTotalScore(qa_id, c_id);
//     return true;
//   };

//   //card to send - filtering
//   const stack = (cat) => {
//     const filtered = cards.filter((item) => item.subject === cat);
//     setFilteredCards(filtered[0]);
//     //setting last qa_id to lastCard state
//     setLastCard(filtered[0]?.qa[filtered[0]?.qa?.length - 1]?._id);
//   };

//   // getting category to filter
//   useEffect(() => {
//     if (cards && cards.length > 0 && category) stack(category);
//   }, [cards, category]);

//   //getting category
//   useEffect(() => {
//     if (route.params && route.params.category)
//       setCategory(route.params.category);
//   }, [route]);

//   return (
//     <SafeAreaView className="flex-1 justify-center items-center">
//       <Top numOfCards={10} isCards={cards} />
//       <CardStack
//         handleCorrect={handleCorrect}
//         handleWrong={handleWrong}
//         stack={filteredCards}
//       />
//       <Bottom />
//     </SafeAreaView>
//   );
// };

// export default Playground;
