// 뒤로가기 시 모달 필요
// 저장 시 해당 페이지 pop

import BaseHeader from '@layout/header/BaseHeader';
import { Pressable } from 'react-native';

export default function CreateHeader() {
  function Cancel() {
    return (
      <Pressable onPress={() => navigation.pop()}>
        <Text>취소</Text>
      </Pressable>
    );
  }

  function Save() {
    return (
      <Pressable onPress={() => navigation.pop()}>
        <Text>저장</Text>
      </Pressable>
    );
  }

  return <BaseHeader left={<Cancel />} right={<Save />} />;
}
