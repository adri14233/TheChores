import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';


const ChoreButton = ({ title }) => {
  return (
    <TouchableOpacity style={styles.button} >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const ListOfChores = () => {
  const [chores, setChores] = useState([]);
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

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


export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>EEEEEE</Text>
      <ListOfChores />
      <StatusBar style="auto" />
    </ScrollView>
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
  }
});
