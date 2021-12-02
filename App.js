import React from "react";
import { Provider } from "react-redux";
import HomeStack from "./stack/HomeStack";
import store from "./redux/store";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

LogBox.ignoreAllLogs();
export default function App() {
  let [fontsLoaded] = useFonts({
    "Inter-Black": require("./pages/Lobster-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <HomeStack>
          <StatusBar style="light" translucent={false} />
        </HomeStack>
      </Provider>
    );
  }
}
