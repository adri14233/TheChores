/* ACTIONS */

export async function postAction (action, token) {
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
      // if (data.message.includes('Action succesfully saved')) Alert.alert("Chore succesfully added!");
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getActions (token) {
  try {
    const resp = await fetch('http://192.168.0.25:3001/actions', {
      headers: {
        "Authorization": `Bearer ${token}`
    }});

    actions = await response.json();
    actions = JSON.parse(actions.message);
    actions = actions.filter(action => group._id === action.group);

    //PROBABLY RETURN actions ????

  } catch (err) {
    throw new Error(err.message);
  }
}


/* LOGIN */

export async function getLogin (credentials) {
  try {
    const resp = await fetch('http://192.168.0.25:3001/login', {
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

    // dispatch({type: 'SET_EMAIL', payload: email});
    // dispatch({type: 'SET_PASSWORD', payload: password});
    // dispatch({type: 'SET_TOKEN', payload: token});

    // navigation.navigate("Groups");

  } catch (err) {
    throw new Error(err.message);
  }
}

/* USER */

export async function postUser (user) {
  try {
    const resp = await fetch('http://192.168.0.25:3001/user', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await resp.json();
    // if (data.message === "User already exists!") Alert.alert("User already exists!");
    // if (data.message.includes('User succesfully created')) Alert.alert(`${firstName} ${lastName} user succesfully created!`);

  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUsers (token) {
  try {
    const resp = await fetch('http://192.168.0.25:3001/users', {
      headers: {
        "Authorization": `Bearer ${token}`
    }});

    usersData = await response.json();
    usersData = JSON.parse(usersData.message);
    usersData = usersData.filter(user => group.members.includes(user._id));

    //PROBABLY RETURN usersData ????

  } catch (err) {
    throw new Error(err.message);
  }
}

/* CHORES */

export async function getChores () {
  try {
    const resp = await fetch('http://192.168.0.25:3001/chores', {
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
    throw new Error(err.message);
  }
}

export async function postChore (chore, token) {
  try {
    const resp = await fetch('http://192.168.0.25:3001/chore', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify(chore)
    });

    const data = await resp.json();
    // if (data.message === 'Chore already exists!') Alert.alert('Chore already exists!');
    // if (data.message.includes('Chore succesfully created')) Alert.alert(`${taskName} task succesfully created!`);

  } catch (err) {
    throw new Error(err.message);
  }
}

/* GROUPS */

export async function postGroup (group, token) {
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
    // if (data.message === 'Group already exists!') Alert.alert('Group already exists!');
    // if (data.message.includes('Group succesfully created')) Alert.alert(`${groupName} group succesfully created!`);

  } catch (err) {
    throw new Error(err.message);
  }
}

export async function postUserToGroup (groupName, token) {
  try {
    const resp = await fetch(`http://192.168.0.25:3001/group/member`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({'name': groupName})
    });

    // if (data.message === 'Group does not exist!') {
    //   Alert.alert("Error: Group does not exist!");
    // } else if (data.message === 'User already in group!') {
    //   Alert.alert("Error: User already in group!");
    // } else if (data.message.includes('succesfully added to Group')) {
    //   Alert.alert("User added to the group!");
    // } else {
    //   throw new Error(data.message);
    // }

  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getGroups (token) {
  try {
    const resp = await fecth('http://192.168.0.25:3001/groups', {
      headers: {
        "Authorization": `Bearer ${token}`
    }});

    let groups = await response.json();
    groups = JSON.parse(groups.message);
    return groups;

  } catch (err) {
    throw new Error(err.message);
  }
}