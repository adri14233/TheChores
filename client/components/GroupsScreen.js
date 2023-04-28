import { View, TouchableOpacity, Text } from "react-native";
import { onPress, handleNewGroup, handleJoinGroup } from "./Navigation";
import styles from '../App'

export default function GroupsScreen() {
  const [groups, setGroups] = useState([]);
  const isFocused = useIsFocused();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    getGroups("http://192.168.0.25:3001/groups", token).then((groupList) =>
      setGroups(groupList)
    );
  }, [isFocused, token]);

  async function getGroups(url, token) {
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let groups = await response.json();
      groups = JSON.parse(groups.message);
      return groups;
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <>
      <View style={styles.groupsScreen.container}>
        {groups.map((group) => (
          <TouchableOpacity
            key={group._id}
            style={styles.groupsScreen.groupContainer}
            onPress={() => onPress(group)}
          >
            <Text style={styles.groupsScreen.groupTitle}>{group.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.aux}>
        <TouchableOpacity
          style={styles.login.button2}
          onPress={() => handleJoinGroup()}
        >
          <Text style={styles.login.buttonText2}>JOIN GROUP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.login.button2}
          onPress={() => handleNewGroup()}
        >
          <Text style={styles.login.buttonText2}>CREATE GROUP</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
