import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "./APIService";

interface IGoal {
  name: string,
  frequency: number
}

const UserGoalsScreen : React.FC = () => {

  const [goals, setGoals] = useState([] as unknown as IGoal[]);
  const isFocused = useIsFocused();
  const token = useSelector((state: any) => state.token);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    handleLoad();
  }, [isFocused, token]);

  async function handleLoad () {
    await getGoals(token, user).then((res) => setGoals(res));
  }

  return <>
    {goals.map((goal) => (
      <Text>{goal.name}</Text>
    ))}
  </>
}

export default UserGoalsScreen;