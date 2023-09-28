import Main from "./src/Navigation/Main";
import { useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    montReg: require("./assets/fonts/montserrat/Montserrat-Regular.ttf"),
    montBold: require("./assets/fonts/montserrat/Montserrat-Bold.ttf"),
    montXbold: require("./assets/fonts/montserrat/Montserrat-ExtraBold.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaView onLayout={handleOnLayout} className="flex-1">
        <StatusBar backgroundColor="#242424" style="light" />
        <Main />
        <Toast />
      </SafeAreaView>
    </Provider>
  );
}
