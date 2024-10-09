import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Button from '../components/Button'; // 경로를 상황에 맞게 수정하세요.
import Input from '../components/Input';
import DayButton from '../components/DayButton';
import ImageButton from '../components/ImageButton';
import RadioButtonGroup from '../components/RadioButtonGroup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateMeetingScreen_page2 = () => {

	const [title, setTitle] = useState('');
	
	return (
	  <ScrollView style={styles.container}>
  
		<Text style={styles.label}>모임 유형을 선택해 주세요</Text>
		<RadioButtonGroup
		  options={['정기 모임', '일회성 모임']}
		  selectedOption={meetingType}
		  onSelect={setMeetingType}
		/>
  
		<Text style={styles.label}>모임 이름을 설정해 주세요</Text>
		<Input
		  placeholder="모임 이름"
		  value={meetingName}
		  onChangeText={setMeetingName}
		/>
  
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
		
		<Text style={styles.label}>모임 유형을 선택해 주세요</Text>
		<View style={styles.imageGroup}>
		  {['운동', '독서', '음악', '여행'].map((type) => (
					<ImageButton
					key={type}
					title={type}
					onPress={() => handleMeetingTypeSelect(type)}
					style={{
					  backgroundColor: selectedMeetingTypes.includes(type) ? '#666A73' : '#d3d3d3', // 선택된 경우 색상 변경
					}}
				  />
		  ))}
		</View>
  
		<Text style={styles.label}>모임 시간을 선택해 주세요</Text>
		<View style={styles.timePickerContainer}>
		  <Button title="시작 시간 선택" onPress={showStartPicker} />
		  <Text>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
		  <Button title="종료 시간 선택" onPress={showEndPicker} />
		  <Text>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
		</View>
	  
  
		<Text style={styles.label}>참여자 선택 방식을 선택해 주세요</Text>
		<RadioButtonGroup
		  options={['선착순 모임', '모임장 수락/거절']}
		  selectedOption={participantMethod}
		  onSelect={setParticipantMethod}
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
  });
  
  
  export default CreateMeetingScreen;
  
<Text style={styles.label}>게시글 제목을 설정해주세요</Text>
<Input
  placeholder="시대"
  value={title}
  onChangeText={setTitle}
/>