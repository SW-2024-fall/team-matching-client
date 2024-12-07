import { useNavigation } from '@react-navigation/native';
import { PAGES } from '@navigation/constant';
import BaseHeader from './BaseHeader';
import { LogoBtn, Profile } from './Components';

export default function MainHeader() {
  const navigation = useNavigation();
  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: PAGES.MAIN }],
    });
  };

  const goProfile = () => {
    navigation.navigate(PAGES.MYPROFILE);
  };

  return (
    <BaseHeader left={<LogoBtn goHome={goHome} />} right={<Profile goProfile={goProfile} />} />
  );
}
