import React, { useEffect, useRef, useState } from 'react';
import { Text, Pressable, Dimensions, ActivityIndicator, View, Alert } from 'react-native';
import { Image } from 'react-native';
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
import { Animated } from 'react-native';
import useModal from '../../hooks/useModal';
import MeetingCreate from './create/MeetingCreate';
import MeetingHistoryCreate from '../meetingHistory/create/MeetingHistoryCreate';

export default function Meeting() {
  const route = useRoute();
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
  const [re, setRe] = useState(false);
  const userContextValues = {
    userData: userData,
    setUserData
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/meetings/${id}`, { method: "GET",headers: {'Authorization': `Bearer ${accessToken}`} });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        const memberRes = await fetch(`http://localhost:8080/api/meetings/${id}/members/my-role`, { method: "GET",headers: {'Authorization': `Bearer ${accessToken}`}});
        const memberJson = await memberRes.json()
        setData(json.data.info);
        setMemberData(json.data.members);
        setIsLike(json.data.liked);
        setIsScrap(json.data.scraped);
        setUserData({
          userRole: memberJson.data
        }) 
        setLoading(false);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [re]);

  if (!data || loading) {
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
      const response = await fetch(`http://localhost:8080/api/meetings/${id}`, { method: "DELETE" ,headers: {'Authorization': `Bearer ${accessToken}`}});
      if (!response.ok) { throw new Error("Failed to delete the meeting"); }
      nav.navigate(PAGES.MAIN);
    } catch (error) { console.error("Error deleting the meeting:", error); }
  }
  const onPressFooterBtn = async () => {
    if (userData.userRole === "EXTERNAL") {
      try {
        const response = await fetch(`http://localhost:8080/api/meetings/${id}/members/application`, { method: "POST" ,headers: {'Authorization': `Bearer ${accessToken}`}});
        if (!response.ok) { throw new Error("Failed to 모임신청"); }
        else{Alert.alert('성공','모임 신청되었습니다'); setRe(!re)}
      } catch (error) { console.error("Error 모임신청", error); }
    }
    else if (userData.userRole === "MEMBER" || userData.usreRole === "CO_LEADER") {
      try {
        const response = await fetch(`http://localhost:8080/api/meetings/${id}/members`, { method: "DELETE",headers: {'Authorization': `Bearer ${accessToken}`} });
        if (!response.ok) { throw new Error("Failed to 모임탈퇴"); }
      } catch (error) { console.error("Error 모임탈퇴:", error); }
    }
    else if (userData.userRole === "REQUESTED") {
      try {
        const response = await fetch(`http://localhost:8080/api/meetings/${id}/members/application`, { method: "DELETE" ,headers: {'Authorization': `Bearer ${accessToken}`}});
        if (!response.ok) {
          throw new Error("Failed to 모인 신청 해제");
        }
        else{Alert.alert('성공','모임신청이 취소되었습니다'); setRe(!re)}
      } catch (error) { console.error("Error 모임신청 해제:", error); }
    }
  }
  if (data !== null) {
    return (
      // <MeetingHistory></MeetingHistory>
      // <VerifyEmail></VerifyEmail>
      // <Register></Register>
      // <MeetingHistoryCreate></MeetingHistoryCreate>
      // <MeetingBoard></MeetingBoard>
      <Layout screen={PAGES.MEETING} title={data.name}>
        <UserContext.Provider value={userContextValues}>
          <Container>
            <Header>
              {data.thumbnailUrls ? (
                <ImageContainer>
                  <StyledImage source={{ uri: data.thumbnailUrls[0] }} />
                </ImageContainer>
              ) : (

                <Text>기본이미지</Text>
              )}
            </Header>
            <TabContainer>
              <TabWrapper isActive={activeTab === 0} onPress={() => handleTabPress(0)}>
                <Tab isActive={activeTab === 0}>모임 정보</Tab></TabWrapper>
              <TabWrapper isActive={activeTab === 1} onPress={() => handleTabPress(1)}>
                <Tab isActive={activeTab === 1}>구성원</Tab></TabWrapper>
              <TabWrapper isActive={activeTab === 2} onPress={() => handleTabPress(2)}>
                <Tab isActive={activeTab === 2}>활동 내역</Tab></TabWrapper>
            </TabContainer>
            {activeTab === 0 && <MeetingInfo id={id} meetingData={data} isLike={isLike} isScrap={isScrap} re={re} setRe={setRe}/>}
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
            {activeTab === 0 && (userData.userRole === "LEADER") && <FooterBtn onPress={()=>nav.navigate(PAGES.MEETING_EDIT,{id: id})}><FooterBtnText>모임 수정하기</FooterBtnText></FooterBtn>}
            {/* {activeTab === 0 && <CommentView comments={comments} />}
          {activeTab === 0 && <CommentInputWrapper>
            <CommentInput placeholder="댓글 예시입니다."></CommentInput>
            <UploadBtnWraaper><WithLocalSvg
              asset={uploadBtn} /></UploadBtnWraaper></CommentInputWrapper>} */}
            {activeTab === 1 && (userData.userRole === "LEADER" || userData.userRole === "CO_LEADER") && <WatingMemberList memberList={memberData.requested} id={id} re={re} setRe={setRe}></WatingMemberList>}
            {activeTab === 1 && (userData.userRole === "LEADER" || userData.userRole === "CO_LEADER") && memberData.requested.length !== 0 && <Line></Line>}
            {activeTab === 1 && <TeamMemberList id={id} memberList={memberData.member} userRole={userData.userRole} re={re} setRe={setRe}></TeamMemberList>}
            {activeTab === 2 && (userData.userRole === "LEADER" || userData.userRole === "CO_LEADER") &&<PlusBtn onPress={()=>nav.navigate(PAGES.MEETING_HISTORY_CREATE,{id: id})}><Text>+</Text></PlusBtn>}
            {activeTab === 2 && <MeetingRecordList id={id}></MeetingRecordList>}
            
          </Container>
        </UserContext.Provider>
      </Layout>
    );
  }
}
const ImageContainer = styled.View`
  height:auto;
  width:100%;  
`;
const StyledImage = styled.Image`
  height:auto;
  width:100%;
  aspect-ratio: 20 / 9;
`;
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
  marginLeft:20px;
  marginRight:20px;
  marginTop:5px;
  borderRadius:14px;
  padding:10px;
`;
const FooterBtnText = styled.Text`
fontWeight:${(props) => props.theme.font.weight.bold};
    fontSize:${(props) => props.theme.font.size.primary};
    color:white;
`;
const PlusBtn = styled(Animated.createAnimatedComponent(styled.Pressable`
  background-color: #007aff;
  marginLeft:90%;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
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
  borderColor: #005EB8;
  border-width:1px;
`;
const UploadBtnWraaper = styled.View`
  position:absolute;
  right:18px;
  top:10px;
`;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
