//import liraries
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import ChatAppLogo from "../assets/images/chat-app-logo.png";
import IcomoonIcon from "../components/Typography/IcomoonIcon";

// create a component
const ChatScreen = (props) => {
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
              Emre Kara
            </Text>
          </View>
          <View style={{ height: 30, width: 30 }}></View>
        </View>
        {/* CHAT CONTAINER */}
        <ScrollView
          contentContainerStyle={{ marginTop: 30, paddingHorizontal: 20 }}
        >
          {Array(10)
            .fill(0)
            .map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#FAFAFA",
                  padding: 10,
                  width: "90%",
                  marginBottom: 15,
                  ...(index % 2 === 0 && { marginLeft: "auto" }),
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    color: "#484848",
                    fontSize: 15,
                  }}
                >
                  Berk Elmas
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins-Light",
                    fontSize: 13,
                    color: "#5a5a5a",
                  }}
                >
                  Example Text Message Example Text Message Example Text Message
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 12,
                      color: "#767676",
                    }}
                  >
                    Read
                  </Text>
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
            ))}
        </ScrollView>
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
          }}
        >
          <TextInput
            dense={true}
            style={{
              backgroundColor: "white",
              fontFamily: "Poppins-Light",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 6,
            }}
            placeholder="Write Some..."
          />
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
