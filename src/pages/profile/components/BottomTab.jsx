import { WithLocalSvg } from 'react-native-svg/css';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../styles/ThemeStyles';
import MeetingItem from '@pages/profile/components/MeetingItem';
import UserTokenContext from '../../../hooks/UserTokenContext';
import { PAGES } from '../../../navigation/constant';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react'

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
    const {userToken, setUserToken} = useContext(UserTokenContext);
    const [Data, setData] = useState({
        스크랩: [],
        모임: [],
        댓글: [],
        좋아요: [],
      });

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/meetings/user`, { 
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${userToken}`
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
                const response = await fetch(`http://localhost:8080/api/users/likes`, { 
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${userToken}`
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
                const response = await fetch(`http://localhost:8080/api/users/scraped`, { 
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${userToken}`
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

    const mockData = {
        모임: [{ id: '1', name: '모임1', preview: '모임 소개1 입니다. 최대 2줄까지 보여줍니다. 모임 소개1 입니다. 최대 2줄까지 보여줍니다.모임 소개1 입니다. 최대 2줄까지 보여줍니다. ', features: ['#특징1'], likeCount: 10, commentCount: 5, currentParticipants: 3, maxParticipants: 10, startDate: '2024-11-01', endDate: '2024-11-15' },
        { id: '2', name: '모임2', preview: '모임 소개1', features: ['#특징1'], likeCount: 10, commentCount: 5, currentParticipants: 3, maxParticipants: 10, startDate: '2024-11-01', endDate: '2024-11-15' },
        { id: '3', name: '모임3', preview: '모임 소개1', features: ['#특징1'], likeCount: 10, commentCount: 5, currentParticipants: 3, maxParticipants: 10, startDate: '2024-11-01', endDate: '2024-11-15' }
    ],
        스크랩: [{ id: '1', name: '스크랩1', preview: '스크랩 소개1', features: ['#특징2'], likeCount: 20, commentCount: 8, currentParticipants: 5, maxParticipants: 12, startDate: '2024-12-01', endDate: '2024-12-15' }
    ],
        댓글: [{ id: '3', name: '댓글1', preview: '댓글 소개1', features: ['#특징3'], likeCount: 15, commentCount: 3, currentParticipants: 6, maxParticipants: 10, startDate: '2025-01-01', endDate: '2025-01-15' }
    ],
        좋아요: [{ id: '4', name: '좋아요1', preview: '좋아요 소개1', features: ['#특징4'], likeCount: 25, commentCount: 6, currentParticipants: 8, maxParticipants: 15, startDate: '2025-02-01', endDate: '2025-02-15' }
    ],
    };

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
            <Text style={styles.title}>
                {tabTitles[selectedTab]}
            </Text>
            
            {/* Meeting List */}
            <View style={styles.listContainer}>
                {Data[selectedTab].map((item) => (
                    <MeetingItem key={item.id} item={item} onPress={()=>{
                        const id = item.id;
                        const name = item.name;
                        nav.navigate(PAGES.MEETING, { id, title: name})}}/>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: theme.colors.background.primary,
        padding: 10,
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
        fontWeight : theme.font.weight.bold,
        fontSize: theme.font.size.large,
        color : theme.font.color.primary,
        marginTop: 20,
        marginBottom: 0,
        marginLeft: 10,
    },
    listContainer: {
        marginTop: 10,
    },
});

export default BottomTab;