import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Playground from "../Screens/Playground";
import Profile from "../Screens/Profile/Profile";
import CreateCard from "../Screens/Profile/CreateCard";
import CameraScr from "../Screens/CameraScr";
import Login from "../Screens/Auth/Login";
import Signup from "../Screens/Auth/Signup";
import EditProfile from "../Screens/Profile/EditProfile";
import Forget from "../Screens/Auth/Forget";
import Reset from "../Screens/Auth/Reset";
import Contact from "../Screens/Contact";
import Dashboard from "../Screens/Admin/Dashboard";
import Footer from "../Components/Layout/Footer";
import DangerZone from "../Screens/Auth/DangerZone";
import Verify from "../Screens/Auth/Verify";
import Card from "../Components/shared/Card";
import CardStack from "../Components/shared/CardStack";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/actions/authAction";

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  // getting data if logged_in
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  // getting data from store
  const { user, isAuth } = useSelector((state) => state.auth);
  // setting admin
  useEffect(() => {
    if (isAuth) {
      user.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
    }
  }, [isAuth]);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isAuth ? "profile" : "login"}
      >
        {isAuth ? (
          <>
            {isAdmin && <Stack.Screen name="dashboard" component={Dashboard} />}
            <Stack.Screen name="playground" component={Playground} />
            <Stack.Screen name="card" component={Card} />
            <Stack.Screen name="stack" component={CardStack} />
            <Stack.Screen name="create" component={CreateCard} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="edit" component={EditProfile} />
            <Stack.Screen name="dangerZone" component={DangerZone} />
            <Stack.Screen name="verify" component={Verify} />
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="reset" component={Reset} />
            <Stack.Screen name="forget" component={Forget} />
          </>
        )}
        <Stack.Screen name="contact" component={Contact} />
        <Stack.Screen name="camera" component={CameraScr} />
      </Stack.Navigator>
      <Footer isAdmin={isAdmin} isAuth={isAuth} />
    </NavigationContainer>
  );
};

export default Main;
