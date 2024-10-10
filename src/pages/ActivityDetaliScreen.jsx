import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Input from '../components/Input';
import ImageButton from '../components/ImageButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RadioButtonGroup from '../components/RadioButtonGroup';
import { launchImageLibrary } from 'react-native-image-picker';
import { Calendar } from 'react-native-calendars';


const CreateMeetingScreen = () => {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activityDetails, setActivityDetails] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [images, setImages] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    toggleCalendar();
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const togglePublic = () => {
    setIsPublic(!isPublic);
  };

  const addImage = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImages((prevImages) => [...prevImages, ...response.assets]);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>제목을 작성해 주세요</Text>
      <Input
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>활동 날짜를 선택해 주세요</Text>
      <TouchableOpacity onPress={toggleCalendar} style={styles.datePicker}>
        <Text>{selectedDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>모임 활동 내역을 작성해 주세요</Text>
      <Input
        placeholder="구체적인 활동 내역을 쓰세요."
        value={activityDetails}
        onChangeText={setActivityDetails}
        multiline
      />

<Text style={styles.label}>선택 활동 사진 (최대 5장)</Text>
      <TouchableOpacity onPress={addImage} style={styles.imageButton}>
        <Text style={styles.imageButtonText}>+</Text>
      </TouchableOpacity>

      <View style={styles.imageGroup}>
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img.uri }}
            style={styles.image}
          />
        ))}
      </View>

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

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  imageButton: {
    backgroundColor: '#E5E8EB',
    padding: 10,
	width: 70,
	height: 70,
    borderRadius: 12,
    marginTop: 10,
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
    width: 50,
    height: 50,
	borderRadius: 10,
    margin: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  activeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  inactiveButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  participant: {
    marginTop: 10,
  },
});

export default CreateMeetingScreen;