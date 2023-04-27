import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getChores } from "./APIService";
import { ScrollView, View } from "react-native/types";
import React from "react";



export default function TasksScreen () {
  
  const [chores, setChores] = useState([]);
  const isFocused = useIsFocused();
  // const token = useSelector((state) => state.token);

  useEffect(() => {
    getChores(/* token */)
      .then((choreList) => setChores(choreList));
  }, [isFocused, /* token */]);

  return (
    <ScrollView>
      <View>
        {/* MAP THROUGH CHORES AND DISPLAY THEM */}
      </View>
    </ScrollView>
  )
}