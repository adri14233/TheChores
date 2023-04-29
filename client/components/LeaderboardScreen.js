import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getActions, getUsers } from "./APIService";
import { styles } from "../App";
import { View, Text, TouchableOpacity } from "react-native";

export default function LeaderboardScreen() {
  const token = useSelector((state) => state.token);
  const group = useSelector((state) => state.group);
  let [users, setUsers] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
   getUsers(token)
     .then((data) => data.filter((user) => group.members.includes(user._id)))
     .then((usersList) => setUsers(usersList));
}, [isFocused, token]);

const usersData = getUsers(token)
  .then((data) => data.filter((user) => group.members.includes(user._id)))
  .then((usersList) => setUsers(usersList));

    const userActions = getActions().then(data => data.filter((action)=> group._id === action.group))

  // We calculate the score for each user
  for (let i = 0; i < usersData.length; i++) {
    userActions = actions.filter((action) => action.user === usersData[i]._id);
    let score = 0;

    if (userActions.length > 0) {
      for (let j = 0; j < userActions.length; j++) {
        score += userActions[j].value;
      }
    }

    usersData[i].score = score;
  }

  // We order the users arr of objects by the score
  usersData.sort((a, b) => b.score - a.score);

//   return usersData;

  const handleAddTask = () => {
    navigation.navigate("Tasks");
  };

  const handleNewTask = () => {
    navigation.navigate("New Task");
  };

  return (
    <>
      <View style={styles.leaderBoardScreen.container}>
        {users.map((user, index) => (
          <View key={user._id} style={styles.leaderBoardScreen.row}>
            <Text
              style={[
                styles.leaderBoardScreen.name,
                { color: index === 0 ? "#FFD700" : "#FFFFFF" },
              ]}
            >
              {user.firstName}
            </Text>
            <Text style={styles.leaderBoardScreen.score}>Score: </Text>
            <Text style={styles.leaderBoardScreen.score}>{user.score}</Text>
          </View>
        ))}
      </View>
      <View style={styles.aux}>
        <TouchableOpacity
          style={styles.login.button2}
          onPress={() => handleAddTask()}
        >
          <Text style={styles.login.buttonText2}>ADD TASK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.login.button2}
          onPress={() => handleNewTask()}
        >
          <Text style={styles.login.buttonText2}>NEW TASK</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
