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
  // console.log('herer', ROOT_URL)
  try {
    const resp = await fetch(ROOT_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    // console.log('past fetch')

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
  // console.log(ROOT_URL);
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
        // console.log(data);
        return data;
      });

    return resp;
  } catch (err) {
    throw new Error(err.message);
    // Alert.alert(err.message);
  }
}

export async function postNewTask(task, token) {
  try {
    const resp = await fetch(`${ROOT_URL}/chore`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await resp.json();
    return data;

  } catch (err) {
    throw new Error(err.message);
    // Alert.alert("Error", err.message);
  }
}

export async function getUsers2(token) {

  // We retrieve the users within the group
  try {
    const resp = await fetch(`${ROOT_URL}/users`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await resp.json();
    return data;
    // const data  = await resp.json();
    // return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getActions2(token) {

  try {
    const resp = await fetch(`${ROOT_URL}/actions`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });


    const data = resp.json();
    return data;
    // actions = await response.json();
    // return JSON.parse(actions.message);
  } catch (err) {
    throw new Error(err.message);
  }
}
// We retrieve actions within the group

export async function getGroups(token) {
  // console.log('GET GROUPS')
  try {
    const resp = await fetch(`${ROOT_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await resp.json();
    return JSON.parse(data.message);
    console.log(response);
    let groups = await response.json();
    return JSON.parse(groups.message);
    return (groups = await response.json());
    //  return JSON.parse(groups.message);
  } catch (err) {
    throw new Error(err);
  }
}

export async function addGroup(token, group) {

  try {
    const resp = await fetch(`${ROOT_URL}/group`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    })

    const data = await resp.json();
    return data;
   
  } catch (err) {
    throw new Error(err.message);
    // Alert.alert("Error", err.message);
    // return {message: err.message};
  }
}

export async function addUserToGroup (token, groupName) {
  try {
    const resp = await fetch(`${ROOT_URL}/group/member`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: groupName})
    })

    const data = await resp.json();
    return data;

  } catch (err) {
    throw new Error(err);
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
      throw new Error(err.message);
      // Alert.alert("Error", err.message);
    }
  }
  

