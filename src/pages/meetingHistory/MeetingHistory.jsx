import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import { Text } from 'react-native';

export default function MeetingHistory() {
  return (
    <Layout screen={PAGES.MEETING_HISTORY}>
      <Text>모임 활동 내역 페이지</Text>
    </Layout>
  );
}
