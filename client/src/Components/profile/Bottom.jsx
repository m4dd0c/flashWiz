import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { styles } from "../../theme/style";
import Card from "../shared/Card";
const Bottom = ({ navigation }) => {
  const viewCategory = (index) => {
    categories.forEach((item) => {
      return (item.showBorder = false);
    });
    categories[index].showBorder = true;
    setCategories(categories);
  };

  const [categories, setCategories] = useState([
    { sub: "Math", showBorder: false },
    { sub: "JS", showBorder: false },
    { sub: "PYTHON", showBorder: false },
    { sub: "GK", showBorder: false },
    { sub: "JAVA", showBorder: false },
  ]);

  return (
    <>
      <View
        className="flex-row w-full justify-center overflow-hidden"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("playground")}
          className="bg-slate-50 w-1/2"
        >
          <Text className="text-center py-4" style={styles.thick}>
            Start Math Match
          </Text>
        </TouchableOpacity>
        <Text className="text-center py-4 w-1/2" style={styles.thick}>
          Last_Score: 10/12
        </Text>
      </View>
      <View className="w-full my-2">
        <ScrollView horizontal={true}>
          {categories?.map((item, index) => (
            <View
              key={index}
              style={{ width: wp("25%") }}
              className={`p-3 border-b-2 border-white text-slate-950 ${
                item.showBorder && "border-slate-950"
              }`}
            >
              <TouchableOpacity onPress={() => viewCategory(index)}>
                <Text className="text-center" style={styles.reg}>
                  {item.sub}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <ScrollView className="h-full">
        <View className="flex-row flex-wrap justify-evenly items-center" style={{marginBottom: 450}}>
          <View style={{width: wp("40%"), height: hp('30%')}} className='mt-4'>
            <Card isStack={false} num={1} />
          </View>
          <View style={{width: wp("40%"), height: hp('30%')}} className='mt-4'>
            <Card isStack={false} num={1} />
          </View>
          <View style={{width: wp("40%"), height: hp('30%')}} className='mt-4'>
            <Card isStack={false} num={1} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Bottom;
