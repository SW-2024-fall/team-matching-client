import React, { useState } from 'react';
import { Text, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import MeetingInfo from '../../components/Meeting/MeetingInfo/MeetingInfo';
import styled from 'styled-components/native';
import { theme } from '../../styles/ThemeStyles';
import TeamMemberList from '../../components/Meeting/MeetingMember/TeamMemberList';
import WatingMemberList from '../../components/Meeting/MeetingMember/WatingMembetList';
import CommentView from '../../components/Meeting/MeetingInfo/CommentView';


const comments = [
  {
    name: '김철수',
    department: '컴퓨터공학과',
    studentId: '20201234',
    text: '이 글 너무 유익하네요!',
    replies: [
      {
        name: '이영희1',
        department: '전기전자공학과',
        studentId: '20201235',
        text: '동의합니다!',
        replies: [],
      },
      {
          name: '이영희2',
          department: '전기전자공학과',
          studentId: '20201235',
          text: '동의합니다!',
          replies: [],
        },
    ],
  },
  {
      name: '김철수2',
      department: '컴퓨터공학과',
      studentId: '20201234',
      text: '이 글 너무 유익하네요!',
      replies: [
        {
          name: '이영희2-1',
          department: '전기전자공학과',
          studentId: '20201235',
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
    <Layout screen={PAGES.MEETING} title={title}>
      <Container>
        <Header><Text>사진</Text></Header>
        <TabContainer>
          <TabWrapper
            isActive={activeTab === 0}
            onPress={() => handleTabPress(0)}
          >
            <Tab isActive={activeTab === 0}>모임 정보</Tab>
          </TabWrapper>
          <TabWrapper
            isActive={activeTab === 1}
            onPress={() => handleTabPress(1)}
          >
            <Tab isActive={activeTab === 1}>구성원</Tab>
          </TabWrapper>
          <TabWrapper
            isActive={activeTab === 2}
            onPress={() => handleTabPress(2)}
          >
            <Tab isActive={activeTab === 2}>활동 내역</Tab>
          </TabWrapper>
        </TabContainer>

        {activeTab === 0 && <MeetingInfo title={title} />}
        {activeTab === 0 && <Line></Line>}
        {activeTab === 0 && <CommentView comments={comments} />}
        {activeTab === 1 && <WatingMemberList></WatingMemberList>}

        {activeTab === 1 && <Line></Line>}
        {activeTab === 1 && <TeamMemberList></TeamMemberList>}
        <Pressable onPress={() => navigation.navigate(PAGES.MAIN)}></Pressable>
      </Container>
    </Layout>
  );
}

const Container = styled.View`
  flex: 1;
`;
const Header = styled.View`
    height:230px;
    justifyContent:center;
    alignItems:center;
    backgroundColor:grey;
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
  border-width: 1px;
  border-color: white;
  padding:7px;
  background-color: ${({ isActive, theme }) => (isActive ? 'white' : theme.colors.blue.primary)};
`;

const Tab = styled.Text`
  color: ${({ isActive, theme }) => (isActive ? theme.font.color.primary : 'white')};
`;
