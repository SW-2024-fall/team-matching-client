import React, { useState } from 'react';
import { Text, Pressable, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import MeetingInfo from '../../components/Meeting/MeetingInfo/MeetingInfo';
import styled from 'styled-components/native';
import { theme } from '../../styles/ThemeStyles';
import TeamMemberList from '../../components/Meeting/MeetingMember/TeamMemberList';
import WatingMemberList from '../../components/Meeting/MeetingMember/WatingMembetList';
import CommentView from '../../components/Meeting/MeetingInfo/CommentView';
import VerifyEmail from '../auth/register/VerifyEmail';
import { WithLocalSvg } from 'react-native-svg/css';
import runningPhoto from '../../assets/runningPhoto.svg';
import { greyBlueColors } from '../../styles/ThemeStyles';
import uploadBtn from '../../assets/uploadBtn.svg';
import ActivityDatail from '../../components/ActivityDetail/ActivityDetail';
import Register from '../auth/register/Register';
import MeetingRecordList from '../../components/Meeting/MeetingRecordList/MeetingRecordList';
const screenWidth = Dimensions.get('window').width;

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
  const { id, title } = route.params;

  const [activeTab, setActiveTab] = useState(0); // 0: 모임 정보, 1: 구성원, 2: 활동 내역

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    // <VerifyEmail></VerifyEmail>
    // <Register></Register>
    // <ActivityDatail></ActivityDatail>
    <Layout screen={PAGES.MEETING} title={title}>
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

        {activeTab === 0 && <MeetingInfo title={title} />}
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
    </Layout>
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

