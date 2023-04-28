import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, TouchableOpacity, Text, StatusBar } from "react-native";
import {styles} from '../App'


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const creds = {
        username: email,
        password: password,
      };

      const response = await fetch("http://192.168.0.25:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });

      if (!response.ok) {
        throw new Error("Failed to get token");
      }

      const data = await response.json();
      const token = data.token;

      dispatch({ type: "SET_EMAIL", payload: email });
      dispatch({ type: "SET_PASSWORD", payload: password });
      dispatch({ type: "SET_TOKEN", payload: token });

      navigation.navigate("Groups");
    } catch (err) {
      Alert.alert("Invalid email or password.");
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.login.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.login.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.login.input}
      />
      <TouchableOpacity style={styles.login.button} onPress={handleLogin}>
        <Text style={styles.login.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.login.button} onPress={handleRegister}>
        <Text style={styles.login.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
