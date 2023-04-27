export default function NewGroupScreen() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const token = useSelector((state) => state.token);

  async function handlePress() {
    const group = {
      name: groupName,
      description: groupDescription,
    };

    // Add new event to MongoDB
    try {
      const resp = await fetch("http://192.168.0.25:3001/group", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(group),
      });

      const data = await resp.json();
      if (data.message === "Group already exists!")
        Alert.alert("Group already exists!");
      if (data.message.includes("Group succesfully created"))
        Alert.alert(`${groupName} group succesfully created!`);
    } catch (err) {
      Alert.alert("Error", err.message);
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
