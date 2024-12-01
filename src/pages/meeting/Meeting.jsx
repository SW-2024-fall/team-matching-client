import React, { useEffect, useRef, useState } from 'react';
import { Text, Pressable, Dimensions, ActivityIndicator, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import { Animated } from 'react-native';
import UserContext from './hooks/UserContext';
import useFetch from './hooks/useFetch';
import useModal from '../../hooks/useModal';

export default function Meeting({ route }) {
  const { id, title } = route.params;
  const [data, setData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // 0: 모임 정보, 1: 구성원, 2: 활동 내역
  const [userData, setUserData] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [isScrap, setIsScrap] = useState(false);
  const nav = useNavigation();
  const { Modal, open, close } = useModal();
  const userContextValues = {
    userData: userData,
    setUserData
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.219.101:8080/api/meetings/${id}`, { method: "GET" });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json.data.info);
        setMemberData(json.data.members);
        setIsLike(json.data.liked);
        setIsScrap(json.data.scraped);
        setUserData({
          userRole: "LEADER"
        })
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#000000" />; // 로딩 중일 때 인디케이터 표시
  }

  if (error) {
    return <Text style={{ fontSize: 20 }}>Error: {error}</Text>; // 에러 메시지 표시
  }

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const onPressDeleteMeeting = async () => {
    try {
      const response = await fetch(`http://192.168.219.101:8080/api/meetings/${id}`, { method: "DELETE" });
      if (!response.ok) {throw new Error("Failed to delete the meeting"); }
      nav.navigate(PAGES.MAIN);
    } catch (error) {console.error("Error deleting the meeting:", error);}
  }
  const onPressFooterBtn = async () => {
    if (userData.usreRole === "EXTERNAL") {
      try {
        const response = await fetch(`http://192.168.219.101:8080/api/meetings/${id}/members/application`, { method: "POST" });
        if (!response.ok) { throw new Error("Failed to 모임신청"); }
      } catch (error) { console.error("Error 모임신청", error); }
    }
    else if (userData.userRole === "MEMBER" || userData.usreRole === "CO_LEADER") {
      try {
        const response = await fetch(`http://192.168.219.101:8080/api/meetings/${id}/members`, { method: "DELETE" });
        if (!response.ok) { throw new Error("Failed to 모임탈퇴"); }
      } catch (error) { console.error("Error 모임탈퇴:", error); }
    }
    else if (userData.usreRole === "REQUESTED") {
      try {
        const response = await fetch(`http://192.168.219.101:8080/api/meetings/${id}/members/application`, { method: "DELETE" });
        if (!response.ok) {
          throw new Error("Failed to 모인 신청 해제");
        }
      } catch (error) { console.error("Error 모임신청 해제:", error); }
    }
  }
  return (
    // <MeetingHistory></MeetingHistory>
    // <VerifyEmail></VerifyEmail>
    // <Register></Register>
    <Layout screen={PAGES.MEETING} title={data.name}>
      <UserContext.Provider value={userContextValues}>
        <Container>
          <Header><WithLocalSvg asset={runningPhoto} /></Header>
          <TabContainer>
            <TabWrapper isActive={activeTab === 0} onPress={() => handleTabPress(0)}>
              <Tab isActive={activeTab === 0}>모임 정보</Tab></TabWrapper>
            <TabWrapper isActive={activeTab === 1} onPress={() => handleTabPress(1)}>
              <Tab isActive={activeTab === 1}>구성원</Tab></TabWrapper>
            <TabWrapper isActive={activeTab === 2} onPress={() => handleTabPress(2)}>
              <Tab isActive={activeTab === 2}>활동 내역</Tab></TabWrapper>
          </TabContainer>
          {activeTab === 0 && <MeetingInfo id={id} meetingData={data} isLike={isLike} isScrap={isScrap}/>}
          {activeTab === 0 && <Line></Line>}
          {activeTab === 0 && userData.userRole === "LEADER" &&
            <View>
              <FooterBtn onPress={open}><FooterBtnText>이 모임 삭제하기</FooterBtnText></FooterBtn>
              <Modal>
                <ModalHeader>
                  <ModalLable>해당 모임을 삭제하시겠습니까?</ModalLable>
                </ModalHeader>
                <ModalFooter>
                  <Pressable><ModalYes onPress={onPressDeleteMeeting}>예</ModalYes></Pressable>
                  <Pressable><ModalNo onPress={close}>아니오</ModalNo></Pressable>
                </ModalFooter>
              </Modal>
            </View>}
          {activeTab === 0 && userData.userRole === "EXTERNAL" && <FooterBtn onPress={onPressFooterBtn}><FooterBtnText>참여 신청하기</FooterBtnText></FooterBtn>}
          {activeTab === 0 && userData.userRole === "REQUESTED" && <FooterBtn onPress={onPressFooterBtn}><FooterBtnText>참여 신청 취소하기</FooterBtnText></FooterBtn>}
          {activeTab === 0 && (userData.userRole === "CO_LEADER" || userData.userRole === "MEMBER") && <FooterBtn onPress={onPressFooterBtn}><FooterBtnText>이 모임 나가기</FooterBtnText></FooterBtn>}
          {/* {activeTab === 0 && <CommentView comments={comments} />} */}
          {/* {activeTab === 0 && <CommentInputWrapper>
            <CommentInput placeholder="댓글 예시입니다."></CommentInput>
            <UploadBtnWraaper><WithLocalSvg
              asset={uploadBtn} /></UploadBtnWraaper></CommentInputWrapper>} */}
          {activeTab === 1 && (userData.userRole === "LEADER" || userData.userRole === "CO_LEADER") && <WatingMemberList memberList={memberData.requested}></WatingMemberList>}
          {activeTab === 1 && (userData.userRole === "LEADER" || userData.userRole === "CO_LEADER") && memberData.requested.length !== 0 && <Line></Line>}
          {activeTab === 1 && <TeamMemberList id={id} memberList={memberData.member} userRole={userData.userRole}></TeamMemberList>}
          {activeTab === 2 && <MeetingRecordList id={id}></MeetingRecordList>}
          <Pressable onPress={() => navigation.navigate(PAGES.MAIN)}></Pressable>
          {activeTab === 2 && <PlusBtn><Text>+</Text></PlusBtn>}
        </Container>
      </UserContext.Provider>
    </Layout>
  );
}
const ModalLable = styled.Text`
  fontWeight:${(props) => props.theme.font.weight.medium};
  fontSize:${(props) => props.theme.font.size.primary};
  
`;
const ModalHeader = styled.View`
  justifyContent:center;
  alignItems:center;
  marginBottom:10px;
`;
const ModalFooter = styled.View`
  flexDirection:row;
  justifyContent:space-between;
  alginItems:center;
  width:50%;
  marginLeft:25%;
`;
const ModalYes = styled.Text`
  fontWeight:${(props) => props.theme.font.weight.medium};
  fontSize:${(props) => props.theme.font.size.primary};
  color:${(props) => props.theme.colors.blue.primary};
`;
const ModalNo = styled.Text`
  fontWeight:${(props) => props.theme.font.weight.medium};
  fontSize:${(props) => props.theme.font.size.primary};
  color:#FF576B;
    `;
const FooterBtn = styled.Pressable`
  justifyConter:center;
  alignItems:center;
  backgroundColor:${(props) => props.theme.colors.blue.primary};
  margin:20px;
  borderRadius:14px;
  padding:10px;
`;
const FooterBtnText = styled.Text`
fontWeight:${(props) => props.theme.font.weight.bold};
    fontSize:${(props) => props.theme.font.size.primary};
    color:white;
`;
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
