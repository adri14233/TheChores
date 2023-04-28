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

export async function getLogin (credentials) {
  
}