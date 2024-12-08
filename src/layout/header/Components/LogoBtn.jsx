import { Pressable } from 'react-native';
import { WithLocalSvg } from 'react-native-svg/css';
import logo from '@assets/logo.svg';
import { useNavigation } from '@react-navigation/native';
import { PAGES } from '../../../navigation/constant';

export default function LogoBtn() {
  const navigation = useNavigation();

  const goHome = () => {
    navigation.navigate(PAGES.MAIN);
  }

  return (
    <Pressable onPress={() => goHome()}>
      <WithLocalSvg asset={logo} width={111} height={18} />
    </Pressable>
  );
}
