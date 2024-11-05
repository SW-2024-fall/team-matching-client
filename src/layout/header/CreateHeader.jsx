import BaseHeader from '@layout/header/BaseHeader';
import { Pressable } from 'react-native';
import { theme } from '../../styles/ThemeStyles';
import styled from 'styled-components';

const HeaderText = styled.Text`
  font-size: ${(props) => props.theme.font.size.primary};
  font-weight: ${(props) => props.theme.font.weight.semiBold};
  color: white;
`;

export default function CreateHeader() {
  function Cancel() {
    return (
      <Pressable onPress={() => navigation.pop()}>
        <HeaderText>취소</HeaderText>
      </Pressable>
    );
  }

  function Save() {
    return (
      <Pressable onPress={() => navigation.pop()}>
        <HeaderText>저장</HeaderText>
      </Pressable>
    );
  }

  return (
    <BaseHeader left={<Cancel />} right={<Save />} backgroundColor={theme.colors.blue.primary} />
  );
}
