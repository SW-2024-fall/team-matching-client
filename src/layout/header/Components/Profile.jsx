import { Pressable } from 'react-native';
import styled from 'styled-components';
import { theme } from '@styles/ThemeStyles';

const ProfileInfo = styled.Text`
  color: ${theme.colors.grey.primary};
  font-size: ${(props) => props.theme.font.size.primary};
  font-weight: ${(props) => props.theme.font.weight.semiBold};
`;

export default function Profile({ goProfile }) {
  // user name, user profile image 가져와야함
  return (
    <Pressable onPress={goProfile}>
      <ProfileInfo>user name</ProfileInfo>
    </Pressable>
  );
}
