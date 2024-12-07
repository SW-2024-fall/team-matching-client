import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../styles/ThemeStyles';

const ProfileInfo = ({ id, name, major, studentID, attendanceScore, features, profileURL }) => {
    console.log(attendanceScore);
    return (
        <View style={styles.profileContainer}>
            <Image 
                source={profileURL ? { uri: profileURL } : null}
                style={[styles.profileImage, !profileURL && { backgroundColor: theme.colors.grey.light }]}
            />
            <View style={styles.userDetailsContainer}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.userAcademicInfo}>
                    <Text style={styles.major}>{major}</Text>
                    <Text style={styles.studentID}>{studentID}</Text>
                </View>
            </View>
            <View style={styles.userScoreFeatures}>
                <Text style={styles.attendanceScore}>{attendanceScore}점</Text>
                <Text style={styles.features}>#{features[0]} </Text>
                <Text style={styles.features}>#{features[1]} </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row', // 가로로 배치
        alignItems: 'center', // 수직 중앙 정렬
        paddingHorizontal: 16,
    },
    profileImage: {
        backgroundColor: theme.colors.grey.light,
        //width: Dimensions.get('window').width * 0.2,
        //height: Dimensions.get('window').width * 0.2,
        //borderRadius: (Dimensions.get('window').width * 0.2) / 2,
        width: 60,
        height: 60,
        borderRadius: 30,

        marginRight: 16, // 이미지와 첫 번째 묶음 사이 간격
    },
    userDetailsContainer: {
        flex: 1, // 남은 공간을 차지하여 왼쪽 정렬
        justifyContent: 'center', 
    },
    name: {
        fontSize: theme.font.size.xLarge,
        color: theme.font.color.primary,
        fontWeight: theme.font.weight.extraBold,
        paddingBottom: 4,
    },
    userAcademicInfo: {
        flexDirection: 'row',
    },
    major: {
        color: theme.font.color.primary,
        fontSize: theme.font.size.primary,
        paddingRight: 4,
    },
    studentID: {
        color: theme.font.color.primary,
        fontSize: theme.font.size.primary,
    },
    userScoreFeatures: {
        alignItems: 'flex-end', // 오른쪽 정렬
        justifyContent: 'center',
    },
    attendanceScore: {
        color: theme.font.color.primary,
        fontSize: theme.font.size.xLarge,
        fontWeight: theme.font.weight.extraBold,
        paddingBottom: 4,
    },
    features: {
        color: theme.colors.blue.hover,
        fontSize: theme.font.size.small,
        fontWeight:theme.font.weight.regular
    },
});

export default ProfileInfo;