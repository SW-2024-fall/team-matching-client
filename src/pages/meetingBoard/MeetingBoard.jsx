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
                if (!accessToken) {
                    throw new Error('Access token not found');
                }
    
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
    
                // 각 모임의 세부 정보를 비동기적으로 가져오기
                const detailedData = await Promise.all(
                    json.data.map(async (item) => {
                        const meetingResponse = await fetch(`${API_URL}/${item.id}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`, // JWT 포함
                            },
                        });
    
                        if (!meetingResponse.ok) {
                            throw new Error('Failed to fetch meeting details');
                        }
    
                        const meetingDetails = await meetingResponse.json();
                        return {
                            ...item,
                            categories: meetingDetails.data.info.categories,
                            meetingType: meetingDetails.data.info.type,
                            minParticipant: meetingDetails.data.info.minParticipant,
                            maxParticipant: meetingDetails.data.info.maxParticipant,
                            ...meetingDetails,
                        }; // 기존 모임 데이터와 세부 정보 병합
                    })
                );
    
                // 상태 업데이트
                setData(detailedData);
                setMaxPage(Math.ceil(detailedData.length / 10));
                setPage(1);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
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
    
        const newData = data.filter(item => {
            const meetsCategory = categories.length > 0 
                ? categories.some(category => item.categories?.includes(category)) 
                : true;
            console.log("categories: ", categories, "item.categories: ", item.categories, "meetsCategory: ", meetsCategory);
            const meetsMeetingType = meetingType ? item.meetingType === meetingType : true;
            const meetsParticipants = 
                (minParticipants !== undefined && maxParticipants !== undefined) 
                    ? item.minParticipant >= minParticipants && item.maxParticipant <= maxParticipants
                    : (minParticipants !== undefined)
                        ? item.minParticipant >= minParticipants
                        : (maxParticipants !== undefined)
                            ? item.maxParticipant <= maxParticipants
                            : true;
            console.log("item.minParticipants", item.minParticipant,"item.maxParticipants", item.maxParticipant, "min: ", minParticipants, "max: ", maxParticipants, "meetsParticipants: ", meetsParticipants);
    
            const result = meetsCategory && meetsMeetingType && meetsParticipants;

            
            console.log("data"+data);
            console.log("Res"+result);
            return result;
            
        });
        
        console.log("newsdata"+newData);
        setFilteredData(newData); 
        console.log("Filtered Data: ", newData); // 필터링된 데이터를 바로 로그로 확인
        setFilterVisible(false);
    };

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
                {(filteredData.length > 0 ? filteredData : pagedData).reverse().map((item) => (
                    <MeetingItem
                        key={item.id}
                        item={item}
                        onPress={() => navigation.navigate(PAGES.MEETING, { id: item.id, title: item.name })}
                    />
                ))}
                    <PageContainer>
                        {maxPage >0 && <Pressable onPress={()=>setPage(1)}><PageText isPage={page===1}>1</PageText></Pressable>}
                        {maxPage >1 && <Pressable onPress={()=>setPage(2)}><PageText isPage={page===2}>2</PageText></Pressable>}
                        {maxPage >2 && <Pressable onPress={()=>setPage(3)}><PageText isPage={page===3}>3</PageText></Pressable>}
                        {maxPage >3 && <Pressable onPress={()=>setPage(4)}><PageText isPage={page===4}>4</PageText></Pressable>}
                        {maxPage >4 && <Pressable onPress={()=>setPage(5)}><PageText isPage={page===5}>5</PageText></Pressable>}
                    </PageContainer>
                </ScrollView>
                <FilterModal 
                    visible={filterVisible} 
                    onClose={() => setFilterVisible(false)} 
                    onApply={handleFilterApply} 
                />
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
    },
    scrollContainer: {
        marginVertical: 15,
        paddingHorizontal: 15,
        flexGrow: 1,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,  // 화면 하단에서의 위치
        right: 20,   // 화면 오른쪽에서의 위치
        zIndex: 1,   // 다른 컴포넌트 위에 표시되도록 z-index 설정
    },
});
