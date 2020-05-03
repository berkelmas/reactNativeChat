//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ChatAppLogo from "../assets/images/chat-app-logo.png";
import { TextInput, Button } from "react-native-paper";

// create a component
const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          source={ChatAppLogo}
          style={{ height: 120, width: 120, resizeMode: "contain" }}
        />
        <Text style={styles.bigTitle}>Getting Started</Text>
        <Text style={styles.topDescription}>
          Everything you need to start a chat
        </Text>
        <TextInput
          dense={true}
          style={styles.emailInput}
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          dense={true}
          style={styles.passwordInput}
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          mode="contained"
          dark={true}
          onPress={() => props.navigation.navigate("AllPeople")}
        >
          Start Chat
        </Button>
        <Text style={styles.orText}>Or</Text>
        <Text style={styles.bottomText}>
          Request you credentials{" "}
          <Text style={{ color: "#3f91f7" }}>here.</Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 80,
    backgroundColor: "white",
  },
  bigTitle: {
    fontFamily: "Poppins-Regular",
    color: "#3f91f7",
    fontSize: 28,
    paddingTop: 10,
  },
  topDescription: {
    fontFamily: "Poppins-Light",
    color: "#767676",
    fontSize: 15,
    marginBottom: 45,
  },
  emailInput: {
    backgroundColor: "white",
    fontFamily: "Poppins-Light",
    marginBottom: 15,
  },
  passwordInput: {
    backgroundColor: "white",
    fontFamily: "Poppins-Light",
    marginBottom: 30,
  },
  orText: {
    fontFamily: "Poppins-Light",
    color: "#767676",
    fontSize: 15,
    marginBottom: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  bottomText: {
    fontFamily: "Poppins-Light",
    color: "#767676",
    fontSize: 15,
    marginBottom: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
});

//make this component available to the app
export default LoginScreen;
