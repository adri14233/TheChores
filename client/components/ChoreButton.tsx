import { useSelector } from "react-redux";
import { TouchableOpacity, Text, Image } from "react-native";
import { postChore } from "./APIService";
import { styles } from "../App";


type ChoreButtonProps = {
    title: string,
    value: number,
}
const ChoreButton: React.FC<ChoreButtonProps> = ({ title, value = 0 }) => {
  const token = useSelector((state: any) => state.token);
  const group = useSelector((state: any) => state.group);

  async function handlePress() {
    const action = {
      time: new Date().toString(),
      user: token,
      group: group._id,
      chore: title,
      value: value,
    };

    postChore(action, token);
  }

  return (
    <TouchableOpacity style={styles.choreButton2} onPress={() => handlePress()}>
      <Text style={styles.text}>{title}</Text>
      <Image
        source={{
          uri: "https://images.assetsdelivery.com/compings_v2/bldekok/bldekok2108/bldekok210800013.jpg",
        }}
        style={{ width: 20, height: 20, marginLeft: 10 }}
      />
      <Text style={{ fontFamily: "PressStart2P_400Regular" }}>{value}</Text>
    </TouchableOpacity>
  );
}

export default ChoreButton;
