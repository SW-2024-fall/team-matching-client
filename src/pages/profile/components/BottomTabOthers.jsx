import { WithLocalSvg } from 'react-native-svg/css';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../styles/ThemeStyles';
import MeetingItem from '@pages/profile/components/MeetingItem';
import { useAuth } from '../../../context/AuthProvider';
import { PAGES } from '@navigation/constant';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tabTitles = {
    모임: "참여한 모임 목록",
    스크랩: "스크랩한 모임 목록",
    댓글: "댓글을 작성한 모임 목록",
    좋아요: "좋아요 모임 목록",
};

const BottomTabOthers = (id) => {
    const nav=useNavigation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loading2, setLoading2] = useState(true);
    const [error2, setError2] = useState(null);
    const [selectedTab, setSelectedTab] = useState('모임'); // Default tab
    const [likedMeeting, setLikedMeeting] = useState([]); // Default tab
    const [scrappedMeeting, setScrappedMeeting] = useState(''); // Default tab
    const {accessToken} = useAuth();
    const [Data, setData] = useState({
        모임: [],
      });

      useEffect(() => {
          const fetchData = async () => {
              const accessToken = await AsyncStorage.getItem('accessToken');
              try {
                  const response = await fetch(`http://localhost:8080/api/meetings/user/${id.id}`, { 
                      method: "GET",
                      headers: {
                          'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                const json = await response.json();
                console.log(JSON.stringify(json))
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

    return (
        <View style={styles.container}>
            {/* 제목 */}
            <Text style={styles.title}>
                참여한 모임 목록
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

export default BottomTabOthers;