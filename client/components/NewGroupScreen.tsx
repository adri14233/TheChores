import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, TextInput, TouchableOpacity, Alert, Text, ViewStyle, TextStyle } from "react-native";
import { addGroup, addUserToGroup } from "./APIService";
import { useNavigation } from "@react-navigation/native";

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
  borderColor: '#000'
}

const loginButtonTextStyle: TextStyle = {
  color: '#ccc',
  fontSize: 20,
  fontFamily: 'PressStart2P_400Regular',
  textAlign: 'center',
}

const NewGroupScreen : React.FC = () => {

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const token = useSelector((state : any) => state.token);
  const navigation = useNavigation();

  async function handlePress () {

    const group = {
      name: groupName,
      description: groupDescription
    }

    try {
      const data = await addGroup(token, group);
      if (data.message === 'Group already exists!') Alert.alert('Group already exists!');
      if (data.message.includes('Group succesfully created')) {
        await addUserToGroup(token, groupName);
        Alert.alert(`${groupName} group succesfully created!`);
      }
      navigation.navigate('Groups' as never);
    } catch (err : any) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <View style={loginContainerStyle}>
      <TextInput
        placeholder="Group Name"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
        style={loginInputStyle}
      />
      <TextInput
        placeholder="Description"
        value={groupDescription}
        onChangeText={(text) => setGroupDescription(text)}
        style={loginInputStyle}
      />
      <TouchableOpacity style={loginButtonStyle} onPress={handlePress}>
        <Text style={loginButtonTextStyle}>Create Group</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NewGroupScreen;