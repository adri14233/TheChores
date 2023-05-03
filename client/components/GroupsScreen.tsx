import { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import {
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ImageBackground,
} from "react-native";
import { getGroups } from "./APIService";

interface IGroup {
  _id: number;
  name: string;
}


const groupsScreenContainerStyle: ViewStyle = {
  flex: 1,
};

const groupsScreenGroupContainerStyle: ViewStyle = {
  backgroundColor: "white",
  borderRadius: 20,
  marginHorizontal: 20,
  marginBottom: 10,
  paddingVertical: 16,

  paddingHorizontal: 16,
};


const groupsScreenGroupTitleStyle: TextStyle = {
  color: "#000",
  fontSize: 18,
  fontWeight: "bold",
};

const groupsScreenLoginButton2: ViewStyle = {
  backgroundColor: "white",
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  marginHorizontal: 20,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,

  borderColor: "#000",
};


const groupsScreenLoginButtonText2: TextStyle = {
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

const BottomStyle: ViewStyle = {
  backgroundColor: "black",
  flex: 0,
  flexDirection: "row",
  alignItems: "center",
};

const GroupsScreen: React.FC = () => {
  const [groups, setGroups] = useState([] as unknown as IGroup[]);
  const isFocused = useIsFocused();
  const token = useSelector((state: any) => state.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    handleLoad();
  }, [isFocused, token]);

  async function handleLoad() {
    await getGroups(token).then((res) => setGroups(res));
  }

  function onPress(group: any) {
    dispatch({ type: "SET_GROUP", payload: group });
    navigation.navigate("Leaderboard" as never);
  }

  const handleNewGroup = () => {
    navigation.navigate("New Group" as never);
  };

  const handleJoinGroup = () => {
    navigation.navigate("Join Group" as never);
  };

  return (
    <>
      <View style={groupsScreenContainerStyle}>
        <ImageBackground
          source={require("../assets/white-bg.jpg")}
          resizeMode="cover"
          style={imgStyle}
        >
          {groups.map((group) => (
            <TouchableOpacity
              key={group._id}
              style={[groupsScreenGroupContainerStyle, shadowProps]}
              onPress={() => onPress(group)}
            >
              <Text style={groupsScreenGroupTitleStyle}>{group.name}</Text>
            </TouchableOpacity>
          ))}
        </ImageBackground>
      </View>
      <View style={BottomStyle}>
        <TouchableOpacity
          style={groupsScreenLoginButton2}
          onPress={() => handleJoinGroup()}
        >
          <Text style={groupsScreenLoginButtonText2}>JOIN GROUP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={groupsScreenLoginButton2}
          onPress={() => handleNewGroup()}
        >
          <Text style={groupsScreenLoginButtonText2}>CREATE GROUP</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};


export default GroupsScreen;
