const ROOT_URL = "http://10.10.22.64:3001" | "http://10.10.22.63:3001";

/* ACTIONS */

export async function postAction(action, token) {
  try {
    return (resp = await fetch(`${ROOT_URL}:3001/action`, {
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
    }).then((resp) => resp.json());

    if (!response.ok) {
      throw new Error("Failed to get token");
    }
    return resp;
    // const data = await resp.json();
  } catch (err) {
    throw new Error(err.message);
  }
}
