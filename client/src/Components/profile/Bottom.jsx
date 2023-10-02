import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { styles } from "../../theme/style";
import Card from "../shared/Card";
import { useNavigation } from "@react-navigation/native";
import { formatMe } from "../../api/api";
import { TrashIcon } from "react-native-heroicons/outline";
import { useDispatch } from "react-redux";
import { deleteSubject, fetchCards } from "../../store/actions/cardAction";

const Bottom = ({ cards }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //state
  const [categories, setCategories] = useState([]);
  const [filteredCard, setFilteredCard] = useState(null);
  const [score, setScore] = useState(0);
  const [currentId, setCurrentId] = useState(null);

  //filtering card to show
  const filterCard = (subject) => {
    const arr = cards.filter((card) => card.subject === subject);
    setFilteredCard(arr);
    setCurrentId(arr[0]._id);
    setScore(arr[0].last_score);
  };

  //setting categories
  useEffect(() => {
    if (cards && cards?.length > 0) {
      setFilteredCard(cards);
      setCurrentId(cards[0]._id);
      setScore(cards[0].last_score);
      let arr = [];
      cards.forEach((item) => {
        arr.push(item.subject);
      });
      setCategories(arr);
    }
  }, [cards]);

  // delete subject
  const dispatchDeleteSubject = async () => {
    await dispatch(deleteSubject(currentId));
    dispatch(fetchCards());
  };

  //popup
  const popup = () => {
    Alert.alert(
      "Are you sure",
      "You want to delete whole subject ?",
      [
        {
          text: "No, Don't Delete",
          style: "cancel",
        },
        {
          text: "Yes, Delete It",
          onPress: dispatchDeleteSubject,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <View
        className="flex-row w-full items-center overflow-hidden"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("playground", {
              category: filteredCard ? filteredCard[0]?.subject : categories[0],
            })
          }
          className="bg-slate-50"
          style={{ width: wp("50%") }}
        >
          <Text className="text-center py-4" style={styles.thick}>
            Start Math Match
          </Text>
        </TouchableOpacity>
        <Text
          className="text-center py-4"
          style={{ ...styles.thick, width: wp("40%") }}
        >
          Last_Score: {formatMe(score)}
        </Text>
        {categories?.length > 0 && (
          <TouchableOpacity
            onPress={() => popup()}
            style={{ width: wp("10%") }}
          >
            <TrashIcon size={20} color={"black"} />
          </TouchableOpacity>
        )}
      </View>
      <View className="w-full my-2">
        <ScrollView horizontal={true}>
          {categories?.map((item, index) => (
            <View
              key={index}
              style={{ width: wp("25%") }}
              className="p-3 border-b-2 text-slate-950 border-slate-950"
            >
              <TouchableOpacity onPress={() => filterCard(item)}>
                <Text className="text-center" style={styles.reg}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <ScrollView className="h-full">
        <View
          className="flex-row flex-wrap justify-evenly items-center"
          style={{ marginBottom: 450 }}
        >
          {filteredCard &&
            filteredCard[0]?.qa?.length > 0 &&
            filteredCard[0]?.qa?.map((item, idx) => (
              <View
                key={idx}
                style={{ width: wp("43%"), height: hp("30%") }}
                className="mt-4"
              >
                <Card data={item} isStack={false} card_id={currentId} />
              </View>
            ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Bottom;
