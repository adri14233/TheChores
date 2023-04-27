const dispatch = useDispatch();
const navigation = useNavigation();

function onPress(group) {
  dispatch({ type: "SET_GROUP", payload: group });
  navigation.navigate("Leaderboard");
}

const handleNewGroup = () => {
  navigation.navigate("New Group");
};

const handleJoinGroup = () => {
  navigation.navigate("Join Group");
};

const handleAddTask = () => {
  navigation.navigate("Tasks");
};

const handleNewTask = () => {
  navigation.navigate("New Task");
};

const handleRegister = () => {
  navigation.navigate("Register");
};

function handleLogin() {
  navigation.navigate("Login");
}

export default {
  onPress,
  handleJoinGroup,
  handleNewGroup,
  handleAddTask,
  handleNewTask,
  handleRegister,
  handleLogin
};
