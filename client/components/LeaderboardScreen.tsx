import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getActions2, getUsers2 } from "./APIService";
import { styles } from "../App";
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";

export default function LeaderboardScreen() {
  const token = useSelector((state:any) => state.token);
  const group = useSelector((state:any) => state.group);
  let [users, setUsers] = useState([] as unknown as user[]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    getUsers(token).then((usersList) => setUsers(usersList));
  }, [isFocused, token]);

  async function getUsers(token:string) {
    let usersData: any;
    let actions;

    try {
      usersData = await getUsers2(token);
      usersData = JSON.parse(usersData.message);
      usersData = usersData.filter((user:any) => group.members.includes(user._id));
    } catch (err:any) {
      throw new Error(err.message);
    }

    try {
      actions = await getActions2(token);
      actions = JSON.parse(actions.message);
      actions = actions.filter((action:any) => group._id === action.group);
    } catch (err:any) {
      throw new Error(err.message);
    }

    // We calculate the score for each user
    for (let i = 0; i < usersData.length; i++) {
      const userActions = actions.filter(
        (action:any) => action.user === usersData[i]._id
      );
      let score = 0;

      if (userActions.length > 0) {
          for (let j = 0; j < userActions.length; j++) {
              score += userActions[j].value;
            }
        }
        
        usersData[i].score = score;
    }
    
    // We order the users arr of objects by the score
    usersData.sort((a:any, b:any) => b.score - a.score);
    
    return usersData;
}

interface user {
  _id: string;
  firstName: string;
  lastName: string;
  score: number;
}

  const handleAddTask = () => {
    navigation.navigate("Tasks" as never);
  };

  const handleNewTask = () => {
    navigation.navigate("New Task" as never);
  };


const containerStyle: ViewStyle = {
  flex: 1,
  backgroundColor: "#303030",
  padding: 20,
};

const rowStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 10,
};

const nameStyle: TextStyle = {
  width: "53%",
  fontSize: 18,
  fontWeight: "bold",
  fontFamily: "PressStart2P_400Regular",
};

const scoreStyle: TextStyle = {
  width: "40%",
  fontSize: 18,
  color: "#FFD700",
  fontWeight: "bold",
  fontFamily: "PressStart2P_400Regular",
};

const buttonStyle: TextStyle = {
  backgroundColor: "#f3b78c",
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  marginHorizontal: 20,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderColor: "#000",
  fontFamily: "PressStart2P_400Regular",
  fontSize: 16,
  color: "#000",
  textTransform: "uppercase",
};

const buttonTextStyle: TextStyle = {
  color: "#303030",
  fontSize: 20,
  fontFamily: "PressStart2P_400Regular",
  textAlign: "center",
};

  return (
    <>
      <View style={containerStyle}>
        {users.map((user, index) => (
          <View key={user._id} style={rowStyle}>
            <Text
              style={[
                nameStyle,
                { color: index === 0 ? "#FFD700" : "#FFFFFF" },
              ]}
            >
              {user.firstName}
            </Text>
            <Text style={scoreStyle}>Score: </Text>
            <Text style={scoreStyle}>{user.score}</Text>
          </View>
        ))}
      </View>
      <View style={styles.aux}>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => handleAddTask()}
        >
          <Text style={buttonTextStyle}>ADD TASK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => handleNewTask()}
        >
          <Text style={buttonTextStyle}>NEW TASK</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
