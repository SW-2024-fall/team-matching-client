import { Text, Pressable } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import FilterIcon from '@assets/filterIcon.svg';
import { WithLocalSvg } from 'react-native-svg/css';
import { useEffect } from 'react';

function FilterBtn() {
  return <WithLocalSvg asset={FilterIcon} width={20} height={18} />;
}

export default function MeetingBoard({ navigation }) {
    return (
        <Layout screen={PAGES.MEETING_BOARD} RightComponent={FilterBtn}>
        <Text>Meeting Board</Text>
        <Pressable onPress={() => navigation.navigate(PAGES.MAIN)}>
            <Text>Let's go home</Text>
        </Pressable>
        </Layout>
    );
}
