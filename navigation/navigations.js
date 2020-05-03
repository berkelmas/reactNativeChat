import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../Screens/LoginScreen";
import AllPeopleScreen from "../Screens/AllPeopleScreen";
import ChatScreen from "../Screens/ChatScreen";
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
    <Stack.Screen
      options={{ headerShown: false }}
      name="Chat"
      component={ChatScreen}
    />
  </Stack.Navigator>
);

export default MainNavigation;
