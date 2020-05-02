import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../Screens/LoginScreen";
import AllPeopleScreen from "../Screens/AllPeopleScreen";
const Stack = createStackNavigator();

export const MainNavigation = (props) => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={LoginScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="AllPeople"
      component={AllPeopleScreen}
    />
  </Stack.Navigator>
);

export default MainNavigation;
