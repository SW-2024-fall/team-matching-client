import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {theme} from '../styles/ThemeStyles';

const FeedPost = ({ name,title, profileUrl, thumbnailUrl, preview }) => {
    return (
        <View style={styles.postContainer}>
            <View style={styles.userInfo}>
                <Image source={{ uri: profileUrl }} style={styles.profileUrl} />
                <View style={styles.userInfoText}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.name}>{title}</Text>
                </View>
            </View>
            <Image source={{ uri: thumbnailUrl }} style={styles.thumbnailUrl} />
            <Text style={styles.postPreview} numberOfLines={3}>{preview}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        padding: 0,
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
        marginRight: 10,
        backgroundColor: theme.colors.grey.light
    },
    name: {
        fontWeight: theme.font.weight.semiBold,
        color: theme.font.color.primary
    },
    title:{
        fontWeight: theme.font.weight.medium,
        color: theme.colors.grey.primary,
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
    },
});

export default FeedPost;
