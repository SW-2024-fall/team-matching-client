import { Text, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';

export default function Meeting() {
  const route = useRoute();
  const { id, title } = route.params;

  return (
    <Layout screen={PAGES.MEETING} title={title}>
      <Text>Meeting {id}</Text>
      <Text>Meeting {title}</Text>
      <Pressable onPress={() => navigation.navigate(PAGES.MAIN)}></Pressable>
    </Layout>
  );
}
