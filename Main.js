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
import { useDispatch, useSelector } from "react-redux";
import {
  rebuildUserFromLocalStorage,
  reconnectSocket,
} from "./store/actions/user-actions";
import { socket } from "./socket/socket";

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

    socket.on("disconnect", () => {
      console.log("Connection Status", socket.connected);
      socket.connect();
    });

    socket.on("connect", () => {
      dispatch(reconnectSocket());
      console.log("Connection Status", socket.connected);
    });

    socket.on("reconnecting", (attemptNumber) => {
      console.log(attemptNumber + " reconnecting... ");
    });
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
