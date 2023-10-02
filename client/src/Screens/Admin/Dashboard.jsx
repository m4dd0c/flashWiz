import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../store/actions/adminAction";
import LoadingScreen from "../LoadingScreen";
import { TableComponent } from "../../Components/admin/TableComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../theme/style";
import { formatMe } from "../../api/api";

const Dashboard = () => {
  const dispatch = useDispatch();
  //state
  const { loading } = useSelector((state) => state.auth);
  const { loading: adminLoading, users } = useSelector((state) => state.admin);
  const isLoading = loading || adminLoading;
  const [adminCount, setAdminCount] = useState(0);

  //admin count
  useEffect(() => {
    if (users) {
      users.forEach((element) => {
        let count = 0;
        if (element.role === "admin") count++;
        setAdminCount(count);
      });
    }
  }, [users]);

  //fetch cards
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <SafeAreaView className="bg-white flex-1 px-1">
      <Text style={styles.title} className="my-7 mx-4">
        Dashboard
      </Text>
      <Text
        className="text-center text-lg uppercase pt-10"
        style={styles.thick}
      >
        Manage users
      </Text>
      <TableComponent users={users}/>
      <View className="p-6">
        <Text
          className="uppercase text-center text-lg py-1"
          style={styles.thick}
        >
          FlashWiz - Stats
        </Text>
        <View className="flex-row justify-evenly items-center">
          <View className="bg-blue-50 w-1/2 p-4 rounded-xl m-4">
            <Text className="text-center uppercase py-1" style={styles.thick}>
              Total users
            </Text>
            <Text className="text-center py-2" style={styles.thick}>
              {formatMe(users?.length) ?? "XX"} Current
            </Text>
          </View>
          <View className="bg-pink-50 w-1/2 p-4 rounded-xl m-4">
            <Text className="text-center uppercase py-1" style={styles.thick}>
              Total Admin
            </Text>
            <Text className="text-center py-2" style={styles.thick}>
              {formatMe(adminCount)} Current
            </Text>
          </View>
        </View>
        <View className="mt-20">
          <View className="mx-auto">
            <Text style={styles.thick}>
              Created At: &nbsp; October, 02, 2023
            </Text>
            <Text style={styles.thick}>
              Created By: &nbsp; Manish Suthar AKA m4dd0x_
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
