import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ViewStyle,
  Alert
} from "react-native";
import { postGoal } from "./APIService";

const NewGoalScreen: React.FC = () => {
  const [goalName, setGoalName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("");


async function handlePress() {
    const goal = {
        name: goalName,
        description: description,
        frequency: frequency,
        member: memberName
    }
    try {
        const data = await postGoal(goal);
        
        if(data.message.includes("Goal succesfully created!"))
        Alert.alert(`${goalName} goal succesfully created!`)
    } catch (error:any) {
        throw new Error(error.message)
    }
}


  const imgStyle: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  };

  return (
    <View>
      <ImageBackground
        source={require("../assets/white-bg.jpg")}
        resizeMode="cover"
        style={imgStyle}
      >
        <TextInput
          placeholder="Member Name"
          value={memberName}
          onChangeText={(text) => setMemberName(text)}
        ></TextInput>
        <TextInput
          placeholder="Goal Name"
          value={goalName}
          onChangeText={(text) => setGoalName(text)}
        ></TextInput>
        <TextInput
          placeholder="Goal Name"
          value={description}
          onChangeText={(text) => setDescription(text)}
        ></TextInput>
        <TextInput
          placeholder="how often?"
          value={frequency}
          keyboardType="numeric"
          onChangeText={(text) => setFrequency(text)}
        ></TextInput>
        <TouchableOpacity onPress={handlePress}>
          <Text>Create Goal</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default NewGoalScreen;
