import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../styles/ThemeStyles';
import { fastImage } from 'react-native-fast-image';
import { useAuth } from '../../../context/AuthProvider';

const ProfileInfo = ({ id, name, major, studentID, attendanceScore, features, profileURL }) => {
    console.log(attendanceScore);
    return (
        <View style={styles.profileContainer}>
            <Image 
                as={fastImage}
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
                <View style={styles.featuresContainer}>
                    {features.map((feature, index) => (
                        index < 2 && <Text style={styles.features} key={index}>#{feature} </Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row', // 가로로 배치
        alignItems: 'center', // 수직 중앙 정렬
    },
    profileImage: {
        backgroundColor: theme.colors.grey.light,
        width: 80,
        height: 80,
        borderRadius: 40,

        marginRight: 16, // 이미지와 첫 번째 묶음 사이 간격
    },
    userDetailsContainer: {
        flex: 1, // 남은 공간을 차지하여 왼쪽 정렬
        justifyContent: 'center', 
        gap: 4,
    },
    name: {
        fontSize: theme.font.size.xLarge,
        color: theme.font.color.primary,
        fontWeight: `${theme.font.weight.extraBold}`,
        paddingBottom: 4,
    },
    userAcademicInfo: {
        alignItems: 'center',
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
        gap: 4,
    },
    attendanceScore: {
        color: theme.font.color.primary,
        fontSize: theme.font.size.xLarge,
        fontWeight: `${theme.font.weight.semiBold}`,
    },
    featuresContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    features: {
        color: theme.colors.blue.hover,
        fontSize: theme.font.size.primary,
        fontWeight: `${theme.font.weight.regular}`,
    },
});

export default ProfileInfo;