import React, { useEffect, useState } from 'react';
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
const screenWidth = Dimensions.get('window').width;

export const meetingData = {
  name: "모임 이름 예시!!",
	type: "REGULAR", // ONE_TIME
	title: "모임 모집글 제목", //nullable
	categories: ["EXCERCISE", "RESEARCH"], // enum MeetingCategory
	features: [ "친목", "몰라", "뭐_넣지" ],
	analyzed_features: [ "분석된_특징", "어떨려나" ],
	analyzed_introduction: "승부에 진심이 사람들이 모인 모임이에요! 열정적으로 참여하고 싶은 분께 적절할 것 같아요!",
	content: "모임 설명 다 넣어서 드릴게요", // nullable
	thumbnailUrls: 'url1',
	currentParticipant: 1,
	maxParticipant: 2,
	startDate: "2023.11.12",
	endDate: "2024.1.2",
	likeCount: 10,
	isLiked: true, // 현재 보고 있는 사용자가 좋아요을 눌렀는지
	commentCount: 10,
	scrapCount: 10,
	days: [ "MON", "WED", "FRI"], // nullable,
	meta: "주인장이 설정한 추가 모임 정보",
	location: "백주년기념관 나동 980호",
	startTime: "20:00",
	endTime: "21:30",
	isRecruiting: true,

}
const comments = [
  {
    name: '김철수',
    department: '컴퓨터공학과',
    studentId: '20학번',
    text: '이 글 너무 유익하네요!',
    replies: [
      {
        name: '이영희1',
        department: '전기전자공학과',
        studentId: '20학번',
        text: '동의합니다!',
        replies: [],
      },
      {
        name: '이영희2',
        department: '전기전자공학과',
        studentId: '20학번',
        text: '동의합니다!',
        replies: [],
      },
    ],
  },
  {
    name: '김철수2',
    department: '컴퓨터공학과',
    studentId: '20학번',
    text: '이 글 너무 유익하네요!',
    replies: [
      {
        name: '이영희2-1',
        department: '전기전자공학과',
        studentId: '20학번',
        text: '동의합니다!',
        replies: [],
      },
    ],
  },
];

export default function Meeting() {
  const route = useRoute();
  // const { id, title } = route.params;

  const [activeTab, setActiveTab] = useState(0); // 0: 모임 정보, 1: 구성원, 2: 활동 내역

  //**Get meeting Info**
  // const meetingId = 1;
  // const [meetingData, setMeetingData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchMeetingData = async () => {
  //     try {
  //       const response = await fetch(`/api/meeting/${meetingId}`);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setMeetingData(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchMeetingData();
  // })
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
  /////////////////////////////
  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    // <MeetingHistory></MeetingHistory>
    // <VerifyEmail></VerifyEmail>
    // <Register></Register>
    <Layout screen={PAGES.MEETING} title={meetingData.name}>
      <Container>
        <Header>
          <WithLocalSvg
            asset={runningPhoto}
          />
        </Header>
        <TabContainer>
          <TabWrapper
            isActive={activeTab === 0}
            onPress={() => handleTabPress(0)}>
            <Tab isActive={activeTab === 0}>모임 정보</Tab>
          </TabWrapper>
          <TabWrapper
            isActive={activeTab === 1}
            onPress={() => handleTabPress(1)}>
            <Tab isActive={activeTab === 1}>구성원</Tab>
          </TabWrapper>
          <TabWrapper
            isActive={activeTab === 2}
            onPress={() => handleTabPress(2)}>
            <Tab isActive={activeTab === 2}>활동 내역</Tab>
          </TabWrapper>
        </TabContainer>

        {activeTab === 0 && <MeetingInfo title={meetingData.name} />}
        {activeTab === 0 && <Line></Line>}
        {activeTab === 0 && <CommentView comments={comments} />}
        {activeTab === 0 && <CommentInputWrapper>
          <CommentInput placeholder="댓글 예시입니다."></CommentInput>
          <UploadBtnWraaper><WithLocalSvg
            asset={uploadBtn} /></UploadBtnWraaper>
        </CommentInputWrapper>}
        {activeTab === 1 && <WatingMemberList></WatingMemberList>}
        {activeTab === 1 && <Line></Line>}
        {activeTab === 1 && <TeamMemberList></TeamMemberList>}
        {activeTab === 2 && <MeetingRecordList></MeetingRecordList>}
        <Pressable onPress={() => navigation.navigate(PAGES.MAIN)}></Pressable>
      </Container>
    </Layout >
  );
}

const Container = styled.ScrollView`
  width:100%;
`;
const Header = styled.View`
  width:100%;
  aspectRatio: ${screenWidth} / 230,
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

