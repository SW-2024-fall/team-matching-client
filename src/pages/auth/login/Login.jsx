import { Text } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';

export default function Login() {
  return (
    <Layout screen={PAGES.AUTH}>
      <Text>Login</Text>
    </Layout>
  );
}
