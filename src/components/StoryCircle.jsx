import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {theme} from '../styles/ThemeStyles';

const StoryCircle = ({ imageUrl, userId }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Profile.jsx', { userId }); // 사용자 프로필 페이지로 이동하고 userId를 전달
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: 10, // 각 스토리 원 사이의 여백
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 0,
        //borderColor: '#fff',
        backgroundColor: theme.colors.grey.light, // 이미지가 로드되지 않을 경우의 배경색
    },
});

export default StoryCircle;
