import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getActions, getUsers } from "./APIService";
import { View, Text, TouchableOpacity, ViewStyle, TextStyle, ImageBackground } from "react-native";

const LeaderboardScreen = () => {
  const token = useSelector((state: any) => state.token);
  const group = useSelector((state: any) => state.group);
  let [users, setUsers] = useState([] as unknown as user[]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    handleLoad(token).then((usersList) => setUsers(usersList));
  }, [isFocused, token]);

  async function handleLoad(token: string) {
    let usersData: any;
    let actions;

    try {
      usersData = await getUsers(token);
      usersData = JSON.parse(usersData.message);
      usersData = usersData.filter((user: any) => group.members.includes(user._id));
    } catch (err: any) {
      throw new Error(err.message);
    }

    try {
      actions = await getActions(token);
      actions = JSON.parse(actions.message);
      actions = actions.filter((action: any) => group._id === action.group);
    } catch (err: any) {
      throw new Error(err.message);
    }

    // We calculate the score for each user
    for (let i = 0; i < usersData.length; i++) {
      const userActions = actions.filter(
        (action: any) => action.user === usersData[i]._id
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
    usersData.sort((a: any, b: any) => b.score - a.score);

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

  const handleGroupGoals = () => {
    navigation.navigate('Group Goals' as never);
  };


  const containerStyle: ViewStyle = {
    flex: 1,
  };

const leaderboardButtonsStyle: ViewStyle = {
  backgroundColor: "black",
  flex: 0,
  flexDirection: 'row',
  justifyContent: "center"
}

  const rowStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    
    backgroundColor: 'lightgrey'
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

  const nameStyle: TextStyle = {
    width: "50%",
    fontSize: 18,
    color: "pink",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  };

  const scoreStyle: TextStyle = {
    width: "40%",
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  };

  const buttonStyle: TextStyle = {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000",
    fontFamily: "sans-serif",
    fontSize: 16,
    color: "#000",
    textTransform: "uppercase",
  };

  const buttonTextStyle: TextStyle = {
    color: "black",
    fontSize: 20,
    fontWeight: "900",
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
    <>
      <View style={containerStyle}>
        <ImageBackground
          source={require("../assets/wall.jpg")}
          resizeMode="cover"
          style={imgStyle}
        >
          {users.map((user, index) => (
            <View key={user._id} style={[rowStyle, shadowProps]}>
              <Text
                style={[nameStyle, { color: index === 0 ? "black" : "blue" }]}
              >
                {user.firstName}
              </Text>
              <Text style={scoreStyle}>Score:</Text>
              <Text style={scoreStyle}>{user.score}</Text>
            </View>
          ))}
        </ImageBackground>
      </View>
      <View style={leaderboardButtonsStyle}>
        <TouchableOpacity style={buttonStyle} onPress={() => handleAddTask()}>
          <Text style={buttonTextStyle}>ADD TASK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle} onPress={() => handleNewTask()}>
          <Text style={buttonTextStyle}>CREATE TASK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle} onPress={() => handleGroupGoals()}>
          <Text style={buttonTextStyle}>GOALS</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default LeaderboardScreen;