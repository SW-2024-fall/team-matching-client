import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import { theme } from '../../styles/ThemeStyles';
import StoryCircle from '@pages/main/components/StoryCircle';
import FeedPost from '@pages/main/components/FeedPost';
import { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';

export default function Main({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [token, setToken] = useState(null);  // 상태로 토큰 값을 저장

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const storedToken = await AsyncStorage.getItem('userToken'); // AsyncStorage에서 'userToken'을 읽어옴
  //       if (storedToken) {
  //         setToken(storedToken);  // 토큰이 있으면 상태에 저장
  //         console.log("token = "+token);
  //       } else {
  //         setToken(null);  // 토큰이 없으면 null 설정
  //       }
  //     } catch (error) {
  //       console.error("토큰을 읽는 중 오류 발생:", error);
  //     }
  //   };

  //   checkToken();  // 컴포넌트가 마운트 될 때 토큰을 확인
  // }, []);  // 빈 배열을 넣어서 한 번만 실행되도록 설정

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/histories`, { method: 'GET' });
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
        {data && 

        <View>
        {/* Story Section: 모임 활동에 관한 것 */}
        <View style={styles.storyContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyList}
          >
            {data.data.map((item) => (
              <StoryCircle key={item.id} imageUrl={item.thumbnailUrl} userId={item.id} />
            ))}
          </ScrollView>
        </View>
      
        {/* Feed Section: 모임장 이름 + 그 사람이 작성한 활동  */}
        <View style={styles.feedPostContainer}>
          <ScrollView>
            {data.data.map((item) => (
              <FeedPost
                key={item.id}
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
