import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Layout from '@layout/layout';
import ProfileInfo from '@components/ProfileInfo';
import EditProfileButton from '@components/EditProfileButton';
import { theme } from '@styles/ThemeStyles';
import { PAGES } from '@navigation/constant';
import BottomTab from '@components/BottomTab';

const MyProfile = ({ navigation }) => {
    const userData = {
        id: '1',
        name: '홍길동',
        major: '컴퓨터공학',
        studentID: '20230001',
        attendanceScore: '95%',
        features: '#성실함, #협업 능력',
        profileURL: 'null'
    };

    const handleEditProfile = () => {
        console.log("프로필 수정 버튼 클릭됨");
        // 원하는 동작 추가 할 것. (프로필 수정 화면으로 이동)
    };

    return (
        <Layout screen={PAGES.MYPROFILE} navigation={navigation}>
            <View style={styles.profileContainer}>
                <ProfileInfo 
                    id={userData.id}
                    name={userData.name}
                    major={userData.major}
                    studentID={userData.studentID}
                    attendanceScore={userData.attendanceScore}
                    features={userData.features}
                    profileURL={userData.profileURL}
                />
                <EditProfileButton onPress={handleEditProfile} />
            </View>

            {/* Bottom Tab 추가 */}
            <BottomTab />
        </Layout>
    );
};
const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: theme.colors.background.primary,
    },
});

export default MyProfile;