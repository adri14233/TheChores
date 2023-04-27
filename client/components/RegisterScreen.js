import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { handleLogin } from "./Navigation";
export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigation = useNavigation();

  async function handleRegister() {
    const user = {
      email,
      password,
      firstName,
      lastName,
    };

    // Add new user to MongoDB
    try {
      const resp = await fetch("http://192.168.0.25:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await resp.json();
      if (data.message === "User already exists!")
        Alert.alert("User already exists!");
      if (data.message.includes("User succesfully created"))
        Alert.alert(`${firstName} ${lastName} user succesfully created!`);
    } catch (err) {
      Alert.alert(err.message);
    }
  }


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
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={styles.login.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={styles.login.input}
      />
      <TouchableOpacity style={styles.login.button} onPress={handleRegister}>
        <Text style={styles.login.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.login.button} onPress={handleLogin}>
        <Text style={styles.login.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}