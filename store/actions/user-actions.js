import { AsyncStorage } from "react-native";
import { socket } from "../../socket/socket";
import { loginService, verifyJWT } from "../../services/user-service";
import {
  success_login,
  renew_online_users,
  no_action,
  logout,
} from "../types/user-types";
import * as RootNavigation from "../../navigation/RootNavigation";

export const loginAction = ({ username, password }) => {
  console.log(username);
  return (dispatch) => {
    loginService(username, password)
      .then((res) => {
        const userData = res.data;
        const token = userData.token;
        const user = userData.user;

        socket.emit("register user socketid", user._id.toString());
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("user", JSON.stringify(user));

        dispatch({ type: success_login, payload: user });
        RootNavigation.navigate("AllPeople");
      })
      .catch((err) => {
        dispatch({ type: no_action });
        console.log(err);
      });
  };
};

export const rebuildUserFromLocalStorage = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const user = await AsyncStorage.getItem("user");
    if (token) {
      verifyJWT(token)
        .then((res) => {
          const parsedUser = JSON.parse(user);
          socket.emit("register user socketid", parsedUser._id);
          dispatch({ type: success_login, payload: parsedUser });
          RootNavigation.navigate("AllPeople");
        })
        .catch((err) => {
          dispatch({ type: logout });
          socket.emit("logout user");
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("user");
        });
    }
    dispatch({ type: logout });
  };
};

export const setOnlineUsersAction = (onlineUsers) => {
  return { type: renew_online_users, payload: onlineUsers };
};

export const logoutAction = () => {
  return (dispatch) => {
    socket.emit("logout user");
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("user");
    dispatch({ type: logout });
  };
};
