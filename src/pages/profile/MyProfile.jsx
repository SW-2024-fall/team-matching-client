import { React, useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Layout from '@layout/layout';
import ProfileInfo from '@pages/profile/components/ProfileInfo';
import EditProfileButton from '@pages/profile/components/EditProfileButton.jsx';
import { theme } from '../../styles/ThemeStyles';
import { PAGES } from '@navigation/constant';
import BottomTab from '@pages/profile/components/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProfile = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileUrl, setprofileUrl] = useState('');
    const [major, setMajor] = useState('');
    const [studentId, setstudentId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [features, setFeatures] = useState([]);
    const [preferredCategories, setPreferredCategories] = useState([]);
    const [attendanceScore, setAttendanceScore] = useState('');
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:8080/api/users`, { 
                method: "GET",
                headers: {'Authorization': `Bearer ${accessToken}`} 
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setId(json.data.id);
            setName(json.data.name);
            setEmail(json.data.email);
            setprofileUrl(json.data.profileUrl);
            setMajor(json.data.major);
            setstudentId(json.data.studentId);
            setPhoneNumber(json.data.phoneNumber);
            setPreferredCategories(json.data.preferredCategories);
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

    // const userData = {
    //     id: '1',
    //     name: '홍길동',
    //     major: '컴퓨터공학',
    //     studentID: '20230001',
    //     attendanceScore: '95%',
    //     features: '#성실함, #협업 능력',
    //     profileURL: profileImage
    // };

    
    const handleEditProfile = () => {
        console.log("프로필 수정 버튼 클릭됨");
        // 원하는 동작 추가 할 것. (프로필 수정 화면으로 이동)
    };

    return (
        <Layout screen={PAGES.PROFILE} navigation={navigation}>
            <ScrollView style={styles.profileContainer}>
                <ProfileInfo 
                    id={id}
                    name={name}
                    major={major}
                    studentID={studentId}
                    attendanceScore={attendanceScore}
                    features={features}
                    profileURL={profileUrl}
                />
                <EditProfileButton onPress={handleEditProfile} />
            </ScrollView>

            {/* Bottom Tab 추가 */}
            <BottomTab />
        </Layout>
    );
};


const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 10,
        backgroundColor: theme.colors.background.primary,
    },
});

export default MyProfile;