import { Text } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';

export default function Register() {
  return (
    <Layout screen={PAGES.REGISTER}>
      <Text>Register</Text>
    </Layout>
  );
}
