import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { NavigationContainer, useNavigation, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import loginReducer from './reducer';

let store = createStore(loginReducer);

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

      navigation.navigate("Groups");
    } catch(err) {
      Alert.alert("Invalid email or password.");
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

  async function handleRegister () {
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
        body: JSON.stringify(user)
      });

      const data = await resp.json();
      if (data.message === "User already exists!") Alert.alert("User already exists!");
      if (data.message.includes('User succesfully created')) Alert.alert(`${firstName} ${lastName} user succesfully created!`);
    } catch(err) {
      Alert.alert(err.message);
    }
  };

  function handleLogin () {
    navigation.navigate("Login");
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
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={styles.login.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={styles.login.input}
      />
      <TouchableOpacity style={styles.login.button} onPress={handleRegister}>
        <Text style={styles.login.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.login.button} onPress={handleLogin}>
        <Text style={styles.login.buttonText}>LOGIN</Text>
      </TouchableOpacity>
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

function NewTaskScreen () {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskValue, setTaskValue] = useState("");
  const token = useSelector(state => state.token);

  async function handlePress () {
    const task = {
      name: taskName,
      description: taskDescription,
      value: taskValue
    }

    // Add new task to MongoDB
    try {
      const resp = await fetch('http://192.168.0.25:3001/chore', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify(task)
      })

      const data = await resp.json();
      if (data.message === 'Chore already exists!') Alert.alert('Chore already exists!');
      if (data.message.includes('Chore succesfully created')) Alert.alert(`${taskName} task succesfully created!`);
    } catch(err) {
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

function NewGroupScreen () {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const token = useSelector(state => state.token);

  async function handlePress () {
    const group = {
      name: groupName,
      description: groupDescription
    }

    // Add new event to MongoDB
    try {
      const resp = await fetch('http://192.168.0.25:3001/group', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify(group)
      });

      const data = await resp.json();
      if (data.message === 'Group already exists!') Alert.alert('Group already exists!');
      if (data.message.includes('Group succesfully created')) Alert.alert(`${groupName} group succesfully created!`);
    } catch(err) {
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

function JoinGroupScreen () {
  const [groupName, setGroupName] = useState("");
  const token = useSelector(state => state.token);

  async function handlePress () {
    
    // Add user to group in MongoDB
    try {
      const resp = await fetch(`http://192.168.0.25:3001/group/member`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify({'name': groupName})
      });

      const data = await resp.json();

      if (data.message === 'Group does not exist!') {
        Alert.alert("Error: Group does not exist!");
      } else if (data.message === 'User already in group!') {
        Alert.alert("Error: User already in group!");
      } else if (data.message.includes('succesfully added to Group')) {
        Alert.alert("User added to the group!");
      } else {
        throw new Error(data.message);
      }

    } catch(err) {
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
      <TouchableOpacity style={styles.login.button} onPress={handlePress}>
        <Text style={styles.login.buttonText}>Join Group</Text>
      </TouchableOpacity>
    </View>
  );
}

function LeaderboardScreen () {
  const token = useSelector(state => state.token);
  const group = useSelector(state => state.group);
  let [users, setUsers] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    getUsers('http://192.168.0.25:3001/users', token).then(usersList => setUsers(usersList));
  }, [isFocused, token]);

  async function getUsers (url, token) {
    try {
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`
      }});

      let users = await response.json();
      users = JSON.parse(users.message);
      return users;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  const handleAddTask = () => {
    navigation.navigate("Tasks");
  };

  const handleNewTask = () => {
    navigation.navigate("New Task");
  };

  // For now we want only the first group of the user
  users = users.filter(user => group.members.includes(user._id));

  return (
    <>
    <View style={styles.leaderBoardScreen.container}>
    {users.map((user, index) => (
      <View key={user._id} style={styles.leaderBoardScreen.row}>
        <Text style={[styles.leaderBoardScreen.name, { color: index === 0 ? '#FFD700' : '#FFFFFF' }]}>
          {user.firstName}
        </Text>
        <Text style={styles.leaderBoardScreen.score}>Score: {0}</Text>
      </View>
    ))}
    </View>
    <View style={styles.aux}>
        <TouchableOpacity
          style={styles.login.button2}
          onPress={() => handleAddTask()}
        >
          <Text style={styles.login.buttonText2}>ADD TASK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.login.button2}
          onPress={() => handleNewTask()}
        >
          <Text style={styles.login.buttonText2}>NEW TASK</Text>
        </TouchableOpacity>
    </View>
    </>

  );
}

function GroupsScreen () {
  const [groups, setGroups] = useState([]);
  const isFocused = useIsFocused();
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getGroups('http://192.168.0.25:3001/groups', token).then(groupList => setGroups(groupList));
  }, [isFocused, token]);

  async function getGroups (url, token) {
    try {
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`
      }});

      let groups = await response.json();
      groups = JSON.parse(groups.message);
      return groups;
    } catch (err) {
      throw new Error(err);
    }
  }

  function onPress (group) {
    dispatch({type: 'SET_GROUP', payload: group});
    navigation.navigate("Leaderboard");
  }

  const handleNewGroup = () => {
    navigation.navigate("New Group");
  };

  const handleJoinGroup = () => {
    navigation.navigate("Join Group");
  };

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
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'THE CHORES',
              headerRight: null,
              headerStyle: {
                backgroundColor: '#f77b4d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'PressStart2P_400Regular'
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: 'NEW USER',
              headerRight: null,
              headerStyle: {
                backgroundColor: '#f77b4d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'PressStart2P_400Regular'
              },
            }}
          />
          <Stack.Screen
            name="Tasks" 
            component={TasksScreen} 
            options={{
              title: 'CHORES',
              headerStyle: {
                backgroundColor: '#f77b4d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'PressStart2P_400Regular'
              },
            }}
          />
          <Stack.Screen
            name='New Task'
            component={NewTaskScreen}
            options={{
              title: 'NEW TASK',
              headerRight: null,
              headerStyle: {
                backgroundColor: '#f77b4d'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'PressStart2P_400Regular',
                textAlign: 'center'
              },
            }}
          />
          <Stack.Screen 
            name='Leaderboard'
            component={LeaderboardScreen}
            options={{
              title: 'LEADERBOARD',
              headerStyle: {
                backgroundColor: '#f77b4d'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'PressStart2P_400Regular'
              },
            }}
          />
          <Stack.Screen
            name='Groups'
            component={GroupsScreen}
            options={{
              title: 'YOUR GROUPS',
              headerLeft: null, // Remove the back button
              headerStyle: {
                backgroundColor: '#f77b4d'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'PressStart2P_400Regular'
              },
            }}
          />
          <Stack.Screen
            name='New Group'
            component={NewGroupScreen}
            options={{
              title: 'NEW GROUP',
              headerRight: null,
              headerStyle: {
                backgroundColor: '#f77b4d'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'PressStart2P_400Regular'
              },
            }}
          />
          <Stack.Screen
            name='Join Group'
            component={JoinGroupScreen}
            options={{
              title: 'JOIN GROUP',
              headerRight: null,
              headerStyle: {
                backgroundColor: '#f77b4d'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'PressStart2P_400Regular'
              },
            }}
          />
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
    width: '70%',
    textAlign: 'left',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    color: '#303030', // white color
  },
  choreButton: {
    flex: 1,
    width: '15%',
    backgroundColor: '#f3b78c',
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
  choreButton2: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
      backgroundColor: '#303030',
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
    button2: {
      backgroundColor: '#f3b78c',
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
    },
    buttonText2: {
      color: '#303030',
      fontSize: 20,
      fontFamily: 'PressStart2P_400Regular',
      textAlign: 'center',
    }
  },
  leaderBoardScreen: {
    container: {
      flex: 1,
      backgroundColor: '#303030',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 10,
      fontFamily: 'PressStart2P_400Regular',
      textTransform: 'uppercase',
      letterSpacing: 2,
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'PressStart2P_400Regular',
    },
    score: {
      fontSize: 18,
      color: '#FFD700',
      fontWeight: 'bold',
      fontFamily: 'PressStart2P_400Regular',
    }
  },
  groupsScreen: {
    container: {
      flex: 1,
      backgroundColor: '#303030',
      padding: 20,
      fontFamily: 'PressStart2P_400Regular',
    },
    title: {
      color: '#FFF',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'PressStart2P_400Regular',
    },
    groupContainer: {
      backgroundColor: '#FFF',
      borderRadius: 8,
      marginBottom: 20,
      paddingVertical: 16,
      paddingHorizontal: 16,
      fontFamily: 'PressStart2P_400Regular',
    },
    groupTitle: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'PressStart2P_400Regular',
    },
  },
  aux: {
    backgroundColor: '#303030',
    padding: 20,
    fontFamily: 'PressStart2P_400Regular',
  }
});
