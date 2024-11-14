import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../../../styles/ThemeStyles';

const FeedPost = ({ name, title, profileUrl, thumbnailUrl, preview }) => {
    return (
        <View style={styles.postContainer}>
            <View style={styles.userInfo}>
                <Image 
                    source={typeof profileUrl === 'string' ? { uri: profileUrl } : profileUrl} 
                    style={styles.profileUrl} 
                />
                <View style={styles.userInfoText}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
            {thumbnailUrl && (
                <Image 
                    source={typeof thumbnailUrl === 'string' ? { uri: thumbnailUrl } : thumbnailUrl} 
                    style={styles.thumbnailUrl} 
                />
            )}
            <Text style={styles.postPreview} numberOfLines={3}>{preview}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: theme.colors.background.primary,
        marginBottom: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileUrl: {
        width: 35,
        height: 35,
        borderRadius: 30,
        marginRight: 8,
        backgroundColor: theme.colors.grey.light,
    },
    name: {
        fontWeight: '600',
        color: theme.font.color.primary,
        fontSize: theme.font.size.primary,
        marginBottom: 4,
    },
    title: {
        fontWeight: '500',
        color: theme.colors.grey.primary,
        fontSize: theme.font.size.xSmall,
    },
    thumbnailUrl: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: theme.colors.grey.light, // 이미지가 로드되지 않을 경우의 배경색
    },
    postPreview: {
        color: theme.font.color.primary,
        fontWeight: '500',
        fontSize: theme.font.size.primary,
    },
});

export default FeedPost;
