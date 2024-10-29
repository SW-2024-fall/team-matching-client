import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import { theme } from '../../styles/ThemeStyles';
import StoryCircle from '../../components/StoryCircle';
import FeedPost from '../../components/FeedPost';

export default function Main({ navigation }) {
    const stories = [
        { imageUrl: null, userId: 'user1' },
        { imageUrl: null, userId: 'user2' },
        { imageUrl: null, userId: 'user3' },
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
            profileUrl: null,
            thumbnailUrl: null,
            preview: '3줄까지만 보이는 텍스트',
        },
        {
            id: '2',
            name: 'User Two',
            title: 'Title Two',
            profileUrl: null,
            thumbnailUrl: null,
            preview: '3줄까지만 보이는 텍스트',
        },
        {
            id: '3',
            name: 'User Three',
            title: 'Title Three',
            profileUrl: null,
            thumbnailUrl: null,
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
        padding: 20,
        backgroundColor: theme.colors.background.primary,
    },
    storyContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    storyList: {
        paddingVertical: 0,
    },
    feedPostContainer: {
        paddingHorizontal: 10,
        paddingTop: 15,
    },
    title: {
        fontSize: theme.font.size.large,
        fontWeight: theme.font.weight.bold,
        marginBottom: 20,
    },
});
