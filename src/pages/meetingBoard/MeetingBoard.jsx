import React, { useState, useEffect } from 'react'; 
import { Text, Pressable, StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import FilterIcon from '@assets/filterIcon.svg';
import { WithLocalSvg } from 'react-native-svg/css';
import MeetingItem from '@pages/meetingBoard/components/MeetingItem.jsx';
import FilterModal from '@pages/meetingBoard/components/FilterModal';
import FloatingButton from '@pages/meetingBoard/components/FloatingButton';

const API_URL = 'http://10.0.73.4:8080/api/meetings';

function FilterBtn({ onOpen }) {
    return (
        <Pressable onPress={onOpen}>
            <WithLocalSvg asset={FilterIcon} width={20} height={18} />
        </Pressable>
    );
}

export default function MeetingBoard({ navigation }) {
    const [data, setData] = useState([]);  // 초기 값은 빈 배열
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filteredData, setFilteredData] = useState([]);  // 초기 값은 빈 배열

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 모든 모임 목록을 가져오기
                const response = await fetch(API_URL, { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();

                // 각 모임의 세부 정보를 비동기적으로 가져오기
                const detailedData = await Promise.all(
                    json.data.map(async (item) => {
                        const meetingResponse = await fetch(`${API_URL}/${item.id}`);
                        //console.log("API URL for details:", `${API_URL}/${item.id}`);
                        //console.log("API 내용: ", meetingResponse);
                        const meetingDetailsText = await meetingResponse.text();
                        //console.log(meetingDetails);
                        const meetingDetails = JSON.parse(meetingDetailsText);
                        const mergedItem = { ...item, 
                            categories: meetingDetails.data.info.categories, 
                            meetingType: meetingDetails.data.info.type,
                            minParticipant: meetingDetails.data.info.minParticipant,
                            maxParticipant: meetingDetails.data.info.maxParticipant,
                            ...meetingDetails };
                        //console.log(mergedItem)
                        return mergedItem;  // 기존 모임 데이터와 세부 정보 병합
                        
                    })
                );

                setData(detailedData);  // 상세 정보를 포함한 데이터를 상태에 저장
                setLoading(false);  // 로딩 완료
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#000000" />; // 로딩 중일 때 인디케이터 표시
    }

    if (error) {
        return <Text>Error: {error}</Text>; // 에러 메시지 표시
    }

    const handleFilterApply = (filters) => {
        const { categories, meetingType, minParticipants, maxParticipants } = filters;
    
        // 필터링 조건을 적용
        const newData = data.filter(item => {
            // 카테고리 필터
            const meetsCategory = categories.length > 0 ? categories.some(category => item.categories.includes(category)) : true;
            console.log("categories: ", categories, "item.categories: ", item.categories, "meetsCategory: ", meetsCategory);
    
            // 미팅 타입 필터 (meetingType이 설정된 경우에만 적용)
            const meetsMeetingType = meetingType ? item.meetingType === meetingType : true;
            console.log("item.meetingType", item.meetingType, " meetingType: ", meetingType, "meetsMeetingType: ", meetsMeetingType);
    
            // 참가자 수 필터
            const meetsParticipants = 
            (minParticipants !== undefined && maxParticipants !== undefined) // 둘 다 선택되었을 때
                ? item.minParticipant >= minParticipants && item.maxParticipant <= maxParticipants
                : (minParticipants !== undefined) // minParticipants만 선택된 경우
                    ? item.minParticipant >= minParticipants
                    : (maxParticipants !== undefined) // maxParticipants만 선택된 경우
                        ? item.maxParticipant <= maxParticipants
                        : true; // 선택되지 않으면 true 반환
            console.log("item.minParticipants", item.minParticipant,"item.maxParticipants", item.maxParticipant, "min: ", minParticipants, "max: ", maxParticipants, "meetsParticipants: ", meetsParticipants);
    
            // 조건 결합
            const result = 
                (meetsCategory || meetsCategory === null) &&
                (meetsMeetingType === null || meetsMeetingType) &&
                (meetsParticipants === null || meetsParticipants);
            console.log("result: ", result);
    
            return result;
        });

        setFilteredData(newData);  // 필터링된 데이터 저장
        //console.log(newData,"\n\n")
        setFilterVisible(false);  // 필터 모달 닫기
    };

    const renderItem = ({ item }) => (
        <MeetingItem 
            item={item} 
            onPress={() => navigation.navigate(PAGES.MEETING_DETAIL, { itemId: item.id })} 
        />
    );

    const handleFloatingButtonPress = () => {
        navigation.navigate(PAGES.CREATE_MEETING);
    };

    return (
        <Layout screen={PAGES.MEETING_BOARD} 
                RightComponent={() => <FilterBtn onOpen={() => setFilterVisible(true)} />} style={styles.layout}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {(filteredData.length > 0 ? filteredData : data).map((item) => (
                        <MeetingItem 
                            key={item.id} 
                            item={item} 
                            onPress={() => navigation.navigate(PAGES.MEETING_DETAIL, { itemId: item.id })} 
                        />
                    ))}
                </ScrollView>
                <FilterModal 
                    visible={filterVisible} 
                    onClose={() => setFilterVisible(false)} 
                    onApply={handleFilterApply} 
                />
            </View>
            <FloatingButton onPress={handleFloatingButtonPress} style={styles.floatingButton} />
        </Layout>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 15,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,  // 화면 하단에서의 위치
        right: 20,   // 화면 오른쪽에서의 위치
        zIndex: 1,   // 다른 컴포넌트 위에 표시되도록 z-index 설정
    },
});
