import { React, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Layout from '@layout/layout';
import ProfileInfo from '@pages/profile/components/ProfileInfo';
import MeetingItem from '@pages/profile/components/MeetingItem';
import { theme } from '../../styles/ThemeStyles';
import { PAGES } from '@navigation/constant';
import MyProfile from './MyProfile';
import BottomTab from './components/BottomTab';
import BottomTabOthers from './components/BottomTabOthers'
import EditProfileButton from './components/EditProfileButton';
import { useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import UserTokenContext from '../../hooks/UserTokenContext';

const mockMeetingData = [
    { id: '1', name: '모임1', preview: '모임 소개1입니다.', features: ['#특징1'], likeCount: 10, commentCount: 5, currentParticipants: 3, maxParticipants: 10, startDate: '2024-11-01', endDate: '2024-11-15' },
    { id: '2', name: '모임2', preview: '모임 소개2입니다.', features: ['#특징1'], likeCount: 12, commentCount: 3, currentParticipants: 2, maxParticipants: 8, startDate: '2024-12-01', endDate: '2024-12-15' },
];
export default function Profile({ navigation }) {
    const route = useRoute();
    const{id} = route.params;
    
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [profileUrl, setprofileUrl] = useState('');
    const [major, setMajor] = useState('');
    const [studentId, setstudentId] = useState('');
    const [features, setFeatures] = useState([]);
    const [attendanceScore, setAttendanceScore] = useState('');
    const [error, setError] = useState(null);
    const { userToken, setUserToken } = useContext(UserTokenContext);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`, { 
                method: "GET",
                headers: {'Authorization': `Bearer ${userToken}`} 
            });
            if (!response.ok) {
                console.log("error!");
              throw new Error('Network response was not ok');
            }
            console.log("aaadsfasdfasfdad");
            const json = await response.json();
            console.log("test"+JSON.stringify(json));
            setName(json.data.name);
            setprofileUrl(json.data.profileUrl);
            console.log(profileUrl)
            setMajor(json.data.major);
            setstudentId(json.data.studentId);
            setFeatures(json.data.features);
            setAttendanceScore(json.data.attendanceScore);
            setLoading(false);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, []);


    console.log("external id = "+id);
    console.log("name"+name);
    return (
        <Layout screen={PAGES.PROFILE} navigation={navigation}>
            <View style={styles.container}>
                {/* 프로필 정보 */}
                <ProfileInfo
                    id="user-id"
                    name={name}
                    major={major}
                    studentID={studentId}
                    attendanceScore={attendanceScore}
                    features={features}
                    profileURL={profileUrl}// 프로필 이미지 URL
                />
                <BottomTabOthers id={id}></BottomTabOthers>

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
