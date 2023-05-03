import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "./APIService";
import { View, TouchableOpacity, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  score: number;
}

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

  function handlePress() {
  navigation.navigate("New Goal" as never);
  }
  return (
    <>
        {users &&
          users.length > 0 &&
        users.map((user, i) => <Text>{user.firstName}</Text>)}
        <View>
        <TouchableOpacity onPress={handlePress}>
          <Text>Create Goal</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default GroupGoalsScreen;
