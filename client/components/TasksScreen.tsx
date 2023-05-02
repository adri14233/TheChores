import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { View, ScrollView, ViewStyle } from "react-native";
import { getChores } from "./APIService";
import ChoreButton from "./ChoreButton";

interface IChore {
  name: string,
  value: number
}

const containerStyle : ViewStyle = {
  flex: 1,
  backgroundColor: '#303030'
}

const choresListStyle : ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
}

const TasksScreen : React.FC = () => {

  const [chores, setChores] = useState([] as unknown as IChore[]);
  const isFocused = useIsFocused();
  const token = useSelector((state : any) => state.token);

  useEffect(() => {
    getChores(token).then((choreList) => setChores(choreList));
  }, [isFocused, token]);

  return (
    <ScrollView style={containerStyle}>
      <View id="chores-list" style={choresListStyle}>
        {chores.map((chore, index) => (
          <ChoreButton key={index} title={chore.name} value={chore.value} />
        ))}
      </View>
    </ScrollView>
  )
}

export default TasksScreen;