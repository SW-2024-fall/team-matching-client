import { Text } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';

export default function ProfileEdit() {
  return (
    <Layout screen={PAGES.PROFILE_EDIT}>
      <Text>ProfileEdit</Text>
    </Layout>
  );
}
