import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ViewStyle,
  Alert,
  TextStyle,
} from "react-native";
import { postGoal } from "./APIService";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const NewGoalScreen: React.FC = () => {
  const [goalName, setGoalName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("");
  const navigation = useNavigation();
  const token = useSelector((state: any) => state.token);

  async function handlePress() {
      const goal = {
          name: goalName,
          description: description,
          frequency: frequency,
          member: memberName,
        };
        
      
    try {
      const data = await postGoal(goal, token);

      if (data.message.includes("Goal succesfully created!")) {
        Alert.alert(`${goalName} goal succesfully created!`);
        navigation.navigate("User Goal Details" as never);
      }
    } catch (error: any) {
      throw new Error(error.message);
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
    marginLeft: 40,
    fontSize: 18,
    fontFamily: "sans-serif",
    textAlign: "center",
  };

  const buttonsStyle: TextStyle = {
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
    color: "#000",
    textTransform: "uppercase",
  };
  const buttonTestStyle: TextStyle = {
    color: "black",
    fontWeight: "900",
    fontSize: 20,
    fontFamily: "sans-serif",
    textAlign: "center",
  };

  const imgStyle: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  };

  return (
    <View style={containerStyle}>
      <ImageBackground
        source={require("../assets/white-bg.jpg")}
        resizeMode="cover"
        style={imgStyle}
      >
        <TextInput
          placeholder="Member Name"
          value={memberName}
          onChangeText={(text) => setMemberName(text)}
          style={inputStyle}
        ></TextInput>
        <TextInput
          placeholder="Goal Name"
          value={goalName}
          onChangeText={(text) => setGoalName(text)}
          style={inputStyle}
        ></TextInput>
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={inputStyle}
        ></TextInput>
        <TextInput
          placeholder="how often?"
          value={frequency}
          style={inputStyle}
          keyboardType="numeric"
          onChangeText={(text) => setFrequency(text)}
        ></TextInput>
        <TouchableOpacity style={buttonsStyle} onPress={handlePress}>
          <Text style={buttonTestStyle}>Create Goal</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default NewGoalScreen;
