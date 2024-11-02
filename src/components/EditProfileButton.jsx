import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '@styles/ThemeStyles';

const EditProfileButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>프로필 수정하기</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.blue.primary, // 버튼 배경색
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: theme.border.radius.primary,
        alignItems: 'center',
        marginTop: 20,
        flex : 1,
        width: '100%' ,
    },
    buttonText: {
        color: theme.colors.background.primary,
        fontSize: theme.font.size.small,
        fontWeight: theme.font.weight.bold,
    },
});

export default EditProfileButton;
