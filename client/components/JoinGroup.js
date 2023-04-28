import styles from '../App'
import { postUserToGroup } from './APIService';

export default function JoinGroupScreen() {
  const [groupName, setGroupName] = useState("");
  const token = useSelector((state) => state.token);

  async function handlePress() {
    // Add user to group in MongoDB

    const data = postUserToGroup(groupName, token)

      if (data.message === "Group does not exist!") {
        Alert.alert("Error: Group does not exist!");
      } else if (data.message === "User already in group!") {
        Alert.alert("Error: User already in group!");
      } else if (data.message.includes("succesfully added to Group")) {
        Alert.alert("User added to the group!");
      } else {
        throw new Error(data.message);
      }

  }

  return (
    <View style={styles.login.container}>
      <TextInput
        placeholder="Group Name"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
        style={styles.login.input}
      />
      <TouchableOpacity style={styles.login.button} onPress={handlePress}>
        <Text style={styles.login.buttonText}>Join Group</Text>
      </TouchableOpacity>
    </View>
  );
}
