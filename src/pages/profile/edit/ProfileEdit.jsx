import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import React, { useState } from 'react';
import Input from './components/Input';
import ImageButton from './components/ImageButton';
import { Alert, View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export default function ProfileEdit() {
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [Major, setMajor] = useState('');
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

  return (
    <Layout screen={PAGES.PROFILE_EDIT}>
      <ScrollView style={styles.container}>

      <View style={styles.TextContainer}>
      <Text style={styles.headLabel}>이메일  </Text>
      <Text style={styles.unEditableLabelLabel}>수정불가</Text>
      </View>
      
      <Input
        style={styles.emailInput}
        placeholder={email}
        readonly
      />

      <View style={styles.TextContainer}>
      <Text style={styles.headLabel}>기본정보  </Text>
      <Text style={styles.unEditableLabelLabel}>수정불가</Text>
      </View>

      <Input
        style={styles.tempInput}
        placeholder={email}
        readonly
      />

        <Input
        style={styles.tempInput}
        placeholder={email}
        readonly
        />

        <Input
        style={styles.tempInput}
        placeholder={email}
        readonly
        />

        <Input
        style={styles.tempInput}
        placeholder={email}
        readonly
        />

      <Text style={styles.headLabel}> 프로필 사진 </Text>



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
});