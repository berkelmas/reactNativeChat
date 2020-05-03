//import liraries
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigation } from "./navigation/navigations";
import { navigationRef } from "./navigation/RootNavigation";
import { useDispatch } from "react-redux";
import { rebuildUserFromLocalStorage } from "./store/actions/user-actions";

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

// create a component
const MainApp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(rebuildUserFromLocalStorage());
  }, []);

  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <MainNavigation />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

//make this component available to the app
export default MainApp;
