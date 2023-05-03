import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
  Alert,
  ViewStyle,
  TextStyle,
} from "react-native";
import { postNewTask } from "./APIService";

const NewTaskScreen: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskValue, setTaskValue] = useState("");
  const token = useSelector((state: any) => state.token);

  async function handlePress() {
    const task = {
      name: taskName,
      description: taskDescription,
      value: taskValue,
    };

    try {
      const data = await postNewTask(task, token);

      if (data.message === "Chore already exists!")
        Alert.alert("Chore already exists!");
      if (data.message.includes("Chore succesfully created"))
        Alert.alert(`${taskName} task succesfully created!`);
    } catch (err: any) {
      throw new Error(err.message);
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
      marginTop: -100,
    };

  return (
    <View style={containerStyle}>
      <ImageBackground
        source={require("../assets/white-bg.jpg")}
        resizeMode="cover"
        style={imgStyle}
      >
        <TextInput
          placeholder="Task Name"
          value={taskName}
          onChangeText={(text) => setTaskName(text)}
          style={inputStyle}
        />
        <TextInput
          placeholder="Description"
          value={taskDescription}
          onChangeText={(text) => setTaskDescription(text)}
          style={inputStyle}
        />
        <TextInput
          placeholder="Value points of this task"
          value={taskValue}
          onChangeText={(text) => setTaskValue(text)}
          style={inputStyle}
        />
        <TouchableOpacity style={buttonsStyle} onPress={handlePress}>
          <Text style={buttonTestStyle}>Create Task</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default NewTaskScreen;
