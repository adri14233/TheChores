import { View, TextInput, TouchableOpacity } from "react-native";
import styles from "../App";
import { postGroup } from "./APIService";
export default function NewGroupScreen() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const token = useSelector((state) => state.token);

  async function handlePress() {
    // Add new event to MongoDB
    const group = {
      name: groupName,
      description: groupDescription,
    };
      const data = postGroup(group, token)
    
      if (data.message === "Group already exists!")
        Alert.alert("Group already exists!");
      if (data.message.includes("Group succesfully created"))
        Alert.alert(`${groupName} group succesfully created!`);
   
  }

  return (
    <View style={styles.login.container}>
      <TextInput
        placeholder="Group Name"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
        style={styles.login.input}
      />
      <TextInput
        placeholder="Description"
        value={groupDescription}
        onChangeText={(text) => setGroupDescription(text)}
        style={styles.login.input}
      />
      <TouchableOpacity style={styles.login.button} onPress={handlePress}>
        <Text style={styles.login.buttonText}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
}
