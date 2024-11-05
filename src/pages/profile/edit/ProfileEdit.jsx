import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import React, { useState } from 'react';
import Input from './components/Input';
import ImageButton from './components/ImageButton';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ProfileEdit() {
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [Major, setMajor] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [selectedMeetingTypes, setSelectedMeetingTypes] = useState([]);

  const imageSources = {
    '인문학/책/글': 'humanitiesImg',
    '사진/영상': 'PhotographyIcon',
  };

  const handleMeetingTypeSelect = (type) => {
    setSelectedMeetingTypes((prev) =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('사용자가 사진 선택을 취소했습니다.');
      } else if (response.error) {
        console.log('사진 선택 중 오류 발생:', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
      }
    });
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
        placeholder={email}
      />

        <Input
        style={styles.tempInput}
        placeholder={email}
        />

        <Input
        style={styles.tempInput}
        placeholder={email}
        />

        <Input
        style={styles.tempInput}
        placeholder={email}
        />
      </View>

      <Text style={styles.headLabel}> 프로필 사진 </Text>
      <View style={styles.imgcontainer}>
      <TouchableOpacity onPress={handleChoosePhoto} style={styles.button}>
        {profileImg ? (
          <Image source={profileImg} style={styles.image} />
        ) : (
          <Text style={styles.buttonText}>기본 프로필</Text>
        )}
      </TouchableOpacity>
    </View>



      <Text style={styles.headLabel}> 선호 모임을 다시 설정합니다 </Text>
      <View style={styles.imageGroup}>
        {['인문/책/글', '사진/영상', '운동', '외국/언어', '음악/악기', '댄스/무용', '공연/축제', '캠핑/여행', '봉사활동', '학술/연구', '면접/취준', '게임/오락'].map((type) => (
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

      <View style={styles.btmtextcontainer}>
      <TouchableOpacity onPress={console.log('logout')}>
        <Text style={styles.unEditableLabel}>로그아웃 </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={console.log('out~')}>
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