import { WithLocalSvg } from 'react-native-svg/css';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../styles/ThemeStyles';
import MeetingItem from '@pages/profile/components/MeetingItem';
import UserTokenContext from '../../../hooks/UserTokenContext';
import { PAGES } from '../../../navigation/constant';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import BottomTabOthers from './BottomTabOthers';

const tabIcons = {
    모임: require('@assets/teamIcon.svg'),
    스크랩: require('@assets/scrapIcon.svg'),
    댓글: require('@assets/commentIconMyPage.svg'),
    좋아요: require('@assets/likeIconMyPage.svg'),
};

const pressedIcons = {
    모임: require('@assets/pressedTeamIcon.svg'),
    스크랩: require('@assets/pressedScrapIcon.svg'),
    댓글: require('@assets/pressedCommentIcon.svg'),
    좋아요: require('@assets/pressedLikeIcon.svg'),
};

const tabTitles = {
    모임: "참여한 모임 목록",
    스크랩: "스크랩한 모임 목록",
    댓글: "댓글을 작성한 모임 목록",
    좋아요: "좋아요 모임 목록",
};

const BottomTab = () => {
    const nav=useNavigation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loading2, setLoading2] = useState(true);
    const [error2, setError2] = useState(null);
    const [selectedTab, setSelectedTab] = useState('모임'); // Default tab
    const [likedMeeting, setLikedMeeting] = useState([]); // Default tab
    const [scrappedMeeting, setScrappedMeeting] = useState(''); // Default tab
    const [Data, setData] = useState({
        스크랩: [],
        모임: [],
        댓글: [],
        좋아요: [],
    });
    const id = useRoute().params.id;
    
    useEffect(() => {
        const fetchData = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            try {
                const response = await fetch(`http://localhost:8080/api/meetings/user`, { 
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setData((prevData) => ({
                    ...prevData, // 이전 상태 복사
                    모임: json.data // 좋아요 속성만 업데이트
                  }));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                const response = await fetch(`http://localhost:8080/api/users/likes`, { 
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();

                setData((prevData) => ({
                    ...prevData, // 이전 상태 복사
                    좋아요: json.data // 좋아요 속성만 업데이트
                  }));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                const response = await fetch(`http://localhost:8080/api/users/scraped`, { 
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setData((prevData) => ({
                    ...prevData, // 이전 상태 복사
                    스크랩: json.data // 좋아요 속성만 업데이트
                  }));
            } catch (error) {
                setError2(error.message);
            } finally {
                setLoading2(false);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {/* Bottom Tab Navigation */}
            <View style={styles.tabContainer}>
                {['모임', '스크랩', '댓글', '좋아요'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={styles.tab}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <WithLocalSvg
                            asset={selectedTab === tab ? pressedIcons[tab] : tabIcons[tab]}
                            width={24}
                            height={24}
                        />
                        <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/* 제목 */}
            
            {/* Meeting List */}
            <View style={styles.bottomTabContainer}>
                <Text style={styles.title}>
                    {tabTitles[selectedTab]}
                </Text>
                <View style={styles.listContainer}>
                    {Data[selectedTab].map((item) => (
                        <MeetingItem key={item.id} item={item} onPress={()=>{
                            const id = item.id;
                            const name = item.name;
                            nav.navigate(PAGES.MEETING, { id, title: name})}}/>
                    ))}
                </View>
                {/* <BottomTabOthers id={id}/> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '100%',
        backgroundColor: theme.colors.background.primary,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: theme.colors.grey.light,
    },
    tab: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: theme.font.size.primary,
        color: theme.font.color.primary,
        marginTop: 4,
    },
    activeTabText: {
        fontWeight: theme.font.weight.bold,
    },
        title :{
        fontWeight : `${theme.font.weight.bold}`,
        fontSize: `${theme.font.size.large}`,
        color: `${theme.font.color.primary}`,
        marginBottom: 10,
    },
    listContainer: {
        marginTop: 10,
    },
    bottomTabContainer: {
        padding: 20,
    },
});

export default BottomTab;