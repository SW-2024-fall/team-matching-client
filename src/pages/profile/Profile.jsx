import { React, useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Layout from '@layout/layout';
import ProfileInfo from '@pages/profile/components/ProfileInfo';
import { theme } from '../../styles/ThemeStyles';
import { PAGES } from '@navigation/constant';
import BottomTabOthers from './components/BottomTabOthers'
import { useRoute } from '@react-navigation/native';
import { getUserById } from '../../utils/user';

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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getUserById(id);
            setName(response.data.name);
            setprofileUrl(response.data.profileUrl);
            setMajor(response.data.major);
            setstudentId(response.data.studentId);
            setFeatures(response.data.features);
            setAttendanceScore(response.data.attendanceScore);
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
            <ScrollView style={styles.container}>
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

            </ScrollView>
        </Layout>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
        padding: 10,
        gap: 10,
    },
});
