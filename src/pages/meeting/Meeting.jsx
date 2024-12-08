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
import { greyBlueColors } from '../../styles/ThemeStyles';
import uploadBtn from '../../assets/uploadBtn.svg';
import Register from '../auth/register/Register';
import MeetingRecordList from './component/MeetingRecordList/MeetingRecordList';
import { Animated } from 'react-native';
import useModal from '../../hooks/useModal';
import { getMeetingById, getMeetingMemberRole } from '../../utils/meeting';

export default function Meeting() {
  const route = useRoute();
  const { id, title } = route.params;
  const [data, setData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // 0: 모임 정보, 1: 구성원, 2: 활동 내역
  const [isLike, setIsLike] = useState(false);
  const [isScrap, setIsScrap] = useState(false);
  const nav = useNavigation();
  const { Modal, open, close } = useModal();
  const [re, setRe] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMeetingById(id);
        const memberRes = await getMeetingMemberRole(id);
        setData(response.data.info);
        setMemberData(response.data.members);
        setIsLike(response.data.liked);
        setIsScrap(response.data.scraped);
        setUserRole(memberRes.data) 
        setLoading(false);
        console.log(response.data.info);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [re]);

  if (!data || loading) {
    return <ActivityIndicator size="large" color="#444444" />; // 로딩 중일 때 인디케이터 표시
  }

  if (error) {
    return <Text style={{ fontSize: 20 }}>Error: {error}</Text>; // 에러 메시지 표시
  }

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const onPressDeleteMeeting = async () => {
    deleteMeeting(id);
    nav.navigate(PAGES.MAIN);
  }

  const onPressFooterBtn = async () => {
    if (userRole === "EXTERNAL") {
      postMeetingApplication(id);
    }
    else if (userRole === "MEMBER" || usreRole === "CO_LEADER") {
      leaveMeeting(id);
    }
    else if (userRole === "REQUESTED") {
      deleteMeetingApplication(id);
    }
  }
  if (data !== null) {
    return (
      // <MeetingHistory></MeetingHistory>
      // <VerifyEmail></VerifyEmail> 
      // <Register></Register>
      // <MeetingHistoryCreate></MeetingHistoryCreate>
      // <MeetingBoard></MeetingBoard>
      <Layout screen={PAGES.MEETING} title={title ? title : data.name}>
              {activeTab === 2 && (userRole === "LEADER" || userRole === "CO_LEADER") &&<PlusBtn onPress={()=>nav.navigate(PAGES.MEETING_HISTORY_CREATE,{id: id})}><PlusText>+</PlusText></PlusBtn>}
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
          <MeetingContainer>

              {activeTab === 0 && <MeetingInfo id={id} meetingData={data} isLike={isLike} isScrap={isScrap} re={re} setRe={setRe} userRole={userRole}/>}
              {/* {activeTab === 0 && <Line></Line>} */}
              {activeTab === 0 && userRole === "LEADER" &&
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
              {activeTab === 0 && userRole === "EXTERNAL" && <FooterBtn onPress={onPressFooterBtn}><FooterBtnText>참여 신청하기</FooterBtnText></FooterBtn>}
              {activeTab === 0 && userRole === "REQUESTED" && <FooterBtn onPress={onPressFooterBtn}><FooterBtnText>참여 신청 취소하기</FooterBtnText></FooterBtn>}
              {activeTab === 0 && (userRole === "CO_LEADER" || userRole === "MEMBER") && <FooterBtn onPress={onPressFooterBtn}><FooterBtnText>이 모임 나가기</FooterBtnText></FooterBtn>}
              {activeTab === 0 && (userRole === "LEADER") && <FooterBtn onPress={()=>nav.navigate(PAGES.MEETING_EDIT,{id: id})}><FooterBtnText>모임 수정하기</FooterBtnText></FooterBtn>}
              {/* {activeTab === 0 && <CommentView comments={comments} />}
            {activeTab === 0 && <CommentInputWrapper>
              <CommentInput placeholder="댓글 예시입니다."></CommentInput>
              <UploadBtnWraaper><WithLocalSvg
                asset={uploadBtn} /></UploadBtnWraaper></CommentInputWrapper>} */}
              {activeTab === 1 && (userRole === "LEADER" || userRole === "CO_LEADER") && <WatingMemberList memberList={memberData.requested} id={id} re={re} setRe={setRe} userRole={userRole}></WatingMemberList>}
              {activeTab === 1 && (userRole === "LEADER" || userRole === "CO_LEADER") && memberData.requested.length !== 0 && <Line></Line>}
              {activeTab === 1 && <TeamMemberList id={id} memberList={memberData.member} userRole={userRole} re={re} setRe={setRe}></TeamMemberList>}
              {activeTab === 2 && <MeetingRecordList id={id} userRole={userRole}></MeetingRecordList>}
          </MeetingContainer>
            
          </Container>
      </Layout>
    );
  }
}

const MeetingContainer = styled.View`
  padding: 16px;
`;

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
  marginTop: 16px;
  width: 100%;
  justifyConter:center;
  alignItems:center;
  backgroundColor:${(props) => props.theme.colors.blue.primary};
  borderRadius:14px;
  padding:10px;
`;
const FooterBtnText = styled.Text`
fontWeight:${(props) => props.theme.font.weight.bold};
    fontSize:${(props) => props.theme.font.size.primary};
    color:white;
`;
const PlusBtn = styled(Animated.createAnimatedComponent(styled.Pressable`
  position:absolute;
  bottom:20px;
  right:20px;
  background-color: #007aff;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: flex-start;
  align-items: center;
`))``;

const PlusText = styled.Text`
  marginTop:-8px;
  fontSize:50px;
  fontWeight:200;
  color:white;
`;

const Container = styled.ScrollView`
  width:100%;
  height:100%;
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
  height: 40px;
`;

const TabWrapper = styled(Pressable)`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-left-width: 0.2px;
  border-right-width:0.2px;
  border-color: white;
  padding:7px;
  margin:0;
  background-color: ${({ isActive, theme }) => (isActive ? 'white' : theme.colors.blue.primary)};
`;

const Tab = styled.Text`
  color: ${({ isActive, theme }) => (isActive ? theme.font.color.primary : 'white')};
  fontWeight:${({ isActive, theme }) => isActive ? theme.font.weight.bold : theme.font.weight.regular};
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
