import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { NavigationContainer, useNavigation, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import loginReducer from './reducer';

let store = createStore(loginReducer);

function ChoreButton({ title }) {
  return (
    <TouchableOpacity style={styles.choreButton} >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

function NewTaskButtonHeader() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("New Task");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>New Task</Text>
    </TouchableOpacity>
  );
}

function LeaderboardButtonHeader() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Leaderboard");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>Leaderboard</Text>
    </TouchableOpacity>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const creds = {
        username: email,
        password: password
      };

      const response = await fetch('http://192.168.0.25:3001/login', {
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(creds)
      });

      if (!response.ok) {
        throw new Error('Failed to get token');
      }

      const data = await response.json();
      const token = data.token;

      dispatch({type: 'SET_EMAIL', payload: email});
      dispatch({type: 'SET_PASSWORD', payload: password});
      dispatch({type: 'SET_TOKEN', payload: token});

      navigation.navigate("Tasks");
    } catch(err) {
      console.log(err);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.login.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.login.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.login.input}
      />
      <TouchableOpacity style={styles.login.button} onPress={handleLogin}>
        <Text style={styles.login.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.login.button} onPress={handleRegister}>
        <Text style={styles.login.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigation = useNavigation();

  async function handlePress () {
    const user = {
      email,
      password,
      firstName,
      lastName
    }

    // Add new user to MongoDB
    try {
      const resp = await fetch('http://192.168.0.25:3001/user', {
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(task)
      })

      if (resp !== 'User already exists!') navigation.navigate("Tasks");
      else {
        // Here we should show some banner
      }

    } catch(err) {
      // Here we should show some banner
      console.log(err)
    }
  }

  return (
    <View >
      <Text>Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <Button title="Register" onPress={handlePress} />
    </View>
  );
}

function TasksScreen () {
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

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View id="chores-list" style={styles.choresList}>
      {chores.map((chore, index) => (
        <ChoreButton key={index} title={chore.name}/>
      ))}
      </View>
    </ScrollView>
  );
}

function NewTaskScreen () {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const navigation = useNavigation();
  const token = useSelector(state => state.token);

  async function handlePress () {
    const task = {
      name: taskName,
      description: taskDescription
    }

    // Add new event to MongoDB
    try {
      await fetch('http://192.168.0.25:3001/chore', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify(task)
      })
    } catch(err) {
      Alert.alert("Error", err.message);
    }

    navigation.navigate("Tasks");
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
        placeholder="Descrition"
        value={taskDescription}
        onChangeText={(text) => setTaskDescription(text)}
        style={styles.login.input}
      />
      <TouchableOpacity style={styles.login.button} onPress={handlePress}>
        <Text style={styles.login.buttonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
}

function LeaderboardScreen () {
  // const [leaderboardMembers, setLeaderboardMembers] = useState([]);
  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   fetch('http://192.168.0.25:3001/chores')
  //   .then(response => response.json())
  //   .then(data => {
  //     setLeaderboardMembers(data);
  //   })
  //   .catch(error => console.error(error))
  // }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      {/* <View id="leaderboard" style={styles.choresList}>
      {leaderboardMembers.map((member, index) => (
        <ChoreButton key={index} title={member.name}/>
      ))}
      </View> */}
      <Text>HERE GOES THE LEADERBOARD</Text>
    </ScrollView>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Tasks" 
            component={TasksScreen} 
            options={{
              title: 'Tasks',
              headerLeft: LeaderboardButtonHeader, // Remove the back button
              headerRight: NewTaskButtonHeader,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name='New Task' component={NewTaskScreen} options={{headerLeft: null}}/>
          <Stack.Screen name='Leaderboard' component={LeaderboardScreen}/>
        </Stack.Navigator>
        <StatusBar style="light" backgroundColor="blue"/>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030'
  },
  choresList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    color: '#303030', // white color
  },
  choreButton: {
    flex: 1,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    color: '#000',
    textTransform: 'uppercase',
  },
  login: {
    container: {
      flex: 1,
      backgroundColor: '#121212',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '80%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#eee',
      borderRadius: 5,
      marginBottom: 10,
      fontSize: 18,
      fontFamily: 'PressStart2P_400Regular',
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#000',
      fontFamily: 'PressStart2P_400Regular',
      fontSize: 16,
      color: '#000',
      textTransform: 'uppercase',
    },
    buttonText: {
      color: '#ccc',
      fontSize: 20,
      fontFamily: 'PressStart2P_400Regular',
      textAlign: 'center',
    }
  }
});
