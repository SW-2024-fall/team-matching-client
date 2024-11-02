import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // 아이콘 사용을 위해 expo/vector-icons 추가

const FloatingActionButton = ({ onPress }) => {
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
        width: 60, // 버튼의 가로 크기
        height: 60, // 버튼의 세로 크기
        borderRadius: 30, // 동그란 모양을 만들기 위한 반지름
        backgroundColor: '#007AFF', // 버튼 배경색
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
        elevation: 5, // 안드로이드의 그림자 효과
        shadowColor: '#000', // iOS의 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // iOS 그림자 위치
        shadowOpacity: 0.25, // iOS 그림자 투명도
        shadowRadius: 3.5, // iOS 그림자 반경
    },
    icon: {
        color: 'white', // 아이콘 색상
        fontSize: 30, // 아이콘 크기
    },
});

export default FloatingActionButton;
