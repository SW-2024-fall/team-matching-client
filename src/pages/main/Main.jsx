import React from 'react';
import { View, Text, StyleSheet, FlatList , Image} from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import { theme } from '../../styles/ThemeStyles';
import StoryCircle from '../../components/StoryCircle';
import FeedPost from '../../components/FeedPost';

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
    ];

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
                data={feedData}
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
