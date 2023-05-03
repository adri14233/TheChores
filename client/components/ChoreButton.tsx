import { useSelector } from "react-redux";
import { TouchableOpacity, Text, Image, ViewStyle, TextStyle } from "react-native";
import { postChore } from "./APIService";
import { useNavigation } from "@react-navigation/native";

type ChoreButtonProps = {
    title: string,
    value: number,
}

const choreButton2Style : ViewStyle = {
  flex: 1,
  width: '80%',
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  marginHorizontal: 20,
  alignItems: 'center',
  justifyContent: 'space-evenly',
  borderWidth: 2,
  borderColor: '#000'
}

const choreButtonTextStyle : TextStyle = {
  width: '70%',
  textAlign: 'left',
  fontFamily: 'PressStart2P_400Regular',
  fontSize: 12,
  color: '#303030'
}

const ChoreButton: React.FC<ChoreButtonProps> = ({ title, value = 0 }) => {

  const token = useSelector((state: any) => state.token);
  const group = useSelector((state: any) => state.group);
  const navigation = useNavigation();

  async function handlePress() {
    const action = {
      time: new Date().toString(),
      user: token,
      group: group._id,
      chore: title,
      value: value,
    };

    postChore(action, token);
    navigation.navigate('Leaderboard' as never);
  }

  return (
    <TouchableOpacity style={choreButton2Style} onPress={() => handlePress()}>
      <Text style={choreButtonTextStyle}>{title}</Text>
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
