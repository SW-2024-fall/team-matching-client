import { View, Pressable } from 'react-native';
import { WithLocalSvg } from 'react-native-svg/css';
import backBtnIcon from '../../../assets/backBtnIcon.svg';
import backBtnIconWhite from '@assets/backBtnIcon_white.svg';
import { theme } from '../../../styles/ThemeStyles';
import { useNavigation } from '@react-navigation/native';

export default function GoBackBtn({ color = theme.colors.grey.primary }) {
  const navigation = useNavigation();

  const goBack = () => {
    console.log("pressed goBack");
    // navigation.goBack();
  }

  const backBtn = color == theme.colors.grey.primary ? backBtnIcon : backBtnIconWhite;

    return (
      <Pressable onPress={() => goBack()}>
          <WithLocalSvg asset={backBtn} width={24} height={24} />
      </Pressable>
    );
}
