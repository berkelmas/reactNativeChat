import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigation } from "./navigation/navigations";

const fontConfig = {
  default: {
    regular: {
      fontFamily: "Poppins-Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Poppins-Medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Poppins-Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Poppins-Thin",
      fontWeight: "normal",
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3f91f7",
    accent: "#3f91f7",
  },
  fonts: configureFonts(fontConfig),
};

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
    // AsyncStorage.clear();
  }, []);

  return (
    loaded && (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PaperProvider>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
