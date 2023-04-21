import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; 

function ChoreButton({ title }) {
  return (
    <TouchableOpacity style={styles.button} >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

function ListOfChores() {
  const [chores, setChores] = useState([]);
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular
  });

  if (!fontsLoaded) {
    
  }

  useEffect(() => {
    fetch('http://192.168.0.25:3001/chores')
    .then(response => response.json())
    .then(data => {
      setChores(data);
    })
    .catch(error => console.error(error))
  }, []);


  return (
    <View id="chores-list" style={styles.choresList}>
    {chores.map((chore, index) => (
      <ChoreButton key={index} title={chore.name}/>
    ))}
    </View>
  )
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Welcome");
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
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

  const handleRegister = () => {
    navigation.navigate("Welcome");
  };

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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

function WelcomeScreen () {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>EEEEEE</Text>
      <ListOfChores />
    </ScrollView>
  );
}


export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
      <StatusBar style="light" backgroundColor="blue"/>
    </NavigationContainer>

    // <ScrollView style={styles.container}>
    //   <Text style={styles.text}>EEEEEE</Text>
    //   <ListOfChores />
    //   <StatusBar style="auto" />
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030'
  },
  choresList: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 32,
    color: '#303030', // white color
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
  login: {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      width: '80%',
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
    }
  }
});
