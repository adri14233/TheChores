import { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { View, TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { styles } from "../App";
import { getGroups } from "./APIService";

interface IGroup {
  _id: number,
  name: string
}

const groupsScreenContainerStyle : ViewStyle = {
  flex: 1,
  backgroundColor: '#303030',
  padding: 20,
  // fontFamily: 'PressStart2P_400Regular',
}

const groupsScreenGroupContainerStyle : ViewStyle = {
  backgroundColor: '#FFF',
  borderRadius: 8,
  marginBottom: 20,
  paddingVertical: 16,
  paddingHorizontal: 16,
  // fontFamily: 'PressStart2P_400Regular',
}

const groupsScreenGroupTitleStyle : TextStyle = {
  color: '#000',
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: 'PressStart2P_400Regular',
}

const groupsScreenLoginButton2 : ViewStyle = {
  backgroundColor: '#f3b78c',
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  marginHorizontal: 20,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: '#000',
  // fontFamily: 'PressStart2P_400Regular',
  // fontSize: 16,
  // color: '#000',
  // textTransform: 'uppercase',
}

const groupsScreenLoginButtonText2 : TextStyle = {
  color: '#303030',
  fontSize: 20,
  fontFamily: 'PressStart2P_400Regular',
  textAlign: 'center',
}

const GroupsScreen: React.FC = () => {

  const [groups, setGroups] = useState([] as unknown as IGroup []);
  const isFocused = useIsFocused();
  const token = useSelector((state: any) => state.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    handleLoad();
  }, [isFocused, token]);

  async function handleLoad() {
    await getGroups(token)
      .then(res => setGroups(res));
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

  return (<>
    <View style={groupsScreenContainerStyle}>
      {groups.map((group) => (
        <TouchableOpacity
          key={group._id}
          style={groupsScreenGroupContainerStyle}
          onPress={() => onPress(group)}
        >
          <Text style={groupsScreenGroupTitleStyle}>{group.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.aux}>
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
  </>)
}

export default GroupsScreen;