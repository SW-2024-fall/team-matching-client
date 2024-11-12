import React from 'react';
import { View, Text, StyleSheet,  Image, ScrollView, ActivityIndicator} from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import { theme } from '@styles/ThemeStyles';
import StoryCircle from '@pages/main/components/StoryCircle';
import FeedPost from '@pages/main/components/FeedPost';
import { useEffect, useState } from 'react';



export default function Main({ navigation }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch("http://10.0.73.4:8080/api/histories",{method:"GET"});
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json(); 
            setData(json);
            setLoading(false);
            //console.log(json); // 반환된 JSON 구조 확인
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

    return (
        <Layout screen={PAGES.MAIN} navigation={navigation}>
            {/* Story Section: 모임 활동에 관한 것 */}
            <View style={styles.storyContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storyList}>
                    {data.data.map((item) => (
                        <StoryCircle 
                        key={item.id} 
                        imageUrl={item.thumbnailUrl} 
                        userId={item.id} 
                        />
                    ))}
                </ScrollView>
            </View>
            
            {/* Feed Section: 모임장 이름 + 그 사람이 작성한 활동  */}
            <View style={styles.feedPostContainer}>
                <ScrollView>
                    {data.data.map((item) => (
                        <FeedPost 
                            key={item.id}
                            name={item.writer.name}
                            title={item.meetingName}
                            profileUrl={item.writer.profileUrl}
                            thumbnailUrl={item.thumbnailUrl}
                            preview={item.content}
                        />
                    ))}
                </ScrollView>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: theme.colors.background.primary,
    },
    storyContainer: {
        marginLeft: 10,
        backgroundColor: theme.colors.background.primary,
    },
    feedPostContainer: {
        paddingTop: 16,
        paddingHorizontal: 20
    },
});
