import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Button from '../components/Button'; // 경로를 상황에 맞게 수정하세요.
import Input from '../components/Input';
import DayButton from '../components/DayButton';
import ImageButton from '../components/ImageButton';
import DateTimePickerModel from 'react-native-modal-datetime-picker';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker'
import RadioButtonGroup from '../components/RadioButtonGroup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectLabel from '../components/SelectLabel';

const CreateMeetingScreen = () => {
  const [meetingName, setMeetingName] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [meetingTopic, setMeetingTopic] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [additionalInfo, setadditionalInfo] = useState([]);

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState(''); // 입력 필드 상태
  const [isEditing, setIsEditing] = useState(false);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  
  const [startHour, setStartHour] = useState('00');
  const [startMinute, setStartMinute] = useState('00');
  const [endHour, setEndHour] = useState('00');
  const [endMinute, setEndMinute] = useState('00');

  const [selectedDate, setSelectedDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedMeetingTypes, setSelectedMeetingTypes] = useState([]); //모임유형... 일회성/정기의 타입과 구분필요
  
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  
  const [participantMethod, setParticipantMethod] = useState('');
  
  const handleDaySelect = (day) => {
    setSelectedDays((prev) => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };


  // 정기/일회성 이동 시 요일 초기화 필요
  // const handleMeetingType = (type) => {
  //   setMeetingType(type);
  //   if (type === '일회성 모임')
  //     setSelectedDays([]);
  // }

  const imageSources = {
    '인문학/책/글': 'humanitiesImg',
    '사진/영상': 'PhotographyIcon',
  };

  const handleMeetingTypeSelect = (type) => {
    setSelectedMeetingTypes((prev) =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

const handleButtonPress = () => {
  setIsEditing(true);
}

const handleKeyPress = (event) => {
  if (event.nativeEvent.key === 'Enter') {
    setText('');
    setIsEditing(false);
  }
}

const addTag = () => {
  if (inputValue.trim()) {
    setTags((prevTags) => ['#'+inputValue.trim(), ...prevTags]); // 태그 추가
    setInputValue(''); // 입력 필드 초기화
    setIsEditing(false); // 입력 필드 숨기기
  }
}

const removeTag = (tagToRemove) => {
  setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
};

  const handleNext = () => {
    if (!meetingType) {
      alert('모임 유형을 선택해 주세요.'); // 필수 선택 경고
    }
    if (!participantMethod) {
      alert('참여자 선택 방식을 선택해 주세요.'); // 필수 선택 경고
      return;
    }
  };

  
  const showStartPicker = () => {
      setStartPickerVisible(true);
    };
  
  const hideStartPicker = () => {
      setStartPickerVisible(false);
    };
  
    const handleStartConfirm = (date) => {
      setStartTime(date);
      hideStartPicker();
    };
  
    const showEndPicker = () => {
      setEndPickerVisible(true);
    };
  
    const hideEndPicker = () => {
      setEndPickerVisible(false);
    };
  
    const handleEndConfirm = (date) => {
      setEndTime(date);
      hideEndPicker();
    };

    const onDayPress = (day) => {
      if (!meetingType) {
        setErrorMessage('모임 유형을 먼저 선택해주세요.');
        return ;
      }

      setErrorMessage('');

      if (meetingType === '일회성 모임') {
        setSelectedDate(day.dateString);
        setStartDate('');
        setEndDate('');
      } else if (meetingType === '정기 모임') {
        if (!startDate) {
          setStartDate(day.dateString);
        } else if (!endDate) {
          setEndDate(day.dateString);
        } else {
          setStartDate(day.dateString);
          setEndDate('');
        }
      }
    };

    const getMarkedDates = () => {
      const markedDates = {};
  
      if (meetingType === '일회성 모임' && selectedDate) {
        markedDates[selectedDate] = { selected: true, marked: true, dotColor: 'blue' };
      } else if (meetingType === '정기 모임' && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dateRange = [];
  
        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
          dateRange.push(new Date(d).toISOString().split('T')[0]);
        }
  
        dateRange.forEach((date) => {
          markedDates[date] = { selected: true, color: 'blue' };
        });
      }
  
      return markedDates;
    };
  

  return (
    <ScrollView style={styles.container}>
      
      {/* <DefaultHeader /> */}
      <Text style={styles.label}>모임 유형을 선택해 주세요</Text>
      <RadioButtonGroup
        options={['정기 모임', '일회성 모임']}
        selectedOption={meetingType}
        onSelect={setMeetingType}
        selectedButtonStyle={styles.meetingTypeSelected}
        buttonStyle={styles.meetingTypeDefault}
      />
      <Text style={[{topMargin: 20,}, styles.label]}>모임 이름을 설정해 주세요</Text>
      <Input
        placeholder="모임 이름"
        value={meetingName}
        onChangeText={setMeetingName}
      />
      

      <SelectLabel style={styles.label} label= '모집글 제목을 설정해 주세요' />
      <Input
        placeholder="모집글 제목"
        value={meetingTopic}
        onChangeText={setMeetingTopic}
      />

<SelectLabel style={styles.label} label= '모임에 대해 설명해주세요' />
      <Input
        style={styles.descriptionInput}
        multiline
        placeholder='모임에 대한 설명을 최대한 상세하게 작성해주세요. 예시) 안녕하세요, 코틀린 개발에 관심 있는 여러분! 우리 "코틀린 개발자 모임"에서 함께 성장하고 네트워킹할 수 있는 기회를 제공합니다. 이 모임은 코틀린을 사용하는 개발자들이 지식을 공유하고, 최신 트렌드를 논의하며, 실제 프로젝트 경험을 나누는 장입니다.'
        value={meetingDescription}
        onChangeText={setMeetingDescription}
      />

<SelectLabel style={styles.label} label= '추가 모임 정보가 있으면 입력해주세요' />
      <Input
        placeholder="참가비 2만원 (사용 내역 공개)"
        value={additionalInfo}
        onChangeText={setadditionalInfo}
      />
      
      <SelectLabel style={styles.label} label= '모임에 대한 특징을 넣어주세요 (#해시_태그)' />
<View style={styles.tagListContainer}>
  {isEditing ? (
    <TextInput
      style={styles.defaultTag}
      placeholder="#입력하기"
      value={inputValue}
      onChangeText={setInputValue}
      onSubmitEditing={addTag} // 엔터키로 태그 추가
      autoFocus // 입력 필드 자동 포커스
      onBlur={() => setIsEditing(false)}
    />
  ) : (
  <TouchableOpacity style={styles.defaultTag} onPress={() => setIsEditing(true)}>
    <Text style={styles.tagText}>#해시_태그</Text>
  </TouchableOpacity>
  )}
  {tags.map((tag, index) => (
    <TouchableOpacity key={index} style={styles.tag} onPress = {()=>removeTag(tag)}>
      <Text style={styles.tagText}>{tag}</Text>
    </TouchableOpacity>
  ))}
</View>
      <SelectLabel style={styles.label} label= '어떤 모임인가요?' />
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

      <Text style={styles.label}>날짜를 선택해주세요</Text>
      <Calendar
        // 달력 설정
        onDayPress={onDayPress}
        markedDates={getMarkedDates()}
        markingType={'multi-dot'} // 여러 마킹 지원
        style={styles.calendar}
      />

      {errorMessage ? (
        <Text style={styles.errorMessage} > {errorMessage}</Text>
      ) : null}
      
      {meetingType === '정기 모임' && (
<>
      <Text style={styles.label}>요일을 선택해 주세요</Text>
      <View style={styles.dayGroup}>
        {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
          <DayButton 
            key={day} 
            day={day} 
            selected={selectedDays.includes(day)} 
            onPress={() => handleDaySelect(day)} 
          />
        ))}
      </View>
  </>
)}    

      <Text style={styles.label}>모임 시간을 선택해 주세요</Text>
      <View style={styles.timePickerContainer}>
        <Button title="시작 시간 선택" onPress={showStartPicker} />
        <Text>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        <Text> ~ </Text>
        <Button title="종료 시간 선택" onPress={showEndPicker} />
        <Text>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </View>

      <Text style={styles.label}>참여자 선택 방식을 선택해 주세요</Text>
      <RadioButtonGroup
        options={['선착순 모임', '모임장 수락/거절']}
        selectedOption={participantMethod}
        onSelect={setParticipantMethod}
        selectedButtonStyle={styles.particpantMethodSelected}
        buttonStyle={styles.participantMethodDefault}
      />
      

      <Button title="다음" onPress={() => {handleNext}} isNextButton={true} />
      
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="time"
        onConfirm={handleStartConfirm}
        onCancel={hideStartPicker}
      />
      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="time"
        onConfirm={handleEndConfirm}
        onCancel={hideEndPicker}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color : '#333D4B',
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dayGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20, // 아래쪽 마진 추가
  },
  
  selectText: {
    color: '#666A73',
  },
  meetingType: {
    borderRadius: 12,
    width: 89,
    height: 35,
    backgroundColor: '#FFFFFF',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    minHeight: 80,
    flexGrow: 1,
    textAlignVertical: 'top',
  },
  requiredText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },

  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: 100,
  },

  defaultTag: {
    borderRadius: 12,
    borderColor: '#B0B8C1',
    height: 35,
    borderWidth: 1,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  tagListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333D48',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
    height: 35,
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  tagText: {
    color: '#333D48',
    textAlign: 'center',
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
  meetingTypeDefault: {
    bordercolor: '#B0B8C1',
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  meetingTypeSelected: {
    bordercolor: '#B0B8C1',
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#0082FF'
  },
  participantMethodDefault: {
    bordercolor: '#B0B8C1',
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  particpantMethodSelected: {
    bordercolor: '#B0B8C1',
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#0082FF'
  },
  calendar: {
    marginVertical: 20,
  },
  errorMessage: {
    color: 'red',
  }
});


export default CreateMeetingScreen;
