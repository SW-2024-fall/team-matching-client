import { View, Pressable } from 'react-native';
import { WithLocalSvg } from 'react-native-svg/css';
import backBtnIcon from '@assets/backBtnIcon.svg';
import backBtnIconWhite from '@assets/backBtnIcon_white.svg';
import { theme } from '@styles/ThemeStyles';

export default function GoBackBtn({ canGoBack, goBack, color = theme.colors.grey.primary }) {
  if (canGoBack) {
    return (
      <Pressable
        onPress={() => {
          goBack();
        }}
      >
        {color == theme.colors.grey.primary ? (
          <WithLocalSvg color={color} asset={backBtnIcon} width={24} height={24} />
        ) : (
          <WithLocalSvg color={color} asset={backBtnIconWhite} width={24} height={24} />
        )}
      </Pressable>
    );
  } else {
    return <View />;
  }
}
