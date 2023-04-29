import { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../App";
import { getGroups } from "./APIService";

export default function GroupsScreen() {
  const [groups, setGroups] = useState([]);
  const isFocused = useIsFocused();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getGroups(token).then((groupList) => setGroups(groupList));
  }, [isFocused, token]);

  const data = getGroups(token)
    .then((groupList) => setGroups(groupList))
    .then((data) => JSON.parse(data.message));

  function onPress(group) {
    dispatch({ type: "SET_GROUP", payload: group });
    navigation.navigate("Leaderboard");
  }

  const handleNewGroup = () => {
    navigation.navigate("New Group");
  };

  const handleJoinGroup = () => {
    navigation.navigate("Join Group");
  };

  return (
    <>
      <View style={styles.groupsScreen.container}>
        {groups.map((group) => (
          <TouchableOpacity
            key={group._id}
            style={styles.groupsScreen.groupContainer}
            onPress={() => onPress(group)}
          >
            <Text style={styles.groupsScreen.groupTitle}>{group.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.aux}>
        <TouchableOpacity
          style={styles.login.button2}
          onPress={() => handleJoinGroup()}
        >
          <Text style={styles.login.buttonText2}>JOIN GROUP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.login.button2}
          onPress={() => handleNewGroup()}
        >
          <Text style={styles.login.buttonText2}>CREATE GROUP</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
