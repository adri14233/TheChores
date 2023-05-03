import { StatusBar } from 'expo-status-bar';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from 'react-redux';
import { legacy_createStore } from 'redux';
import loginReducer from './reducer';
let store = legacy_createStore(loginReducer);

/* COMPONENTS */
import LoginScreen from './components/LoginScreen.tsx';
import RegisterScreen from './components/RegisterScreen.tsx';
import NewTaskScreen from './components/NewTaskScreen.tsx';
import GroupsScreen from './components/GroupsScreen.tsx';
import LeaderboardScreen from './components/LeaderboardScreen.tsx';
import JoinGroupScreen from './components/JoinGroupScreen.tsx';
import TasksScreen from './components/TasksScreen.tsx';
import NewGroupScreen from './components/NewGroupScreen.tsx';


export default function App() {

  const Stack = createStackNavigator();
  // const [fontsLoaded] = useFonts({ sans-serif});

  // if (!fontsLoaded) return null;

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
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
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
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
              },
            }}
          />
          <Stack.Screen
            name="Tasks" 
            component={TasksScreen} 
            options={{
              title: 'CHORES',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
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
                backgroundColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
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
                backgroundColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
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
                backgroundColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
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
                backgroundColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
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
                backgroundColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
              },
            }}
          />
        </Stack.Navigator>
        <StatusBar style="light" backgroundColor="blue"/>
      </NavigationContainer>
    </Provider>
  );
}