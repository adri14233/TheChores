import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "./APIService";

interface IGoal {
  _id: string,
  name: string,
  frequency: number
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

const UserGoalsScreen: React.FC = () => {

  const [goals, setGoals] = useState([] as unknown as IGoal[]);
  const isFocused = useIsFocused();
  const token = useSelector((state: any) => state.token);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    handleLoad();
  }, [isFocused, token]);

  async function handleLoad() {
    await getGoals(token, user).then((res) => setGoals(res));
  }

  function handleGoalDetails() {
    navigation.navigate('User Goal Details' as never);
  }

  return <>
    <View style={[{ gap: 10, paddingTop: 20 }]}>
      {goals.map((goal, index) => (
        <TouchableOpacity
          key={goal._id}
          style={[rowStyle, shadowProps]}
          onPress={() => handleGoalDetails()}
        >
          <Text
            style={[nameStyle, { color: "black"}]}
          >
            {goal.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </>
}

export default UserGoalsScreen;