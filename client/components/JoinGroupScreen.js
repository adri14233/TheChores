const ROOT_URL = "http://10.10.22.53:3001";

import { useState } from "react";
import { useSelector } from "react-redux";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { styles } from "../App";
import { addGroup } from "./APIService";

export default function JoinGroupScreen() {
  const [groupName, setGroupName] = useState("");
  const token = useSelector((state) => state.token);

  async function handlePress() {
    try {
     
      const data = await addGroup(token, groupName);
    
      if (data.message === "Group does not exist!") {
        Alert.alert("Error: Group does not exist!");
      } else if (data.message === "User already in group!") {
        Alert.alert("Error: User already in group!");
      } else if (data.message === "succesfully added to Group") {
        Alert.alert("User added to the group!");
      } else {
        throw new Error(data.message);
      }
      return resp;
    } catch (err) {
      Alert.alert("Error", err.message);
      return { message: err.message };
    }
  }

  return (
    <View style={styles.login.container}>
      <TextInput
        placeholder="Group Name"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
        style={styles.login.input}
      />
      <TouchableOpacity style={styles.login.button} onPress={handlePress}>
        <Text style={styles.login.buttonText}>Join Group</Text>
      </TouchableOpacity>
    </View>
  );
}
