//import liraries
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ChatAppLogo from "../assets/images/chat-app-logo.png";
import IcomoonIcon from "../components/Typography/IcomoonIcon";
import { socket } from "../socket/socket";
import { getAllUsers } from "../services/user-service";
import { useDispatch, useSelector } from "react-redux";
import {
  setOnlineUsersAction,
  logoutAction,
} from "../store/actions/user-actions";
import { getUnreadMessageCount } from "../services/message-service";

// create a component
const AllPeopleScreen = (props) => {
  const dispatch = useDispatch();
  const [availableUsers, setAvailableUsers] = useState([]);
  const onlineUsers = useSelector((state) => state.userReducer.onlineUsers);
  const reduxUser = useSelector((state) => state.userReducer.user);
  const [unreadMessageHash, setUnreadMessageHash] = useState([]);

  useEffect(() => {
    getAllUsers(0, 9999).then((res) => {
      const { users } = res.data;
      if (reduxUser) {
        setAvailableUsers(users.filter((user) => user._id !== reduxUser._id));
      } else {
        setAvailableUsers(users);
      }
    });

    getUnreadMessageCount().then((res) => {
      setUnreadMessageHash(res.data.result);
    });

    socket.on("get online users", (onlineUsers) => {
      dispatch(setOnlineUsersAction(onlineUsers));
    });

    socket.on("unread message count", (data) => {
      setUnreadMessageHash(data);
    });

    return () => {
      socket.off("get online users");
    };
  }, [dispatch, reduxUser]);

  const handleLogout = () => {
    dispatch(logoutAction());
    props.history.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <IcomoonIcon name="align-right" size={35} color="#484848" />
        </TouchableOpacity>
        <Image
          source={ChatAppLogo}
          style={{ height: 45, width: 45, resizeMode: "contain" }}
        />
        <View style={{ height: 30, width: 30 }}></View>
      </View>
      <Text style={styles.mainTitle}>People To Chat</Text>
      {availableUsers.map((user) => (
        <View key={user._id} style={styles.listItemContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Chat")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: "#F4F4F4",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Light",
                  color: "#acacac",
                  fontSize: 18,
                }}
              >
                {user.fullName.split(" ")[0][0] +
                  user.fullName.split(" ")[
                    user.fullName.split(" ").length - 1
                  ][0]}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#3f91f7",
                height: 10,
                width: 10,
                borderRadius: 20,
                marginLeft: 10,
              }}
            />
            <Text
              style={{
                fontFamily: "Poppins-Light",
                fontSize: 20,
                paddingLeft: 15,
                color: "#5d5d5d",
              }}
            >
              {user.fullName}
            </Text>
            <View
              style={{
                backgroundColor: "#3f91f7",
                height: 30,
                width: 30,
                borderRadius: 20,
                marginLeft: "auto",
                borderColor: "#d1d1d1",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins-Regular",
                  fontSize: 18,
                }}
              >
                3
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  mainTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 22,
    color: "#3f91f7",
    marginTop: 20,
    marginBottom: 20,
  },
  listItemContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: "#d1d1d1",
    borderBottomWidth: 1,
  },
});

//make this component available to the app
export default AllPeopleScreen;
