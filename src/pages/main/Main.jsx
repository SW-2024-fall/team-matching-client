import React, {useState, useEffect} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import { theme } from '../../styles/ThemeStyles';
import StoryCircle from '@pages/main/components/StoryCircle';
import FeedPost from '@pages/main/components/FeedPost';

export default function Main({ navigation }) {
    const stories = [
        { imageUrl: require('@assets/testImage/frownyFace.png'), userId: 'user1' },
        { imageUrl: require('@assets/testImage/aCat.png'), userId: 'user2' },
        { imageUrl: require('@assets/testImage/aSnail.jpg'), userId: 'user3' },
        { imageUrl: null, userId: 'user4' },
        { imageUrl: null, userId: 'user5' },
        { imageUrl: null, userId: 'user6' },
        { imageUrl: null, userId: 'user7' },
        { imageUrl: null, userId: 'user8' },
        { imageUrl: null, userId: 'user9' },
    ];

    const feedData = [
        {
            id: '1',
            name: 'User One',
            title: 'Title One',
            profileUrl: require('@assets/testImage/frownyFace.png'),
            thumbnailUrl: require('@assets/testImage/orchestra.jpg'),
            preview: '3줄까지만 보이는 텍스트입니다. 정말 세 줄까지 보일까요?!  한 번 테스트 해 봅니다. 여기에 모임 활동 내역에 대한 요약글을 적어두고, 적으면 3줄까지 보여줍니다!!!@@@',
        },
        {
            id: '2',
            name: 'User Two',
            title: 'Title Two',
            profileUrl: require('@assets/testImage/aCat.png'),
            thumbnailUrl: null,
            preview: '3줄까지만 보이는 텍스트 3줄까지만 보이는 지 테스트 합니다11111.!!!3줄까지만 보이는 텍스트 3줄까지만 보이는 지 테스트 합니다.2222!!!3333줄까지만 보이는 텍스트 3줄까지만 보이는 지 테스트 합니다.!!!3줄까지만 보이는 텍스트 3줄까지만 보이는 지 테스트 합니다.!!!',
        },
        {
            id: '3',
            name: 'User Three',
            title: 'Title Three',
            profileUrl: require('@assets/testImage/aSnail.jpg'),
            thumbnailUrl: require('@assets/testImage/aSnowman.jpg'),
            preview: '3줄까지만 보이는 텍스트',
        },
        {
            id: '4',
            name: 'User Four',
            title: 'Title Four',
            profileUrl: require('@assets/testImage/aSnail.jpg'),
            thumbnailUrl: require('@assets/testImage/aSnowman.jpg'),
            preview: '3줄까지만 보이는 텍스트',
        },
        {
            id: '5',
            name: 'User Five',
            title: 'Title Five',
            profileUrl: require('@assets/testImage/aSnail.jpg'),
            thumbnailUrl: require('@assets/testImage/aSnowman.jpg'),
            preview: '3줄까지만 보이는 텍스트',
        },
        {
            id: '6',
            name: 'User Six',
            title: 'Title Six',
            profileUrl: require('@assets/testImage/aSnail.jpg'),
            thumbnailUrl: require('@assets/testImage/aSnowman.jpg'),
            preview: '3줄까지만 보이는 텍스트',
        },
        {
            id: '7',
            name: 'User Seven',
            title: 'Title Seven',
            profileUrl: require('@assets/testImage/aSnail.jpg'),
            thumbnailUrl: require('@assets/testImage/aSnowman.jpg'),
            preview: '3줄까지만 보이는 텍스트',
        },
        {
            id: '8',
            name: 'User Eight',
            title: 'Title Eight',
            profileUrl: require('@assets/testImage/aSnail.jpg'),
            thumbnailUrl: require('@assets/testImage/aSnowman.jpg'),
            preview: '3줄까지만 보이는 텍스트',
        },
        {
            id: '9',
            name: 'User Nine',
            title: 'Title Nine',
            profileUrl: require('@assets/testImage/aSnail.jpg'),
            thumbnailUrl: require('@assets/testImage/aSnowman.jpg'),
            preview: '3줄까지만 보이는 텍스트',
        },
    ];

    /* 무한스크롤 동작 */

    const [loadedfeedData, setloadedFeedData] = useState(feedData.slice(0, 3)); // 초기 데이터 3개만 표시
    const [page, setPage] = useState(0); // 페이지 상태
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreData = async() => {
        if (isLoading) return; // 이미 로딩 중이면 함수 종료
        setIsLoading(true);

        const nextPage = page + 1;
        const startIndex = 3 * nextPage; 
        const newData = feedData.slice(startIndex, startIndex + 3); // 다음 페이지 데이터
        if (newData.length > 0) {
            console.log('aa', newData);
            setloadedFeedData((prevData) => [...prevData, ...newData])
            setPage(nextPage);
            console.log('page loaded');
        } else {
            console.log('No data to load');
        }
        setIsLoading(false); // 로딩 종료
    };

    /* 여기까지 */

    return (
        <Layout screen={PAGES.MAIN} navigation={navigation}>
            {/* Story Section */}
            <View style={styles.storyContainer}>
                <FlatList
                    data={stories}
                    renderItem={({ item }) => (
                        <StoryCircle imageUrl={item.imageUrl} userId={item.userId} />
                    )}
                    keyExtractor={(item) => item.userId}
                    horizontal
                    contentContainerStyle={styles.storyList}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            
            {/* Feed Section */}
            <FlatList
                data={loadedfeedData}
                renderItem={({ item }) => (
                    <FeedPost 
                        name={item.name}
                        title={item.title}
                        profileUrl={item.profileUrl}
                        thumbnailUrl={item.thumbnailUrl}
                        preview={item.preview}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.feedPostContainer}
                ListFooterComponent={isLoading ? <ActivityIndicator /> : null} // 로딩 인디케이터 표시
                initialNumToRender={5} // 처음 렌더링할 아이템 수
                onEndReached={loadMoreData} // 스크롤 끝에 닿을 때 추가 데이터 로드
                onEndReachedThreshold={0.5} // 스크롤이 리스트의 50%에 도달했을 때 호출
            />
            {/* Navigation Buttons 
            <View>
                <Text>Home Screen</Text>
            </View>
            <Pressable onPress={() => navigation.navigate(PAGES.MEETING_BOARD)}>
                <Text>Let's go meeting board</Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate(PAGES.MEETING, { id: 1, title: 'meeting sample 1' })}
            >
                <Text>Let's go meeting 1</Text>
            </Pressable>
            */}
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
