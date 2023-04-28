import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import { styles } from "../App";
import { getLogin } from "./APIService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
 
    const creds = {
      username: email,
      password: password,
    };

    const data = getLogin(creds);

    const token = data.token;

    dispatch({ type: "SET_EMAIL", payload: email });
    dispatch({ type: "SET_PASSWORD", payload: password });
    dispatch({ type: "SET_TOKEN", payload: token });

    navigation.navigate("Groups");
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
