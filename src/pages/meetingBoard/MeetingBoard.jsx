import { Text, Pressable } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';

export default function MeetingBoard({ navigation }) {
  return (
    <Layout screen={PAGES.MEETING_BOARD} navigation={navigation}>
      <Text>Meeting Board</Text>
      <Pressable onPress={() => navigation.navigate(PAGES.MAIN)}>
        <Text>Let's go home</Text>
      </Pressable>
    </Layout>
  );
}
