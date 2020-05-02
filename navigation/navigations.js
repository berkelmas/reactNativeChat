import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../Screens/LoginScreen";
const Stack = createStackNavigator();

export const MainNavigation = (props) => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={LoginScreen}
    />
  </Stack.Navigator>
);

export default MainNavigation;
