import { Text } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';

export default function MeetingCreate() {
  return (
    <Layout screen={PAGES.MEETING_CREATE}>
      <Text>MeetingCreate</Text>
    </Layout>
  );
}
