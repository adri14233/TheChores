import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  TextStyle,
  ViewStyle,
} from "react-native";
import { styles } from "../App";
import { getLogin } from "./APIService";

const LoginScreen: React.FC = () => {
     const [fontsLoaded] = useFonts({
       PressStart2P_400Regular,
     });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    const creds = {
      username: email,
      password: password,
    };
    try {
      const data = await getLogin(creds);
      const token = data.token;
      dispatch({ type: "SET_EMAIL", payload: email });
      dispatch({ type: "SET_PASSWORD", payload: password });
      dispatch({ type: "SET_TOKEN", payload: token });
      navigation.navigate("Groups" as never)
    } catch (err) {
        console.log("error", err);
    }
    
   
};

const handleRegister = () => {
    navigation.navigate("Register" as never);
};
const buttonTextStyle: TextStyle = {
  color: "#ccc",
  fontSize: 20,
  fontFamily: "PressStart2P_400Regular",
  textAlign: "center",
};

const containerStyle: TextStyle = {
  flex: 1,
  backgroundColor: "#303030",
  justifyContent: "center",
  alignItems: "center",
};

const inputStyle: TextStyle = {
  width: "80%",
  padding: 10,
  borderWidth: 1,
  borderColor: "#ccc",
  backgroundColor: "#eee",
  borderRadius: 5,
  marginBottom: 10,
  fontSize: 18,
  fontFamily: "PressStart2P_400Regular",
  textAlign: "center",
};

const buttonStye: TextStyle = {
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  marginHorizontal: 20,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderColor: "#000",
  fontFamily: "PressStart2P_400Regular",
  fontSize: 16,
  color: "#000",
  textTransform: "uppercase",
};

  return (
    <View style={containerStyle}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={inputStyle}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={inputStyle}
      />
      <TouchableOpacity style={buttonStye} onPress={handleLogin}>
        <Text style={buttonTextStyle}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={buttonStye} onPress={handleRegister}>
        <Text style={buttonTextStyle}>REGISTER</Text>
      </TouchableOpacity>
      <StatusBar barStyle="default" />
    </View>
  );

}

export default LoginScreen