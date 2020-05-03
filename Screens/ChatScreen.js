//import liraries
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  RefreshControl,
  AsyncStorage,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ChatAppLogo from "../assets/images/chat-app-logo.png";
import IcomoonIcon from "../components/Typography/IcomoonIcon";
import { socket } from "../socket/socket";
import { getMessages } from "../services/message-service";

// create a component
const ChatScreen = (props) => {
  const { user, userFullName } = props.route.params;
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.userReducer.user);
  const [messageState, setMessageState] = useState("");
  const [myMessages, setMyMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesLeft, setMessagesLeft] = useState(true);
  const [userTyping, setUserTyping] = useState(false);
  const chatContainer = useRef();

  useEffect(() => {
    socket.on("chat message", async (data) => {
      if (data.sender._id === user || data.sender._id === reduxUser._id) {
        setMyMessages((prev) => [...prev, data]);
        chatContainer.current.scrollToEnd();
        if (data.sender._id === user) {
          const token = await AsyncStorage.getItem("token");
          socket.emit("read message", {
            message: data,
            token: token,
          });
        }
      }
    });

    socket.on("read message", (msg) => {
      setMyMessages((prev) =>
        prev.map((item) => (item._id === msg._id ? msg : item))
      );
    });

    return () => {
      socket.off("chat message");
      socket.off("read message");
    };
  }, [dispatch, reduxUser, user]);

  useEffect(() => {
    setMyMessages([]);
    setCurrentPage(0);
    setMessagesLeft(true);

    socket.on("typing", (writingUserId) => {
      if (writingUserId === user && !userTyping) {
        setUserTyping(true);
        setTimeout(() => {
          setUserTyping(false);
        }, 2000);
      }
    });
    return () => {
      socket.off("typing");
    };
  }, [user]);

  useEffect(() => {
    if (reduxUser && messagesLeft) {
      setMessagesLoading(true);
      getMessages([user, reduxUser._id], currentPage * 5, 5).then((res) => {
        setMessagesLeft(res.data.messagesLeft);
        if (res.data.messagesLeft) {
          setMyMessages((prev) => [...res.data.messages.reverse(), ...prev]);
        }
        setMessagesLoading(false);
      });
    }
  }, [user, reduxUser, currentPage, messagesLeft]);

  const handleSubmit = () => {
    if (messageState !== "") {
      socket.emit("chat message", {
        message: messageState,
        sender: reduxUser._id,
        receiver: user,
      });
      setMessageState("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* HEADER PART */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 50,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <IcomoonIcon name="chevron-left" size={35} color="#484848" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={ChatAppLogo}
              style={{ height: 35, width: 35, resizeMode: "contain" }}
            />
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                color: "#484848",
                paddingLeft: 10,
              }}
            >
              {userFullName}
            </Text>
          </View>
          <View style={{ height: 30, width: 30 }}></View>
        </View>
        {/* CHAT CONTAINER */}
        <FlatList
          ref={chatContainer}
          data={myMessages}
          keyExtractor={(msg) => `${msg._id}`}
          contentContainerStyle={{ paddingHorizontal: 20, marginTop: 30 }}
          refreshControl={
            <RefreshControl
              refreshing={messagesLoading}
              onRefresh={() => {
                if (messagesLeft && !messagesLoading) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
            />
          }
          ListFooterComponent={
            <View style={{ height: 50, width: "100%" }}></View>
          }
          renderItem={({ item: msg }) => (
            <View
              key={msg._id}
              style={{
                backgroundColor: "#FAFAFA",
                padding: 10,
                width: "90%",
                marginBottom: 15,
                ...(msg.sender &&
                  msg.sender._id === reduxUser._id && { marginLeft: "auto" }),
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "#484848",
                  fontSize: 15,
                }}
              >
                {msg.sender && msg.sender.fullName}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-Light",
                  fontSize: 13,
                  color: "#5a5a5a",
                }}
              >
                {msg.message}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                {reduxUser._id === msg.sender._id ? (
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 12,
                      color: "#767676",
                    }}
                  >
                    {msg.readBy.length > 0 ? "Read" : "Unread"}
                  </Text>
                ) : (
                  <View style={{ height: 10 }} />
                )}

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 12,
                    color: "#767676",
                  }}
                >
                  02 Aug 2020
                </Text>
              </View>
            </View>
          )}
        ></FlatList>
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 10,
            paddingBottom: 15,
            backgroundColor: "#f7f7f7",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {userTyping && (
            <Text
              style={{
                position: "absolute",
                top: -30,
                left: 10,
                fontFamily: "Poppins-Light",
                color: "#767676",
                fontSize: 15,
              }}
            >{`${userFullName} is typing...`}</Text>
          )}
          <TextInput
            dense={true}
            style={{
              backgroundColor: "white",
              fontFamily: "Poppins-Light",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 6,
              flex: 10,
              marginRight: 10,
            }}
            value={messageState}
            onChangeText={(text) => setMessageState(text)}
            placeholder="Write Some..."
          />
          <Button
            onPress={handleSubmit}
            dark={true}
            mode="contained"
            style={{
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IcomoonIcon name="paper-plane" size={20} color="white" />
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

//make this component available to the app
export default ChatScreen;
