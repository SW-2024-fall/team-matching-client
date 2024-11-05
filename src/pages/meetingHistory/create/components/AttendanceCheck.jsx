import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';


const AttendanceCheck = () => {
  const attendees = [
    {
      id: 1,
      name: '김혜주',
      department: '컴퓨터과학과',
      studentId: '20학번',
      phone: '010-8888-9999',
      image: 'https://example.com/image2.jpg' // 이미지 URL (예시)
    },
    {
      id: 2,
      name: '이민호',
      department: '컴퓨터과학과',
      studentId: '20학번',
      phone: '010-8888-9999',
      image: 'https://example.com/image2.jpg', // 이미지 URL (예시)
    },
    {
      id: 3,
      name: '박지민',
      department: '컴퓨터과학과',
      studentId: '20학번',
      phone: '010-8888-9999',
      image: 'https://example.com/image3.jpg', // 이미지 URL (예시)
    },
  ];

  const [statuses, setStatuses] = useState({});

  const handleStatusChange = (id, status) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {attendees.map((attendee) => (
			<View key={attendee.id} style={styles.attendeeContainer}>
			<Image source={{ uri: attendee.image }} style={styles.profileImage} />
			<View style={styles.infoContainer}>
			<View style={styles.row}>
				<Text style={styles.name}>{attendee.name}</Text>
				<View style={styles.buttonsContainer}>
				{['출석', '불참', '무단 결석', '지각'].map((status) => (
					<TouchableOpacity
					key={status}
					style={[
						styles.statusButton,
						statuses[attendee.id] === status && styles.selectedButton
					]}
					onPress={() => handleStatusChange(attendee.id, status)}
					>
					<Text style={styles.buttonText}>{status}</Text>
					</TouchableOpacity>
				))}
				</View>
			</View>
            <Text style={styles.description}>{attendee.department} | {attendee.studentId} | {attendee.phone}</Text>
            </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  attendeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // 이름과 버튼을 양쪽 끝으로 배치
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
	  marginTop: 5,
	  fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
	  marginLeft: 10,
  },
  statusButton: {
    backgroundColor: '#B0B8C1',
	  // paddingHorizontal: 2,
    // paddingVertical: 8,
    borderRadius: 4,
    marginRight: 10,
	  height: 15,
	  width: 35,
    justifyContent: 'center',

  },
  selectedButton: {
    backgroundColor: '#0082FF',
  },
  buttonText: {
    color: '#FFFFFF',
	  fontSize: 10,
    textAlign: 'center',
  },
});

export default AttendanceCheck;
