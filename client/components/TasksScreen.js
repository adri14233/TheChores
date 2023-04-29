import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { ScrollView, View, TouchableOpacity, Text, Image } from "react-native";

function ChoreButton({ title, value=0 }) {
  const token = useSelector(state => state.token);
  const group = useSelector(state => state.group);

  async function handlePress () {
    const action = {
      time: new Date().toString(),
      user: token,
      group: group._id,
      chore: title,
      value: value
    }

    // Add new action to MongoDB
    try {
      const resp = await fetch('http://192.168.0.25:3001/action', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action)
      });

      const data = await resp.json();
      if (data.message.includes('Action succesfully saved')) Alert.alert("Chore succesfully added!");
    } catch(err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <TouchableOpacity style={styles.choreButton2} onPress={handlePress}>
        <Text style={styles.text}>{title}</Text>
        <Image
          source={{uri: 'https://images.assetsdelivery.com/compings_v2/bldekok/bldekok2108/bldekok210800013.jpg'}}
          style={{ width: 20, height: 20, marginLeft: 10 }}
        />
        <Text style={{fontFamily: 'PressStart2P_400Regular'}}>{value}</Text>
    </TouchableOpacity>
  );
}

export default function TasksScreen () {
  const [chores, setChores] = useState([]);
  const isFocused = useIsFocused();
  const token = useSelector(state => state.token);

  useEffect(() => {
    getChores('http://192.168.0.25:3001/chores', token).then(choreList => setChores(choreList));
  }, [isFocused, token]);

  async function getChores (url, token) {
    try {
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`
      }});

      if (!response.ok) {
        throw new Error('Failed to get chores');
      }

      let chores = await response.json();
      chores = JSON.parse(chores.message)
      return chores;
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View id="chores-list" style={styles.choresList}>
      {chores.map((chore, index) => (
        <ChoreButton key={index} title={chore.name} value={chore.value}/>
      ))}
      </View>
    </ScrollView>
  );
}