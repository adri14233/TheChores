import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { View, ImageBackground, TextInput, TouchableOpacity, Text, Alert, ViewStyle, TextStyle } from "react-native";
import { registerUser, getLogin } from "./APIService";
import { useDispatch } from "react-redux";

const loginContainerStyle: ViewStyle = {
  flex: 1,
  backgroundColor: '#303030',
  justifyContent: 'center',
  alignItems: 'center',
}

const loginInputStyle: TextStyle = {
  width: '80%',
  padding: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  backgroundColor: '#eee',
  borderRadius: 5,
  marginBottom: 10,
  marginLeft: 40,
  fontSize: 18,
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

const loginButtonStyle: ViewStyle = {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  marginHorizontal: 80,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,

  borderColor: '#000',


}

const loginButtonTextStyle: TextStyle = {
  color: "black",
  fontSize: 20,
  fontWeight: "900",
  fontFamily: "sans-serif",
  textAlign: "center",
};
  const imgStyle: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    marginTop: -100,
  };


const RegisterScreen: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function handleRegister() {
    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    const data = await registerUser(user);

    if (data.message === "User already exists!")
      Alert.alert("User already exists!");
    if (data.message.includes("User succesfully created")) {
      Alert.alert(`${firstName} ${lastName} user succesfully created!`);
      await autoLogIn(email, password);
    }
  }

  function handleLogin() {
    navigation.navigate("Login" as never);
  }

  const autoLogIn = async (email : string, password : string) => {
    const creds = {
      username: email,
      password: password
    };

    try {
      const data = await getLogin(creds);
      const token = data.token;
      dispatch({ type: "SET_EMAIL", payload: email });
      dispatch({ type: "SET_PASSWORD", payload: password });
      dispatch({ type: "SET_TOKEN", payload: token });
      navigation.navigate("Groups" as never);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <View style={loginContainerStyle}>
      <ImageBackground
        source={require("../assets/bg-front.jpg")}
        resizeMode="cover"
        style={imgStyle}
      >
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={loginInputStyle}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={loginInputStyle}
        />
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={loginInputStyle}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={loginInputStyle}
        />
        <TouchableOpacity style={loginButtonStyle} onPress={handleRegister}>
          <Text style={loginButtonTextStyle}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={loginButtonStyle} onPress={handleLogin}>
          <Text style={loginButtonTextStyle}>LOGIN</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default RegisterScreen;