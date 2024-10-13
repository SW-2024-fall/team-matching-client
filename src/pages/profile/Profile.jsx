import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import { Text } from 'react-native';

export default function Profile({ route }) {
  const screen = route.name;
  const isMe = screen == PAGES.MYPROFILE;

  return (
    <Layout screen={screen}>
      <Text>{isMe ? '내 프로필' : '상대방 프로필  '}</Text>
    </Layout>
  );
}
