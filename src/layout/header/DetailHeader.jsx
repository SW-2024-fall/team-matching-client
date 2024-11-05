import { useNavigation } from '@react-navigation/native';
import BaseHeader from '@layout/header/BaseHeader';
import { Title, GoBackBtn } from './Components';
import { theme } from '@styles/ThemeStyles';

export default function DetailHeader({ title }) {
  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <BaseHeader
      left={<GoBackBtn canGoBack={canGoBack} goBack={goBack} color={'white'} />}
      center={<Title title={title} color={'white'} />}
      right={null}
      backgroundColor={theme.colors.blue.primary}
    />
  );
}
