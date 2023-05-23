import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
import * as Animatable from 'react-native-animatable'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  TextStyle,
  ViewStyle,
  ImageBackground,
} from "react-native";
import { getLogin } from "./APIService";

const LoginScreen: React.FC = () => {
  // const [fontsLoaded] = useFonts({
  //   Raleway_400Regular,
  // });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
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

  const handleRegister = () => {
    navigation.navigate("Register" as never);
  };

  const containerStyle: TextStyle = {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  };
  const buttonTextStyle: TextStyle = {
    color: "black",
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "sans-serif",
    textAlign: "center",
  };

  const inputStyle: TextStyle = {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 40,
    fontSize: 18,
    fontFamily: "sans-serif",
    textAlign: "center",
  };

  const buttonStye: TextStyle = {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 80,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000",
    fontFamily: "sans-serif",
    fontSize: 16,
    textTransform: "uppercase",
  };

  const imgStyle: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    marginTop: -100
  };

  const logoStyle: ViewStyle = {
    width: 400,
    height: 300,
    marginBottom: 40,

  };

  return (
    <View style={containerStyle}>
      <ImageBackground
        source={require("../assets/bg-front.jpg")}
        resizeMode="cover"
        style={imgStyle}
      >
        <ImageBackground
          source={require("../assets/logo.png")}
          resizeMode="cover"
          style={logoStyle}
        />
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
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
