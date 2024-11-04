import { View, Text, Pressable } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';

export default function Main({ navigation }) {
  return (
    <Layout screen={PAGES.MAIN}>
      <View>
        <Text>Home Screen</Text>
      </View>
      <Pressable onPress={() => navigation.navigate(PAGES.MEETING_BOARD)}>
        <Text>Let's go meeting board</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate(PAGES.MEETING_CREATE)}>
        <Text>Let's go meeting create</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate(PAGES.MEETING, { id: 1, title: 'meeting sample 1' })}
      >
        <Text>Let's go meeting 1</Text>
      </Pressable>
    </Layout>
  );
}
