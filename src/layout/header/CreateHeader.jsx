// 뒤로가기 시 모달 필요
// 저장 시 해당 페이지 pop

import BaseHeader from '@layout/header/BaseHeader';
import { Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateHeader() {
  const nav = useNavigation();
  function Cancel() {
    return (
      <Pressable onPress={() => nav.pop()}>
        <Text>취소</Text>
      </Pressable>
    );
  }

  function Save() {
    return (
      <Pressable onPress={() => nav.pop()}>
        <Text>저장</Text>
      </Pressable>
    );
  }

  return <BaseHeader left={<Cancel />} right={<Save />} />;
}
