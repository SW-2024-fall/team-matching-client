import { Pressable } from 'react-native';
import styled from 'styled-components';
import { theme } from '@styles/ThemeStyles';
import { useAuth } from '../../../context/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { PAGES } from '@navigation/constant';

const ProfileInfo = styled.Text`
  color: ${theme.colors.grey.primary};
  font-size: ${(props) => props.theme.font.size.primary};
  font-weight: ${(props) => props.theme.font.weight.semiBold};
`;

export default function Profile() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const name = user ? user.name : '로그인';

  const goProfile = () => {
    if (user) {
      navigation.navigate(PAGES.MYPROFILE, { id: user.id });
    } else {
      navigation.navigate(PAGES.LOGIN);
    }
  };

  return (
    <Pressable onPress={goProfile}>
      <ProfileInfo>{name}</ProfileInfo>
    </Pressable>
  );
}
