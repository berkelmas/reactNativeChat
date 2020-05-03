import React, { useEffect } from "react";
import { StyleSheet, YellowBox, AsyncStorage } from "react-native";
import * as Font from "expo-font";
// REDUX
import { Provider } from "react-redux";
import configureStore from "./store/store-config";
const store = configureStore();
import MainApp from "./Main";
import { socket } from "./socket/socket";

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
]);

export default function App() {
  const [loaded, setLoaded] = React.useState(false);
  useEffect(() => {
    Font.loadAsync({
      "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
      "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
      "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
      Icomoon: require("./assets/fonts/icomoon.ttf"),
    }).then(() => setLoaded(true));

    /// FOR DEVELOPMENT PURPOSES
    AsyncStorage.clear();
  }, []);

  return (
    loaded && (
      <Provider store={store}>
        <MainApp />
      </Provider>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
