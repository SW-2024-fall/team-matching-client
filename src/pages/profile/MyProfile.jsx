import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Layout from '@layout/layout';
import ProfileInfo from '@components/ProfileInfo'; // ProfileInfo 컴포넌트 임포트

const MyProfile = () => {
    // 사용자 데이터 정의
    const userData = {
        id: '1',
        name: '홍길동',
        major: '컴퓨터공학',
        studentID: '20230001',
        attendanceScore: '95%',
        features: '성실함, 협업 능력',
        profileURL: 'null' // 사용자 프로필 이미지 URL
    };

    return (
        <Layout>
            <View style={styles.container}>
                <ProfileInfo 
                    id={userData.id}
                    name={userData.name}
                    major={userData.major}
                    studentID={userData.studentID}
                    attendanceScore={userData.attendanceScore}
                    features={userData.features}
                    profileURL={userData.profileURL}
                />
        </View>
        </Layout>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff', // 배경 색
    },
});

export default MyProfile;
