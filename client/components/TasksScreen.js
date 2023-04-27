import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native/lib/typescript/src";
import { useSelector } from "react-redux";

export default function TasksScreen() {
  const [chores, setChores] = useState([]);
  const isFocused = useIsFocused();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    getChores("http://192.168.0.25:3001/chores", token).then((choreList) =>
      setChores(choreList)
    );
  }, [isFocused, token]);

  async function getChores(url, token) {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get chores");
      }

      let chores = await response.json();
      chores = JSON.parse(chores.message);
      return chores;
    } catch (err) {
      throw new Error(err);
    }
  }

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