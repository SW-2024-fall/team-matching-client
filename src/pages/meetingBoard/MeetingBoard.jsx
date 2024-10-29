import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import MeetingItem from '@components/MeetingItem'; // 새로운 MeetingItem 컴포넌트 import
import FilterIcon from '@assets/filterIcon.svg';
import { WithLocalSvg } from 'react-native-svg/css';
import FilterModal from '@components/FilterModal'; // 필터 모달 컴포넌트 import

const DATA = [
    { id: '1', name: '모임 이름 1', features: ['#친목', '#학술'], currentParticipants: 10, maxParticipants: 20, startDate: '2020.04.04', endDate: '2024.1.2', likeCount: 3, commentCount: 1, preview: '시대생 모여라는 시대생 여러분의 원활한 모임 활동을 위해 만들어졌습니다. 시립대의 시대짱 모임입니다!!!! 2줄이상인 경우 잘립니...', image: null, meetingType: 'regular', recruitmentStatus: 'ongoing' }, 
    { id: '2', name: '모임 이름 2', features: ['#문화', '#여행'], currentParticipants: 12, maxParticipants: 25, startDate: '2020.05.05', endDate: '2024.1.2', likeCount: 39, commentCount: 1, preview: '문화 관련 모임으로 다양한 여행 정보를 공유합니다.', image: null, meetingType: 'oneTime', recruitmentStatus: 'completed' },
    { id: '3', name: '모임 이름 3', features: ['#스포츠'], currentParticipants: 8, maxParticipants: 15, startDate: '2020.06.06', endDate: '2024.1.2', likeCount: 93, commentCount: 1, preview: '스포츠 관련 모임으로 매주 모여서 운동을 합니다.', image: null, meetingType: 'regular', recruitmentStatus: 'ongoing' }
];

function FilterBtn({ onOpen }) {
    return (
        <Pressable onPress={onOpen}>
            <WithLocalSvg asset={FilterIcon} width={20} height={18} />
        </Pressable>
    );
}

export default function MeetingBoard({ navigation }) {
    const [filterVisible, setFilterVisible] = useState(false);
    const [filteredData, setFilteredData] = useState(DATA);

    const handleFilterApply = (filters) => {
        const { categories, meetingType, recruitmentStatus, minParticipants, maxParticipants } = filters;
        
        const newData = DATA.filter(item => {
            const meetsCategory = categories.length === 0 || categories.some(category => item.features.includes(category));
            const meetsMeetingType = meetingType ? item.meetingType === meetingType : true;
            const meetsRecruitmentStatus = recruitmentStatus ? item.recruitmentStatus === recruitmentStatus : true;
            const meetsParticipants = item.currentParticipants >= minParticipants && item.currentParticipants <= maxParticipants;

            return meetsCategory && meetsMeetingType && meetsRecruitmentStatus && meetsParticipants;
        });

        setFilteredData(newData);
        setFilterVisible(false); // 필터 적용 후 모달 닫기
    };

    const renderItem = ({ item }) => (
        <MeetingItem 
            item={item} 
            onPress={() => navigation.navigate(PAGES.MEETING_DETAIL, { itemId: item.id })} 
        />
    );

    return (
        <Layout screen={PAGES.MEETING_BOARD} 
                RightComponent={() => <FilterBtn onOpen={() => setFilterVisible(true)} />}>
            <FlatList 
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <FilterModal 
                visible={filterVisible} 
                onClose={() => setFilterVisible(false)} 
                onApply={handleFilterApply} 
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    // 스타일을 여기에 추가할 수 있습니다.
});
