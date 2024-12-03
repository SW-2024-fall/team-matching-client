import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import UserTokenContext from '../../../../hooks/UserTokenContext';
import { useContext } from 'react'

const AttendanceCheck = ({ id , attendanceState, setAttendanceState}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userToken, setUserToken} = useContext(UserTokenContext);
  const [attendee, setattendee] = useState([]);
  const Attend = {
    "지각":"LATE",
    "출석":"ATTENDED",
    "불참":"ABSENT",
    "무단결석":"TRUANCY"
  }


  const Major = {
    PUBLIC_ADMINISTRATION: "행정학과",
    INTERNATIONAL_RELATIONS: "국제관계학과",
    ECONOMICS: "경제학부",
    SOCIAL_WELFARE: "사회복지학과",
    TAXATION: "세무학과",
    BUSINESS_ADMINISTRATION: "경영학부",
    ELECTRICAL_AND_COMPUTER_ENGINEERING: "전자전기컴퓨터공학부",
    COMPUTER_SCIENCE: "컴퓨터과학부",
    CHEMICAL_ENGINEERING: "화학공학과",
    MECHANICAL_AND_INFORMATION_ENGINEERING: "기계정보공학과",
    MATERIALS_SCIENCE_AND_ENGINEERING: "신소재공학과",
    CIVIL_ENGINEERING: "토목공학과",
    ARTIFICIAL_INTELLIGENCE: "인공지능학과",
    ENGLISH_LANGUAGE_AND_LITERATURE: "영어영문학과",
    KOREAN_LANGUAGE_AND_LITERATURE: "국어국문학과",
    KOREAN_HISTORY: "국사학과",
    PHILOSOPHY: "철학과",
    CHINESE_LANGUAGE_AND_CULTURE: "중국어문화학과",
    MATHEMATICS: "수학과",
    STATISTICS: "통계학과",
    PHYSICS: "물리학과",
    LIFE_SCIENCE: "생명과학과",
    ENVIRONMENTAL_HORTICULTURE: "환경원예학과",
    APPLIED_CHEMISTRY: "융합응용화학과",
    ARCHITECTURAL_ENGINEERING: "건축학부(건축공학)",
    ARCHITECTURE: "건축학부(건축학)",
    URBAN_ENGINEERING: "도시공학과",
    TRANSPORTATION_ENGINEERING: "교통공학과",
    LANDSCAPE_ARCHITECTURE: "조경학과",
    URBAN_ADMINISTRATION: "도시행정학과",
    URBAN_SOCIOLOGY: "도시사회학과",
    GEOINFORMATICS: "공간정보공학과",
    ENVIRONMENTAL_ENGINEERING: "환경공학부",
    MUSIC: "음악학과",
    DESIGN: "디자인학과",
    SCULPTURE: "조각학과",
    SPORTS_SCIENCE: "스포츠과학과",
    LIBERAL_STUDIES: "자유전공학부",
    CONVERGENCE_STUDIES: "융합전공학부"
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/meetings/${id}/members`, { 
          method: "GET",
          headers: {'Authorization': `Bearer ${userToken}`} 
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setattendee(json.data.member)
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, userToken]);
  
  const ids = attendee.map((attendee) => ({
    userId: attendee.id,
    attendanceState: null
  }));

  useEffect(() => {
    if (attendee.length > 0) {
      setAttendanceState(ids);
    }
  }, []);

  
  
  const [statuses, setStatuses] = useState({});
  
  const handleStatusChange = (userId, status) => {
    // setAttendanceState((prev) => ({
    //   ...prev,
    //   [id]: status,
    // }));

    setAttendanceState((prev) => {
      // 배열에서 해당 userId를 찾아서 수정
      return prev.map(item => 
        item.userId === userId ? { ...item, attendanceState: Attend[status] } : item
      );
    });
  };
  
  console.log("attendee = "+JSON.stringify(attendanceState));
  
  return (
    <ScrollView style={styles.container}>
      {attendee.map((attendee) => (
			<View key={attendee.id} style={styles.attendeeContainer}>
			<Image source={{ uri: attendee.profileUrl }} style={styles.profileImage} />
			<View style={styles.infoContainer}>
			<View style={styles.row}>
				<Text style={styles.name}>{attendee.name}</Text>
				<View style={styles.buttonsContainer}>
				{['출석', '불참', '무단 결석', '지각'].map((status) => (
					<TouchableOpacity
					key={status}
					style={[
						styles.statusButton,
            

            attendanceState.some(item => item.userId === attendee.id && item.attendanceState === Attend[status]) && styles.selectedButton
					]}
					onPress={() => handleStatusChange(attendee.id, status)}
					>
					<Text style={styles.buttonText}>{status}</Text>
					</TouchableOpacity>
				))}
				</View>
			</View>
            <Text style={styles.description}>{Major[attendee.major]} | {attendee.studentId} | {attendee.phoneNumber}</Text>
            </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
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
