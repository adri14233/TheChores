import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  View,
  ScrollView,
  ViewStyle,
  ImageBackground,
  TextStyle,
} from "react-native";
import { getChores } from "./APIService";
import ChoreButton from "./ChoreButton";

interface IChore {
  name: string;
  value: number;
}

const containerStyle: ViewStyle = {
  backgroundColor: "white",
  height: "100%",
};

const imgBGStyle: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  width: "100%",
  height: "100%",
};

const choresListStyle: TextStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "sans-serif",
  height: "100%",
};
const shadowProps: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 6,
};

const TasksScreen: React.FC = () => {
  const [chores, setChores] = useState([] as unknown as IChore[]);
  const isFocused = useIsFocused();
  const token = useSelector((state: any) => state.token);

  useEffect(() => {
    getChores(token).then((choreList) => setChores(choreList));
  }, [isFocused, token]);

  return (
    <View style={containerStyle}>
      <ImageBackground
        source={require("../assets/wall.jpg")}
        resizeMode="cover"
        style={imgBGStyle}
      >
        <ScrollView>
          <View id="chores-list" style={choresListStyle}>
            {chores.map((chore, index) => (
              <ChoreButton key={index} title={chore.name} value={chore.value} />
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default TasksScreen;
