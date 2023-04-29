import { MY_URL } from "../SECURE";
const ROOT_URL = MY_URL
import { Alert } from "react-native";


/* ACTIONS */

export async function postAction(action, token) {
  try {
    return (resp = await fetch(`${ROOT_URL}/action`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action),
    }).then((resp) => resp.json()));

    // const data = await resp.json();
    // if (data.message.includes('Action succesfully saved')) Alert.alert("Chore succesfully added!");
  } catch (err) {
    throw new Error(err.message);
  }
}

/* LOGIN */

export async function getLogin(creds) {
  try {
    const resp = await fetch(ROOT_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })

    if (!resp.ok) {
      throw new Error("Failed to get token");
    }
    const data = await resp.json();
    return data;
    // const data = await resp.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function registerUser(user) {
  console.log(ROOT_URL);
  try {
    const resp = fetch(`${ROOT_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      });

    return resp;
  } catch (err) {
    Alert.alert(err.message);
  }
}

export async function postNewTask(task, token){

 try {
      return resp = await fetch(`${ROOT_URL}/chore`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }).then(res => res.json)


      
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }