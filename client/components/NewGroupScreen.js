import { styles } from "../App";
import { useState } from "react";
import { useSelector } from "react-redux";
import { View, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import { addGroup } from "./APIService";

export default function NewGroupScreen () {

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const token = useSelector((state) => state.token);

  async function handlePress () {

    const group = {
      name: groupName,
      description: groupDescription
    }

    console.log('CREATING GROUP, ', token)

    try {
      const data = await addGroup(token, group);
      console.log('DATA: ', data)
      if (data.message === 'Group already exists!') Alert.alert('Group already exists!');
      if (data.message.includes('Group succesfully created')) Alert.alert(`${groupName} group succesfully created!`);
    } catch (err) {
      Alert.alert("Error", err.message);
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
      <TextInput
        placeholder="Description"
        value={groupDescription}
        onChangeText={(text) => setGroupDescription(text)}
        style={styles.login.input}
      />
      <TouchableOpacity style={styles.login.button} onPress={handlePress}>
        <Text style={styles.login.buttonText}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
}