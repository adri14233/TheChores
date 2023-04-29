import { MY_URL } from "../SECURE";
const ROOT_URL = MY_URL;
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
  console.log('herer', ROOT_URL)
  try {
    const resp = await fetch(ROOT_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    console.log('past fetch')

    if (!resp.ok) {
      throw new Error("Failed to get token");
    }
    const data = await resp.json();
    console.log('apisercive:', data)
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

export async function postNewTask(task, token) {
  try {
    return (resp = await fetch(`${ROOT_URL}/chore`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then((res) => res.json));
  } catch (err) {
    Alert.alert("Error", err.message);
  }
}

export async function getUsers(token) {
  let usersData;

  // We retrieve the users within the group
  try {
    const response = await fetch(`${ROOT_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    usersData = await response.json();
    return JSON.parse(usersData.message);
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getActions() {
  let actions;
  try {
    const response = await fetch(`${ROOT_URL}/actions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    actions = await response.json();
    return JSON.parse(actions.message);
  } catch (err) {
    throw new Error(err.message);
  }
}
// We retrieve actions within the group

export async function getGroups(token) {
  try {
    const response = await fetch(`${ROOT_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return (groups = await response.json());
    //  return JSON.parse(groups.message);
  } catch (err) {
    throw new Error(err);
  }
}

export async function addGroup(token, groupName) {

  try {
    const resp = await fetch(`${ROOT_URL}/group/member`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: groupName }),
    }).then(res => res.json());
   
    return resp;
  } catch (err) {
    Alert.alert("Error", err.message);
    return {message: err.message};
  }
}


     

export async function getChores(token) {
 
    try {
      const response = await fetch(`${ROOT_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get chores");
      }

      let chores = await response.json();
      chores = JSON.parse(chores.message);
      return chores;
    } catch (err) {
      throw new Error(err);
    }
  }

  export async function postChore(action, token) {
    try {
      const resp = await fetch(`${ROOT_URL}/action`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action),
      });

      const data = await resp.json();
      if (data.message.includes("Action succesfully saved"))
        Alert.alert("Chore succesfully added!");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }
  

