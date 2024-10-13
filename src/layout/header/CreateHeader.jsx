// 뒤로가기 시 모달 필요
// 저장 시 해당 페이지 pop

import BaseHeader from '@layout/header/BaseHeader';
import { Pressable } from 'react-native';
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
