const ROOT_URL = "http://10.10.22.53:3001";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ViewStyle,
  TextStyle,
} from "react-native";
import { styles } from "../App";
import { addUserToGroup } from "./APIService";

export default function JoinGroupScreen() {
  const [groupName, setGroupName] = useState("");
  const token = useSelector((state: any) => state.token);

  async function handlePress() {
    try {
      const data = await addUserToGroup(token, groupName);

      if (data.message.includes("Group does not exist!")) {
        Alert.alert("Error: Group does not exist!");
      } else if (data.message.includes("User already in group!")) {
        Alert.alert("Error: User already in group!");
      } else if (data.message.includes("succesfully added to Group")) {
        Alert.alert("User added to the group!");
      } else {
        throw new Error(data.message);
      }
    } catch (err:any) {
      Alert.alert("Error", err.message);
      return { message: err.message };
    }
  }

  const containerStyle: ViewStyle = {
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

  const buttonTextStyle: TextStyle = {
    color: "#ccc",
    fontSize: 20,
    fontFamily: "PressStart2P_400Regular",
    textAlign: "center",
  };

  const buttonStyle: TextStyle = {
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
        placeholder="Group Name"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
        style={inputStyle}
      />
      <TouchableOpacity style={buttonStyle} onPress={handlePress}>
        <Text style={buttonTextStyle}>Join Group</Text>
      </TouchableOpacity>
    </View>
  );
}
