import React, { useState, useEffect } from 'react'; 
import { Text, Pressable, StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import FilterIcon from '../../assets/filterIcon.svg';
import { WithLocalSvg } from 'react-native-svg/css';
import MeetingItem from '../profile/components/MeetingItem';
import FilterModal from './components/FilterModal';
import FloatingButton from './components/FloatingButton';
import styled from 'styled-components';
import { theme } from '../../styles/ThemeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8080/api/meetings';

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
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [pagedData, setPagedData] = useState(null);
    useEffect(() => {
        console.log("page = " + page);
        setPagedData(data.slice((page - 1) * 10, page * 10));
    }, [page, data])
    useEffect(() => {
        console.log("meetingBoard 입장");
        const fetchData = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            try {
                // 모든 모임 목록을 가져오기
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, // JWT 포함
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setMaxPage(Math.ceil(json.data.length / 10));
                setData(json.data);
                setPage(1);
                setLoading(false);
            } catch (error) {
                setError(error.message);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <ActivityIndicator size="large" color="#444444" />; // 로딩 중일 때 인디케이터 표시
    }

    if (error) {
        return <Text>Error: {error}</Text>; // 에러 메시지 표시
    }

    const handleFilterApply = (filters) => {
        const { categories, meetingType, minParticipants, maxParticipants } = filters;
    
        // 필터링 조건을 적용
        const newData = data.filter(item => {
            // 카테고리 필터
            const meetsCategory = categories.length > 0 ? categories.some(category => item.categories?.includes(category)) : true;
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
        setFilterVisible(false);  // 필터 모달 닫기
    };

    const renderItem = ({ item }) => (
        <MeetingItem 
            item={item} 
            onPress={() => {
                console.log("meetingBoard item.id: ", item.id, "item.name: ", item.name);
                navigation.navigate(PAGES.MEETING, { id: item.id, title: item.name })
            }} 
        />
    );

    const handleFloatingButtonPress = () => {
        navigation.navigate(PAGES.CREATE_MEETING);
    };

    const goCreateMeeting = () => {
        console.log("goCreateMeeting");
        navigation.navigate(PAGES.MEETING_CREATE);
    }

    if (!data || data.length === 0) {
        return <Layout screen={PAGES.MEETING_BOARD}>
            <ActivityIndicator size="large" color="#444444"   style={{marginTop:100}}/>
        </Layout>;
    }

    return (
        <Layout screen={PAGES.MEETING_BOARD} 
                RightComponent={() => <FilterBtn onOpen={() => setFilterVisible(true)} />} style={styles.layout}>
            <View style={styles.container}>
                <CreatePressable onPress={()=>goCreateMeeting()}>
                    <CreateText>+</CreateText>
                </CreatePressable>
{/* 
                <Header>
                    <FilterPressable onPress = {()=>setFilterVisible(true)}><WithLocalSvg asset={FilterIcon}/></FilterPressable>
                </Header> */}
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* {(filteredData.length > 0 ? filteredData : pagedData).map((item) => (
                        <MeetingItem 
                            key={item.id} 
                            item={item} 
                            onPress={() => navigation.navigate(PAGES.MEETING, { id: item.id, title:item.name })} 
                        />
                    ))} */}
                    {pagedData.map((item) => (
                        <MeetingItem 
                            key={item.id} 
                            item={item} 
                            onPress={() => {
                                console.log("meetingBoard item.id: ", item.id, "item.name: ", item.name);
                                navigation.navigate(PAGES.MEETING, { id: item.id, title: item.name })
                            }} 
                        />
                    ))}
                </ScrollView>
                <FilterModal 
                    visible={filterVisible} 
                    onClose={() => setFilterVisible(false)} 
                    onApply={handleFilterApply} 
                />
                <PageContainer>
                    {maxPage >0 && <Pressable onPress={()=>setPage(1)}><PageText isPage={page===1}>1</PageText></Pressable>}
                    {maxPage >1 && <Pressable onPress={()=>setPage(2)}><PageText isPage={page===2}>2</PageText></Pressable>}
                    {maxPage >2 && <Pressable onPress={()=>setPage(3)}><PageText isPage={page===3}>3</PageText></Pressable>}
                    {maxPage >3 && <Pressable onPress={()=>setPage(4)}><PageText isPage={page===4}>4</PageText></Pressable>}
                    {maxPage >4 && <Pressable onPress={()=>setPage(5)}><PageText isPage={page===5}>5</PageText></Pressable>}
                </PageContainer>
            </View>
            {/* <FloatingButton onPress={handleFloatingButtonPress} style={styles.floatingButton} /> */}
        </Layout>
    );
}


const PageText = styled.Text`
    color: ${(props) => (props.isPage ? 'blue' : 'black')};
`;
const PageContainer = styled.View`
    flexDirection:row;
    justifyContent: center;
    alignItems: center;
    gap: 4px;
`;
const Header = styled.View`
width:20%;
justifyContent:space-between;
flexDirection:row;
marginLeft:80%;
`;
const FilterPressable = styled.Pressable`
width:30px;
height:30px;
backgroundColor:gray;
borderRadius:15px;
justifyContent:center;
alignItems:center;
`;
const CreatePressable = styled.Pressable`
zIndex:10;
position:absolute;
bottom:20px;
right:20px;
width:60px;
height:60px;
backgroundColor:${(props) => props.theme.colors.blue.primary};
borderRadius:30px;
justifyContent:center;
alignItems:center;
`;
const CreateText = styled.Text`
marginTop:-6px;
color:white;
fontWeight:200;
fontSize:50px;
`;
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
