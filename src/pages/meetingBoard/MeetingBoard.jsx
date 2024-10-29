import React from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import MeetingItem from '../../components/MeetingItem'; // 새로운 MeetingItem 컴포넌트 import
import FilterIcon from '@assets/filterIcon.svg';
import { WithLocalSvg } from 'react-native-svg/css';

const DATA = [
  { id: '1', name: '모임 이름 1', features: ['#친목', '#학술'], currentParticipants: '10명', maxParticipants: '20명', startDate: '2020.04.04', endDate: '2024.1.2', likeCount: '3', commentCount: '1', preview: '시대생 모여라는 시대생 여러분의 원활한 모임 활동을 위해 만들어졌습니다. 시립대의 시대짱 모임입니다!!!! 2줄이상인 경우 잘립니...', image: null }, 
  { id: '2', name: '모임 이름 2', features: ['#문화', '#여행'], currentParticipants: '12명', maxParticipants: '25명', startDate: '2020.05.05', endDate: '2024.1.2', likeCount: '39', commentCount: '1', preview: '문화 관련 모임으로 다양한 여행 정보를 공유합니다.', image: null },
  { id: '3', name: '모임 이름 3', features: ['#스포츠'], currentParticipants: '8명', maxParticipants: '15명', startDate: '2020.06.06', endDate: '2024.1.2', likeCount: '93', commentCount: '1', preview: '스포츠 관련 모임으로 매주 모여서 운동을 합니다.', image: null }
];

function FilterBtn({ navigation }) {
  return (
    <Pressable onPress={() => { /* 필터 기능 구현 */ }}>
      <WithLocalSvg asset={FilterIcon} width={20} height={18} />
    </Pressable>
    );
}

export default function MeetingBoard({ navigation }) {
  const renderItem = ({ item }) => (
    <MeetingItem 
      item={item} 
      onPress={() => navigation.navigate(PAGES.MEETING_DETAIL, { itemId: item.id })} 
    />
  );

  return (
    <Layout screen={PAGES.MEETING_BOARD} RightComponent={<FilterBtn navigation={navigation} />}>
      <Text>Meeting Board</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Pressable onPress={() => navigation.navigate(PAGES.MAIN)}>
        <Text>Let's go home</Text>
      </Pressable>
    </Layout>
  );
}