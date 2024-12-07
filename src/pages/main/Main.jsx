import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import { theme } from '../../styles/ThemeStyles';
import StoryCircle from '@pages/main/components/StoryCircle';
import FeedPost from '@pages/main/components/FeedPost';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserTokenContext from '../../hooks/UserTokenContext';
import { useContext } from 'react';
import MyProfile from '../profile/MyProfile';

export default function Main({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userToken, setUserToken } = useContext(UserTokenContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/histories`, { 
          method: 'GET' ,
          headers: {
            'Authorization': `Bearer ${userToken}`, // JWT 포함
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
        console.log("main data ="+JSON.stringify(data));
        setLoading(false);
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
      {/* <MyProfile></MyProfile> */}
        {data && 

        <View>
        {/* Story Section: 모임 활동에 관한 것 */}
        {/* <View style={styles.storyContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyList}
          >
            {data.data.map((item) => (
              <StoryCircle key={item.id} imageUrl={item.thumbnailUrl} userId={item.id} />
            ))}
          </ScrollView>
        </View> */}
      
        {/* Feed Section: 모임장 이름 + 그 사람이 작성한 활동  */}
        <View style={styles.feedPostContainer}>
          <ScrollView>
            {data.data.map((item, index) => (
              <FeedPost
                key={index}
                id={item.id}
                name={item.writer.name}
                title={item.meetingName}
                profileUrl={item.writer.profileUrl}
                thumbnailUrl={item.thumbnailUrl}
                preview={item.content}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
      </View>
}
    </Layout>

  );
}

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
    paddingHorizontal: 20,
  },
});
