import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  PlusIcon,
  UserIcon,
  Squares2X2Icon,
  PuzzlePieceIcon,
} from "react-native-heroicons/outline";
import { styles } from "../../theme/style";

const Footer = ({ isAuth, isAdmin }) => {
  // console.log(isAdmin);
  const navigation = useNavigation();
  return isAuth ? (
    <View className="py-3 flex-row justify-evenly items-center">
      <TouchableOpacity onPress={() => navigation.navigate("playground")}>
        <PuzzlePieceIcon color={"rgba(0,0,0,0.7)"} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("create")}
        className="rounded-full bg-slate-50 p-1"
      >
        <PlusIcon color={"rgba(0,0,0,0.7)"} size={30} />
      </TouchableOpacity>
      {isAdmin && (
        <TouchableOpacity onPress={() => navigation.navigate("dashboard")}>
          <Squares2X2Icon color={"rgba(0,0,0,0.7)"} size={25} />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <UserIcon color={"rgba(0,0,0,0.7)"} size={25} />
      </TouchableOpacity>
    </View>
  ) : (
    <View className="flex-row justify-evenly bg-slate-100">
      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        className="h-14 w-1/2 flex justify-center items-center"
      >
        <Text style={styles.thick}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("signup")}
        className="h-14 w-1/2 flex justify-center items-center"
      >
        <Text style={styles.thick}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
