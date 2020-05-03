import axios from "axios";
import { AsyncStorage } from "react-native";
import { config } from "../config";

// export const registerUser = (username) => {
//   return axios.post(`${config.apiUrl}register-user`, { username });
// };

export const getOnlineUsers = () => {
  return axios.get(`${config.apiUrl}get-online-users`);
};

export const loginService = (email, password) => {
  return axios.post(`${config.apiUrl}login`, { email, password });
};

export const verifyJWT = (token) => {
  return axios.get(`${config.apiUrl}protected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllUsers = async (skip, limit) => {
  const token = await AsyncStorage.getItem("token");
  return axios.post(
    `${config.apiUrl}get-all-users`,
    { skip, limit },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
