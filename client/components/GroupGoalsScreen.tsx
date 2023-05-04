import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "./APIService";
import { View, TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  score: number;
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

  backgroundColor: "lightgrey",
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
 const buttonTestStyle: TextStyle = {
   color: "black",
   fontWeight: "900",
   fontSize: 20,
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

const GroupGoalsScreen: React.FC = () => {
  const token = useSelector((state: any) => state.token);
  const group = useSelector((state: any) => state.group);
  let [users, setUsers] = useState([] as unknown as IUser[]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    handleLoad(token).then((usersList) => setUsers(usersList));
  }, [isFocused, token]);

  async function handleLoad(token: string) {
    let usersData: any;

    try {
      usersData = await getUsers(token);
      usersData = JSON.parse(usersData.message);
      usersData = usersData.filter((user: any) =>
        group.members.includes(user._id)
      );
    } catch (err: any) {
      throw new Error(err.message);
    }

    usersData.sort((a: any, b: any) => a.firstName - b.firstName);
    return usersData;
  }


  function handleNewGoal () {
    navigation.navigate("New Goal" as never);
  }

  function handleUserGoals () {
    navigation.navigate("User Goals" as never);
  }


  return (
    <>
      <View style={[{ gap: 10, paddingTop: 20 }]}>
        {users.map((user, index) => (
          <TouchableOpacity
            key={user._id}
            style={[rowStyle, shadowProps]}
            onPress={() => handleUserGoals()}
          >
            <Text
              style={[nameStyle, { color: index === 0 ? "black" : "blue" }]}
            >
              {user.firstName}
            </Text>
          </TouchableOpacity>
        ))}
        <View></View>
        <TouchableOpacity style={buttonsStyle} onPress={() => handleNewGoal()}>
          <Text style={buttonTestStyle}>Create Goal</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default GroupGoalsScreen;
