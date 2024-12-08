import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Pressable,View } from 'react-native';
import { theme } from '../../../styles/ThemeStyles';
import { useNavigation } from '@react-navigation/native';
import { PAGES } from '../../../navigation/constant';
const EditProfileButton = () => {
    const nav = useNavigation();

    return (
        <View>
            <Pressable style={styles.button} onPress={()=>nav.navigate(PAGES.PROFILE_EDIT)}>
                <Text style={styles.buttonText}>프로필 수정하기</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.blue.primary, // 버튼 배경색
        paddingVertical: 10,
        borderRadius: theme.border.radius.primary,
        alignItems: 'center',
        marginTop: 20,
        flex : 1,
        width: '100%' ,
    },
    buttonText: {
        color: theme.colors.background.primary,
        fontSize: theme.font.size.primary,
        fontWeight: `${theme.font.weight.bold}`,
    },
});

export default EditProfileButton;