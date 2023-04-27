import { TextInput, View, TouchableOpacity, Text } from "react-native";

export default function NewTaskScreen() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskValue, setTaskValue] = useState("");
  const token = useSelector((state) => state.token);

  async function handlePress() {
    const task = {
      name: taskName,
      description: taskDescription,
      value: taskValue,
    };

    // Add new task to MongoDB
    try {
      const resp = await fetch("http://192.168.0.25:3001/chore", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await resp.json();
      if (data.message === "Chore already exists!")
        Alert.alert("Chore already exists!");
      if (data.message.includes("Chore succesfully created"))
        Alert.alert(`${taskName} task succesfully created!`);
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <View style={styles.login.container}>
      <TextInput
        placeholder="Task Name"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
        style={styles.login.input}
      />
      <TextInput
        placeholder="Description"
        value={taskDescription}
        onChangeText={(text) => setTaskDescription(text)}
        style={styles.login.input}
      />
      <TextInput
        placeholder="Value points of this task"
        value={taskValue}
        onChangeText={(text) => setTaskValue(text)}
        style={styles.login.input}
      />
      <TouchableOpacity style={styles.login.button} onPress={handlePress}>
        <Text style={styles.login.buttonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
}
