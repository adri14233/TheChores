import React, { useState, useEffect } from "react";
import {
  View,
  ViewStyle,
  TextStyle,
  ImageBackground,
  Text,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getGoals } from "./APIService";

interface IGoal {
  name: string;
}

interface goalProps {
  title: string;
}

const UserGoalDetails: React.FC<goalProps> = ({ title }) => {
  const [goals, setGoals] = useState([] as unknown as IGoal[]);
  const isFocused = useIsFocused();
  const token = useSelector((state: any) => state.token);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    handleGoalLoad();
  }, [isFocused, token]);

  async function handleGoalLoad() {
    await getGoals(token).then((res) => setGoals(res));
  }

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: "#303030",
    justifyContent: "center",
    alignItems: "center",
  };
  const goalsListStyle: TextStyle = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    height: "100%",
  };
  const imgStyle: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    marginTop: -100,
  };
  return (
    <View style={containerStyle}>
      <ImageBackground
        source={require("../assets/white-bg.jpg")}
        resizeMode="cover"
        style={imgStyle}
      >
          <Text>{title}</Text>
        {/* <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
        /> */}
      </ImageBackground>
    </View>
  );
};

export default UserGoalDetails;
