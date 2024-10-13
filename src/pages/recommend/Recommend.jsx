import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import { Text } from 'react-native';

export default function Recommend({ navigation }) {
  return (
    <Layout screen={PAGES.RECOMMEND}>
      <Text>Recommend</Text>
    </Layout>
  );
}
