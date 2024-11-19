import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // 아이콘 사용을 위해 expo/vector-icons 추가
import {theme} from '../../../styles/ThemeStyles';

const FloatingButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialIcons name="add" style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20, // 화면 하단에서의 위치
        right: 20, // 화면 오른쪽에서의 위치
        width: 70, // 버튼의 가로 크기
        height: 70, // 버튼의 세로 크기
        borderRadius: 35,
        backgroundColor: theme.colors.blue.primary, // 버튼 배경색
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
    },
    icon: {
        color: 'white', // 아이콘 색상
        fontSize: 30, // 아이콘 크기
    },
});

export default FloatingButton;
