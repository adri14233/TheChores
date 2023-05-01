import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, TouchableOpacity, Text, Alert, ViewStyle, TextStyle } from "react-native";
import { styles } from "../App";
import { registerUser } from "./APIService";

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
  fontSize: 18,
  fontFamily: 'PressStart2P_400Regular',
  textAlign: 'center',
}

const loginButtonStyle: ViewStyle = {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  marginHorizontal: 20,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: '#000',
  // fontFamily: 'PressStart2P_400Regular',
  // fontSize: 16,
  // color: '#000',
  // textTransform: 'uppercase',
}

const loginButtonTextStyle: TextStyle = {
  color: '#ccc',
  fontSize: 20,
  fontFamily: 'PressStart2P_400Regular',
  textAlign: 'center',
}


const RegisterScreen: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
    if (data.message.includes("User succesfully created"))
      Alert.alert(`${firstName} ${lastName} user succesfully created!`);
  }

  function handleLogin() {
    navigation.navigate("Login" as never);
  }

  return (
    <View style={loginContainerStyle}>
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
    </View>
  );
}

export default RegisterScreen;