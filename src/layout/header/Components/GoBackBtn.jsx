import { View, Pressable } from 'react-native';
import { WithLocalSvg } from 'react-native-svg/css';
import backBtnIcon from '@assets/backBtnIcon.svg';
import { theme } from '@styles/ThemeStyles';

export default function GoBackBtn({ canGoBack, goBack, color = theme.colors.grey.primary }) {
  if (canGoBack) {
    return (
      <Pressable
        onPress={() => {
          goBack();
        }}
      >
        <WithLocalSvg color={color} asset={backBtnIcon} width={24} height={24} />
      </Pressable>
    );
  } else {
    return <View />;
  }
}
