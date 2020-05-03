import axios from "axios";
import { AsyncStorage } from "react-native";
import { config } from "../config";

export const getMessages = async (users, skip, limit) => {
  const token = await AsyncStorage.getItem("token");
  return axios.post(
    `${config.apiUrl}get-messages`,
    {
      users,
      skip,
      limit,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getUnreadMessageCount = async () => {
  const token = await AsyncStorage.getItem("token");
  return axios.get(`${config.apiUrl}unread-messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
