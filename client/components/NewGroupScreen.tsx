import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, TextInput, TouchableOpacity, Alert, Text, ViewStyle, TextStyle, ImageBackground } from "react-native";
import { addGroup } from "./APIService";

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
  marginLeft: 40,
  marginBottom: 10,
  fontSize: 18,
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

const loginButtonStyle: ViewStyle = {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  marginHorizontal: 80,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: '#000'
}

const loginButtonTextStyle: TextStyle = {
  color: 'black',
  fontSize: 20,
  fontWeight: "900",
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

const imgStyle: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  width: "100%",
  height: "100%",
  marginTop: -100,
};
const NewGroupScreen : React.FC = () => {

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const token = useSelector((state : any) => state.token);

  async function handlePress () {

    const group = {
      name: groupName,
      description: groupDescription
    }

    try {
      const data = await addGroup(token, group);
      if (data.message === 'Group already exists!') Alert.alert('Group already exists!');
      if (data.message.includes('Group succesfully created')) Alert.alert(`${groupName} group succesfully created!`);
    } catch (err : any) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <View style={loginContainerStyle}>
      <ImageBackground
        source={require("../assets/white-bg.jpg")}
        resizeMode="cover"
        style={imgStyle}
      >
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
      </ImageBackground>
    </View>
  );
}

export default NewGroupScreen;