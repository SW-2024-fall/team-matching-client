import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import Button from './components/Button';
import ImageButton from './components/ImageButton';
import { View, Alert, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import UserTokenContext from '../../../hooks/UserTokenContext';
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';


export default function ProfileEdit() {
  
  const nav = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [studentId, setStudentId] = useState('');
  const [Major, setMajor] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [selectedMeetingTypes, setSelectedMeetingTypes] = useState([]);
  const {accessToken, setUserToken} = useContext(UserTokenContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const imageSources = {
    '인문학/책/글': require('./img/literatureicon.png'),
    '사진/영상':  require('./img/photographyicon.png'),
    '학술/연구':  require('./img/researchicon.png'),
    '운동': require('./img/exerciseicon.png'),
    '외국/언어': require('./img/languageicon.png'),
    '음악/악기': require('./img/musicicon.png'),
    '댄스/무용': require('./img/danceicon.png'),
    '면접/취준': require('./img/job_searchicon.png'),
    '공연/축제': require('./img/festivalicon.png'),
    '캠핑/여행': require('./img/travelicon.png'),
    '봉사활동': require('./img/volunteericon.png'),
    '게임/오락': require('./img/entertainmenticon.png'),
    '기타': './img/etcicon.png',
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users`, { 
            method: "GET",
            headers: {'Authorization': `Bearer ${accessToken}`} 
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setName(json.data.name);
        setEmail(json.data.email);
        setProfileImg(json.data.profileUrl);
        setMajor(json.data.major);
        setStudentId(json.data.studentId);
        setPhoneNo(json.data.phoneNumber);
        // setPreferredCategories(json.data.preferredCategories);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const handleNext = async () => {

    const MEETING_CATEGORY = {
      '인문학/책/글': 'LITERATURE',
      '사진/영상': 'PHOTOGRAPHY',
      '학술/연구': 'RESEARCH',
      '운동': 'EXERCISE',
      '외국/언어': 'LANGUAGE',
      '음악/악기': 'MUSIC',
      '댄스/무용': 'DANCE',
      '면접/취준': 'JOB_SEARCH',
      '공연/축제': 'FESTIVAL',
      '캠핑/여행': 'TRAVEL',
      '봉사활동': 'VOLUNTEER',
      '게임/오락': 'ENTERTAINMENT',
      '기타': 'ETC',
    };
    // 배열로 전환필요
    const apiMeetingCategory = selectedMeetingTypes.map((type) => MEETING_CATEGORY[type]);

    const formData = new FormData();

    //profile 변경
    if (profileImg) {
      formData.append('profileImage', {
        uri: profileImg,
        name: 'profile_image.jpg', // 파일 이름
        type: 'image/jpeg', // MIME 타입
      });
    }

    const user = {
      preferredCategories: apiMeetingCategory,
    }

    formData.append('user', {"string": JSON.stringify(user), type: "application/json"});

    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      Alert.alert('성공', '프로필이 수정되었습니다.');
      nav.navigate(PAGES.MAIN,{});
    } catch (error) {
      Alert.alert('오류', '프로필수정에 실패했습니다. 다시 시도해 주세요.');
      console.error('Failed to edit profile:', error);
    }
  };

  const handleMeetingTypeSelect = (type) => {
    setSelectedMeetingTypes((prev) =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert('사진 라이브러리에 접근할 수 없습니다.');
        return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
        selectionLimit: 1, // 최대 5장 선택 가능
    });
    console.log(result);
    if (!result.cancelled) {
        const newImage = result.assets[0].uri;
        setProfileImg(newImage)
    }
  };

  const handleLogout = () => {
    setUserToken(null);
    nav.navigate(PAGES.LOGIN);
  }

  const handleQuit = async () => {
    setUserToken(null);
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      Alert.alert('성공', '탈퇴되었습니다.');
      nav.navigate(PAGES.LOGIN,{});
    } catch (error) {
      Alert.alert('오류', '오류가 발생했습니다. 다시 시도해주세요.');
    }

  }
  return (
    <Layout screen={PAGES.PROFILE_EDIT}>
      <ScrollView style={styles.container}>

      <View style={styles.TextContainer}>
      <Text style={styles.headLabel}>이메일  </Text>
      <Text style={styles.unEditableLabel}>수정불가</Text>
      </View>
      
      <Input
        style={styles.emailInput}
        placeholder={email}
      />

      <View style={styles.TextContainer}>
      <Text style={styles.headLabel}>기본정보  </Text>
      <Text style={styles.unEditableLabel}>수정불가</Text>
      </View>

      <View style={styles.inputcontainer}>
      <Input
        style={styles.tempInput}
        placeholder={name}
      />

        <Input
        style={styles.tempInput}
        placeholder={phoneNo}
        />

        <Input
        style={styles.tempInput}
        placeholder={studentId}
        />

        <Input
        style={styles.tempInput}
        placeholder={Major}
        />
      </View>

      <Text style={styles.headLabel}> 프로필 사진 </Text>
      <View style={styles.imgcontainer}>
      <TouchableOpacity onPress={handleChoosePhoto} style={styles.button}>
        {profileImg ? (
          <Image source={{uri: profileImg}} style={styles.image} />
        ) : (
          <Text style={styles.buttonText}>기본 프로필</Text>
        )}
      </TouchableOpacity>
    </View>



      <Text style={styles.headLabel}> 선호 모임을 다시 설정합니다 </Text>
      <View style={styles.imageGroup}>
        {['인문학/책/글', '사진/영상', '운동', '외국/언어', '음악/악기', '댄스/무용', '공연/축제', '캠핑/여행', '봉사활동', '학술/연구', '면접/취준', '게임/오락'].map((type) => (
                  <ImageButton
                  key={type}
                  title={type}
                  onPress={() => handleMeetingTypeSelect(type)}
                  imageSource={imageSources[type]} // image path REQUIRED!!
                  isSelected={selectedMeetingTypes.includes(type)}
                  style = {styles.ImageButton}
                />
        ))}
      </View>

      <Button title="저장" onPress={handleNext} isNextButton={true} />

      <View style={styles.btmtextcontainer}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.unEditableLabel}>로그아웃 </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleQuit}>
        <Text style={styles.unEditableLabel}> 탈퇴하기</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  TextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailInput: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 12,
  },
  tempInput: {

  },
  imageGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 가로로 배열
    flexWrap: 'wrap', // 여러 줄로 감싸기
  },
  imgcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ImageButton: {
    width: '13%',
    marginVertical: 'space-between',
  },
  headLabel: {
    fontsize: 14,
    fontWeight: 'bold',
    color : '#333D4B'
  },
  unEditableLabel: {
    fontsize: 14,
    color : '#B0B8C1'
  },
  button: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#333D4B',
    borderRadius: 12,
    width: 70,
    height: 70,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  btmtextcontainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputcontainer: {
    marginBottom: 30,
  },
});