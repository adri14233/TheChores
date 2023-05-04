import React, { useState, useEffect } from "react";
import {
  View,
  ViewStyle,
  TextStyle,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getGoals } from "./APIService";

interface IGoal {
  name: string;
}

interface goalProps {
  name: string;
  desc: string;
  freq: number
}

const UserGoalDetails: React.FC<goalProps> = ({ name, desc, freq }) => {
  const [goals, setGoals] = useState([] as unknown as IGoal[]);
  const isFocused = useIsFocused();
  const token = useSelector((state: any) => state.token);
  const [isToggled, setIsToggled] = useState(false);
  const [frequency, setFrequency] = useState(Array(freq))
  const [isChecked, setIsChecked] = useState(Array(freq) as Boolean[]);

  useEffect(() => {
    handleGoalLoad();
    frequency.fill(0);
    isChecked.fill(false);
  }, [isFocused, token]);

  async function handleGoalLoad() {
    await getGoals(token).then((res) => setGoals(res));
  }

  const containerStyle: TextStyle = {
    width: "90%",
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#303030",
  };
  const goalsListStyle: TextStyle = {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    fontFamily: "sans-serif",
    fontWeight: "900",
    width: "100%",
    height: "100%",
  };

  const choreButton2Style: ViewStyle = {
    flex: 1,
    width: "90%",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 2,
    borderColor: "#000",
  };

  const row: ViewStyle = {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  };

  const descriptionStyle: ViewStyle = {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "space-between",
  };

  function handleCheck (index: number) {
    let temp = [...isChecked];
    temp[index] = !temp[index];
    setIsChecked([...temp]);
  }

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={choreButton2Style}
        onPress={() => setIsToggled(!isToggled)}
      >
        <Text style={goalsListStyle}>{name}</Text>
        {isToggled && 
        frequency.map((el, index) => (
          <View style={row}>
            <Text style={descriptionStyle}>{desc}</Text>
            <Checkbox
              status={isChecked[index] ? "checked" : "unchecked"}
              onPress={() => handleCheck(index)}
            />
          </View>
        ))}
      </TouchableOpacity>
    </View>
  );
};

export default UserGoalDetails;
