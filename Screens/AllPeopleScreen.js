//import liraries
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ChatAppLogo from "../assets/images/chat-app-logo.png";
import IcomoonIcon from "../components/Typography/IcomoonIcon";

// create a component
const AllPeopleScreen = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        <TouchableOpacity>
          <IcomoonIcon name="align-right" size={35} color="#484848" />
        </TouchableOpacity>
        <Image
          source={ChatAppLogo}
          style={{ height: 45, width: 45, resizeMode: "contain" }}
        />
        <View style={{ height: 30, width: 30 }}></View>
      </View>
      <Text
        style={{
          fontFamily: "Poppins-Regular",
          fontSize: 22,
          color: "#3f91f7",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        People To Chat
      </Text>
      {Array(5)
        .fill(0)
        .map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderBottomColor: "#d1d1d1",
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity
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
                  BE
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Poppins-Light",
                  fontSize: 20,
                  paddingLeft: 15,
                  color: "#5d5d5d",
                }}
              >
                Berk Elmas
              </Text>
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
});

//make this component available to the app
export default AllPeopleScreen;
