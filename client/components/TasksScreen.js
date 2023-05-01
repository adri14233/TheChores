import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { styles } from "../App";
import { View, ScrollView } from "react-native";
import { getChores } from "./APIService";
import ChoreButton from "./ChoreButton";

export default function TasksScreen() {
  const [chores, setChores] = useState([]);
  const isFocused = useIsFocused();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    getChores(token).then((choreList) => setChores(choreList));
  }, [isFocused, token]);


  return (
    <ScrollView style={styles.container}>
      <View id="chores-list" style={styles.choresList}>
        {chores.map((chore, index) => (
          <ChoreButton key={index} title={chore.name} value={chore.value} />
        ))}
      </View>
    </ScrollView>
  );
}
