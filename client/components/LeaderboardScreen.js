export default function LeaderboardScreen() {
  const token = useSelector((state) => state.token);
  const group = useSelector((state) => state.group);
  let [users, setUsers] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    getUsers(token).then((usersList) => setUsers(usersList));
  }, [isFocused, token]);

  //   async function getUsers(token) {
  // let usersData;
  // let actions;

  // // We retrieve the users within the group
  // try {
  //   const response = await fetch("http://192.168.0.25:3001/users", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   usersData = await response.json();
  //   usersData = JSON.parse(usersData.message);
  //   usersData = usersData.filter((user) => group.members.includes(user._id));
  // } catch (err) {
  //   throw new Error(err.message);
  // }

  // // We retrieve actions within the group
  // try {
  //   const response = await fetch("http://192.168.0.25:3001/actions", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   actions = await response.json();
  //   actions = JSON.parse(actions.message);
  //   actions = actions.filter((action) => group._id === action.group);
  // } catch (err) {
  //   throw new Error(err.message);
  // }

    usersData = usersData.filter((user) => group.members.includes(user._id));

  // We calculate the score for each user
  for (let i = 0; i < usersData.length; i++) {
    userActions = actions.filter((action) => action.user === usersData[i]._id);
    let score = 0;

    if (userActions.length > 0) {
      for (let j = 0; j < userActions.length; j++) {
        score += userActions[j].value;
      }
    }

    usersData[i].score = score;
  }

  // We order the users arr of objects by the score
  usersData.sort((a, b) => b.score - a.score);

  return usersData;

  const handleAddTask = () => {
    navigation.navigate("Tasks");
  };

  const handleNewTask = () => {
    navigation.navigate("New Task");
  };

  return (
    <>
      <View style={styles.leaderBoardScreen.container}>
        {users.map((user, index) => (
          <View key={user._id} style={styles.leaderBoardScreen.row}>
            <Text
              style={[
                styles.leaderBoardScreen.name,
                { color: index === 0 ? "#FFD700" : "#FFFFFF" },
              ]}
            >
              {user.firstName}
            </Text>
            <Text style={styles.leaderBoardScreen.score}>Score: </Text>
            <Text style={styles.leaderBoardScreen.score}>{user.score}</Text>
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
