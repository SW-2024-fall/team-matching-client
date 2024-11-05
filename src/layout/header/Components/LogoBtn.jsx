import { Pressable } from 'react-native';
import { WithLocalSvg } from 'react-native-svg/css';
import logo from '@assets/logo.svg';

export default function LogoBtn({ goHome }) {
  return (
    <Pressable onPress={() => goHome()}>
      <WithLocalSvg asset={logo} width={111} height={18} />
    </Pressable>
  );
}
