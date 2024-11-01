import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Layout from '@layout/layout';
import ProfileInfo from '@components/ProfileInfo';
import MeetingItem from '@components/MeetingItem';
import { theme } from '@styles/ThemeStyles';
import { PAGES } from '@navigation/constant';
import MyProfile from './MyProfile';

const mockMeetingData = [
    { id: '1', name: '모임1', preview: '모임 소개1입니다.', features: ['#특징1'], likeCount: 10, commentCount: 5, currentParticipants: 3, maxParticipants: 10, startDate: '2024-11-01', endDate: '2024-11-15' },
    { id: '2', name: '모임2', preview: '모임 소개2입니다.', features: ['#특징1'], likeCount: 12, commentCount: 3, currentParticipants: 2, maxParticipants: 8, startDate: '2024-12-01', endDate: '2024-12-15' },
];

export default function Profile({ route, navigation }) {
    const screen = route.name;
    const isMe = screen === PAGES.MYPROFILE;

    if (isMe) {
        return <MyProfile />;
    }

    return (
        <Layout screen={screen} title="Profile" navigation={navigation}>
            <View style={styles.container}>
                {/* 프로필 정보 */}
                <ProfileInfo
                    id="user-id"
                    name="홍길동"
                    major="컴퓨터공학"
                    studentID="20230001"
                    attendanceScore="출석 점수: 90%"
                    features={['#특징1', '#특징2']}
                    profileURL="https://example.com/profile.jpg" // 프로필 이미지 URL
                />

                <Text style={styles.title}>참여한 모임 목록</Text>

                {/* MeetingItem 리스트 */}
                {mockMeetingData.map((item) => (
                    <MeetingItem key={item.id} item={item} />
                ))}
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
        padding: 10,
    },
    title: {
        fontSize: theme.font.size.large,
        fontWeight: theme.font.weight.bold,
        marginVertical: 10,
        textAlign: 'left',
    },
});
