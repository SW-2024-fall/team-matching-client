import { Text } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';

export default function MeetingHistoryCreate() {
  return (
    <Layout screen={PAGES.MEETING_HISTORY_CREATE}>
      <Text>MeetingHistoryCreate</Text>
    </Layout>
  );
}
