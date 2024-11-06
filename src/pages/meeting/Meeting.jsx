import React, { useEffect, useRef, useState } from 'react';
import { Text, Pressable, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import MeetingInfo from './component/MeetingInfo/MeetingInfo';
import styled from 'styled-components/native';
import TeamMemberList from './component/MeetingMember/TeamMemberList';
import WatingMemberList from './component/MeetingMember/WatingMembetList';
import CommentView from './component/MeetingInfo/CommentView';
import VerifyEmail from '../auth/register/VerifyEmail';
import { WithLocalSvg } from 'react-native-svg/css';
import runningPhoto from '../../assets/runningPhoto.svg';
import { greyBlueColors } from '../../styles/ThemeStyles';
import uploadBtn from '../../assets/uploadBtn.svg';
import Register from '../auth/register/Register';
import MeetingRecordList from './component/MeetingRecordList/MeetingRecordList';
import MeetingHistory from '../meetingHistory/MeetingHistory';
import useFetch from '../../hooks/useFetch';
import { Animated } from 'react-native';

const meetingResponse = {
  code: "SUCCESS",
  message: "string",
  data: {
    id: 0,
    userRole: "LEADER", //다른거 넣어보기
    info: {
      name: "시대짱 모여라(모임 이름)",
      type: "REGULAR",
      title: "시대짱 모집글 입니다",
      content: "시대짱이 되고 싶으면 모두 모여라!",
      thumbnailUrls: [
        "string"
      ],
      startDate: "2024-11-06",
      endDate: "2024-11-06",
      startTime: {
        hour: 0,
        minute: 0,
        second: 0,
        nano: 0
      },
      endTime: {
        hour: 0,
        minute: 0,
        second: 0,
        nano: 0
      },
      location: "백주념 기념관 나동 980호",
      currentParticipant: 2,
      minParticipant: 2,
      maxParticipant: 4,
      meta: "meta",
      categories: [
        "RESEARCH"
      ],
      features: [
        "모임장이 직접 쓴 특징", "번개", "친근한"
      ],
      analyzedFeatures: [
        "AI가 분석한 특징", "친목", "공부"
      ],
      analyzedIntroduction: "승부에 진심인 사람들이 모인 모임이에요!",
      applicationMethod: "FIRST_COME_FIRST_SERVED",
      likes: 2,
      scraps: 2
    },
    members: {
      member: [
        {
          id: "string",
          name: "홍길동",
          profileUrl: "string",
          attendenceScore: 60,
          major: "서얼",
          studentId: "19",
          phoneNumber: "010-5555-6666",
          features: [
            "도둑",
            "착함"
          ],
          role: "LEADER"
        },
        {
          id: "string",
          name: "최재원",
          profileUrl: "string",
          attendenceScore: 100,
          major: "컴퓨터과학부",
          studentId: "22",
          phoneNumber: "010-1234-5678",
          features: [
            "침착",
            "적극적"
          ],
          role: "LEADER"
        }
      ],
      requested: [
        {
          id: "string",
          name: "권민재",
          profileUrl: "string",
          attendenceScore: 90,
          major: "컴퓨터과학부",
          studentId: "21",
          phoneNumber: "010-1111-3333",
          features: [
            "귀여움",
            "활발"
          ],
          role: "LEADER"
        },
        {
          id: "string",
          name: "김혜주",
          profileUrl: "string",
          attendenceScore: 80,
          major: "컴퓨터과학부",
          studentId: "21",
          phoneNumber: "010-1111-2222",
          features: [
            "활발",
            "리더십"
          ],
          role: "LEADER"
        }
      ]
    }
  },
  page: {
    number: 0,
    size: 0,
    totalCount: 0,
    hasNext: true,
    hasPrevious: true
  }
}
export const meetingData = meetingResponse.data.info;
export default function Meeting() {
  const route = useRoute();
  // const { id, title } = route.params;
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const translateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 50], // 스크롤이 내려가면서 살짝 아래로 이동
    extrapolate: 'clamp',
  });
  const opacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0], // 스크롤이 내려가면서 투명해짐
    extrapolate: 'clamp',
  });
  const [activeTab, setActiveTab] = useState(0); // 0: 모임 정보, 1: 구성원, 2: 활동 내역

  //**Get meeting Info**
  // const [meetingData, loading, error] = useFetch(`/api/meeting/${meetingId}`)
  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }
  // if (error) {
  //   return (
  //     <View>
  //       <Text>Error: {error}</Text>
  //     </View>
  //   );
  // }
  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    // <MeetingHistory></MeetingHistory>
    // <VerifyEmail></VerifyEmail>
    // <Register></Register>
    <Layout screen={PAGES.MEETING} title={meetingData.name}>
      <Container>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false } // 애니메이션에 Native Driver 사용
          )}
          scrollEventThrottle={16} // 스크롤 이벤트가 자주 발생하도록 설정
        >
          <Header><WithLocalSvg asset={runningPhoto} /></Header>
          <TabContainer>
            <TabWrapper isActive={activeTab === 0} onPress={() => handleTabPress(0)}>
              <Tab isActive={activeTab === 0}>모임 정보</Tab></TabWrapper>
            <TabWrapper isActive={activeTab === 1} onPress={() => handleTabPress(1)}>
              <Tab isActive={activeTab === 1}>구성원</Tab></TabWrapper>
            <TabWrapper isActive={activeTab === 2} onPress={() => handleTabPress(2)}>
              <Tab isActive={activeTab === 2}>활동 내역</Tab></TabWrapper>
          </TabContainer>
          {activeTab === 0 && <MeetingInfo meetingData={meetingData} />}
          {activeTab === 0 && <Line></Line>}
          {/* {activeTab === 0 && <CommentView comments={comments} />} */}
          {activeTab === 0 && <CommentInputWrapper>
            <CommentInput placeholder="댓글 예시입니다."></CommentInput>
            <UploadBtnWraaper><WithLocalSvg
              asset={uploadBtn} /></UploadBtnWraaper></CommentInputWrapper>}
          {activeTab === 1 && (meetingResponse.data.userRole === "LEADER" || meetingResponse.data.userRole === "CO_LEADER") && <WatingMemberList memberList={meetingResponse.data.members.requested}></WatingMemberList>}
          {activeTab === 1 && (meetingResponse.data.userRole === "LEADER" || meetingResponse.data.userRole === "CO_LEADER") && <Line></Line>}
          {activeTab === 1 && <TeamMemberList memberList={meetingResponse.data.members.member} userRole={meetingResponse.data.userRole}></TeamMemberList>}
          {activeTab === 2 && <MeetingRecordList ></MeetingRecordList>}
          <Pressable onPress={() => navigation.navigate(PAGES.MAIN)}></Pressable>
        </Animated.ScrollView>
        {activeTab === 2 && <PlusBtn
          style={{ opacity, transform: [{ translateY }] }}
          onPress={() => console.log(scrollY.__getValue())}
        ><Text>+</Text></PlusBtn>}
      </Container>
    </Layout>
  );
}
const PlusBtn = styled(Animated.createAnimatedComponent(styled.Pressable`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #007aff;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-offset: 0px 2px;
  shadow-radius: 5px;
  elevation: 5;
`))``;
const Container = styled.ScrollView`
  flex:1;
`;
const Header = styled.View`
  width:100%;
`;
const Line = styled.View`
  borderBottomWidth:1px;
  width:90%;
  marginLeft:5%;
  marginTop:20px;
`;
const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TabWrapper = styled(Pressable)`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-left-width: 1px;
  border-right-width:1px;
  border-color: white;
  padding:7px;
  margin:0;
  background-color: ${({ isActive, theme }) => (isActive ? 'white' : theme.colors.blue.primary)};
`;

const Tab = styled.Text`
  color: ${({ isActive, theme }) => (isActive ? theme.font.color.primary : 'white')};
`;

const CommentInputWrapper = styled.View`
backgroundColor:#E6F3FF;
  width:${screenWidth};
  paddingLeft:12px;
  paddingRight:12px;
  paddingTop:4px;
  paddingBottom:4px;
  flexDirection:row;
`;
const CommentInput = styled.TextInput`
  backgroundColor:white;
  padding:3px;
  width:100%;
  borderRadius:12px;
  borderColor:${greyBlueColors[500]};
  border-width:1px;
`;
const UploadBtnWraaper = styled.View`
  position:absolute;
  right:18px;
  top:10px;
`;


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
