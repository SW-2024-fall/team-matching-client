import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import React, { useState } from 'react';
import { Alert, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Input from './components/Input';
import AttendanceCheck from './components/AttendanceCheck';
import * as ImagePicker from 'expo-image-picker'
import Button from './components/Button';
import { Calendar } from 'react-native-calendars';

export default function MeetingHistoryCreate() {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [activityDetails, setActivityDetails] = useState('');
  const [activityPlace, setActivityPlace] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [images, setImages] = useState([]);

  const handleNext = async () => {

  const formData = new FormData();

  const historyData = {
    title: title,
    content: activityDetails,
    date: selectedDate,
    isPublic: isPublic,
    meetingId: 10,
    location: activityPlace,
    attendanceStates: [
      {
        userId: "test",
        attendanceState: "TRUANCY"
      },
      {
        userId: "test3",
        attendanceState: "LATE"
      }
    ]
  };

  formData.append('history', {"string": JSON.stringify(historyData), type: "application/json"});

  images.forEach((image, index) => {
    formData.append('files', {
      uri : image.uri,
      name : 'image_${index}.jpg',
      type : 'image/jpeg'
    })
  })

  try {
    const response = await fetch('http://localhost:8080/api/histories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    Alert.alert('성공', '모임 기록이 로 생성되었습니다.');
    console.log('Created History:', response.data);
  } catch (error) {
    Alert.alert('오류', '모임 기록 생성에 실패했습니다. 다시 시도해 주세요.');
    console.error('Failed to create History:', error);
  }
};


  const removeImage = (uri) => {
    setImages((prevImages) => prevImages.filter(image => image !== uri));
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const getFormattedDate = (date) => {
    return date ? date.toLocaleDateString() : '';
  };

  const togglePublic = () => {
    setIsPublic(!isPublic);
  };

  const addImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('사진 라이브러리에 접근할 수 없습니다.');
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 5, // 최대 5장 선택 가능
    });

    if (!result.cancelled) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newImages];
        return updatedImages.slice(0, 5); // 최대 5장 유지
      });
    }
  };

  return (
    <Layout screen={PAGES.MEETING_HISTORY_CREATE}>
      <ScrollView style={styles.container}>
      <Text style={styles.label}>제목을 작성해 주세요</Text>
      <Input
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
      />

<Text style={styles.label}>활동 날짜를 선택해 주세요</Text>
<Calendar
        // 현재 날짜 강조
        markedDates={{
          [selectedDate]: {
            selected: true,
            dotColor: 'blue', // 선택된 날짜의 동그라미 색상
            // 스타일을 추가로 설정할 수 있습니다.
            selectedColor: 'lightblue', // 선택된 날짜의 배경 색상
          },
        }}
        onDayPress={onDayPress} // 날짜 선택 시 호출되는 함수
        style={styles.calendar}
        // 그 외 필요한 속성들
        enableSwipeMonths={true} // 월을 스와이프하여 전환 가능
      />

      <Text style={styles.label}>모임 활동 내역을 작성해 주세요</Text>
      <Input
        placeholder="구체적인 활동 내역을 쓰세요."
        value={activityDetails}
        onChangeText={setActivityDetails}
        multiline
      />

      <Text style={styles.label}>선택 활동 사진 (최대 5장)</Text>

      <View style={styles.imageGroup}>
        {images.map((uri, index) => (
          <TouchableOpacity key={index} onPress={() => removeImage(uri)}>
            <Image
              source={{ uri }}
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
      <TouchableOpacity onPress={addImage} style={styles.imageButton}>
        <Text style={styles.imageButtonText}>+</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.label}>활동 장소를 작성해주세요</Text>
      <Input
        placeholder="백주년기념관 나동 990호"
        value={activityPlace}
        onChangeText={setActivityPlace}
      />

      <Text style={styles.label}>게시글 공개 여부를 선택해 주세요</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={togglePublic} style={isPublic ? styles.activeButton : styles.inactiveButton}>
          <Text>공개</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePublic} style={!isPublic ? styles.activeButton : styles.inactiveButton}>
          <Text>비공개</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>출석 체크</Text>
      {participants.map((participant, index) => (
        <View key={index} style={styles.participant}>
          <Text>{participant.name}</Text>
        </View>
      ))}

	  <AttendanceCheck />
  
    <Button title="저장" onPress={handleNext} isNextButton={true} />

    </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginTop: 20,
    fontSize: 14,
	fontWeight: 'bold',
	color: '#333D4B',
  },
  calendar: {
    borderColor: '#ddd',
    width: '90%',
  },
  imageButton: {
    backgroundColor: '#E5E8EB',
	  width: 70,
	  height: 70,
    borderRadius: 12,
    margin:5,
    alignItems: 'center',
	justifyContent: 'center',
  },
  imageButtonText: {
    color: '#fff',
  },
  imageGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
	  borderRadius: 12,
    margin: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  activeButton: {
    backgroundColor: '#0082FF',
    padding: 10,
    borderRadius: 12,
	  marginRight: 10,
  },
  inactiveButton: {
    backgroundColor: '#FFFFFF',
	  borderColor: '#B0B8C1',
	  borderWidth: 1,
    padding: 10,
    borderRadius: 12,
	  marginRight: 10,
  },
  participant: {
    marginTop: 10,
  },
});