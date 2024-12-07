import { View, Text, Pressable } from "react-native"
import styled from "styled-components"
import MeetingAiInfo from "./MeetingAiInfo";
import hand from '../../../../assets/hand.svg';
import { WithLocalSvg } from 'react-native-svg/css';
import location from '../../../../assets/location.svg';
import calendar from '../../../../assets/calendar.svg';
import o from '../../../../assets/o.svg'
import { useContext } from "react";
import like from '../../../../assets/like.svg';
import notLike from '../../../../assets/notLike.svg';
import scrap from '../../../../assets/scrap.svg';
import notScrap from '../../../../assets/notScrap.svg';
import blueHand from '../../../../assets/blueHand.svg';
import UserContext from "../../hooks/UserContext";
import UserTokenContext from "../../../../hooks/UserTokenContext";
const daysToKoreanText = (days) => {
    const dayMap = {
      MONDAY: '월',
      TUESDAY: '화',
      WEDNESDAH: '수',
      THURSDAY: '목',
      FRIDAY: '금',
      SATURDAY: '토',
      SUNDAY: '일',
    };
    const koreanDays = days.map(day => dayMap[day]).join('/');
    return `매주 ${koreanDays}`;
  };

export default function MeetingInfo({id, meetingData, isLike, isScrap, re, setRe }) {
    const myContext = useContext(UserContext);
    const {userToken, setUserToken} = useContext(UserTokenContext);
    const onPressLike = async () => {
        if (isLike) {
            try {
                const response = await fetch(`http://localhost:8080/api/meetings/${id}/likes`, { method: "DELETE" ,headers: {'Authorization': `Bearer ${userToken}`}});
                if (!response.ok) { throw new Error("Failed to 좋아요 취소"); }
                else{setRe(!re)}
            } catch (error) { console.error("Error 좋아요 취소:", error); }
        }
        else {
            try {
                const response = await fetch(`http://localhost:8080/api/meetings/${id}/likes`, { method: "POST",headers: {'Authorization': `Bearer ${userToken}`} });
                if (!response.ok) { throw new Error("Failed to 좋아요 추가"); }
                else{setRe(!re)}
            } catch (error) { console.error("Error 좋아요 추가:", error); }
        }

    }
    const onPressScrap = async () => {
        if (isScrap) {
            try {
                const response = await fetch(`http://localhost:8080/api/meetings/${id}/scraps`, { method: "DELETE" ,headers: {'Authorization': `Bearer ${userToken}`}});
                if (!response.ok) { throw new Error("Failed to 스크랩 취소"); }
                else{setRe(!re)}
            } catch (error) { console.error("Error 스크랩 취소:", error); }
        }
        else {
            try {
                const response = await fetch(`http://localhost:8080/api/meetings/${id}/scraps`, { method: "POST" ,headers: {'Authorization': `Bearer ${userToken}`}});
                if (!response.ok) { throw new Error("Failed to 스크랩 추가"); }
                else{setRe(!re)}
            } catch (error) { console.error("Error 스크랩 추가:", error); }
        }

    }
    return (
        <Container>

            <Header>
                <HeaderTitle>{meetingData.name}</HeaderTitle>
                <HeaderContent>{meetingData.content}</HeaderContent>
                <HeaderFooter>
                    <HeaderFooterLeft>
                        <Pressable onPress={onPressLike} >
                            <HeaderFootText>{isLike ? <WithLocalSvg asset={like} /> : <WithLocalSvg asset={notLike} />} {meetingData.likes}    </HeaderFootText>

                        </Pressable>
                        <Pressable onPress={onPressScrap}>
                            <HeaderFootText>{isScrap ? <WithLocalSvg asset={scrap} /> : <WithLocalSvg asset={notScrap} />} {meetingData.scraps}</HeaderFootText>
                        </Pressable>
                    </HeaderFooterLeft>
                    <HeaderFooterRight>
                        {myContext.userData.userRole === "EXTERNAL" || myContext.userData.userRole === "REQUESTED" ? 
                        <WithLocalSvg asset={hand}/> : <WithLocalSvg asset={blueHand}/>}
                        
                        <HeaderFootText>  {meetingData.currentParticipants}/{meetingData.maxParticipant}</HeaderFootText>
                    </HeaderFooterRight>
                </HeaderFooter>
            </Header>
            <Body>
                <MeetingAiInfo data={meetingData}></MeetingAiInfo>
                <BodyTextWarraper>
                    <WithLocalSvg asset={calendar} />
                    <BodyText> {meetingData.startDate}~{meetingData.endDate} {daysToKoreanText(meetingData.days)} {meetingData.startTime}~{meetingData.endTime}</BodyText>
                </BodyTextWarraper>
                <BodyTextWarraper>
                    <WithLocalSvg asset={location} />
                    <BodyText>  {meetingData.location}</BodyText>
                </BodyTextWarraper>
                <BodyTextWarraper>
                    <WithLocalSvg asset={o} />
                    <BodyText>    {meetingData.meta} </BodyText>
                </BodyTextWarraper>
            </Body>
        </Container>
    )
}

const Container = styled.View`
    margin:20px;
`;
const Header = styled.View`

`;

const HeaderTitle = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.bold};
    fontSize:${(props) => props.theme.font.size.large};
    color:${(props) => props.theme.font.color.primary};
    marginBottom:8px;
`;
const HeaderContent = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.primary};
    color:${(props) => props.theme.font.color.primary};
    marginBottom:8px;
`;
const HeaderFooter = styled.View`
    flexDirection:row;
    justifyContent:space-between;
`;
const HeaderFooterRight = styled.View`
    flexDirection:row;
`;
const HeaderFootText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.primary};
    color:${(props) => props.theme.font.color.primary};
`;
const HeaderFooterLeft = styled.View`
    flexDirection:row;
`;
const Body = styled.View`
    backgroundColor:#E6F3FF;
    padding:20px;
    marginTop:10px;
    borderRadius:${(props) => props.theme.border.radius.medium};
`;
const BodyTextWarraper = styled.View`
    flexDirection:row;
    alignItems:center;
    marginTop:10px;
`;
const BodyText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.small};
    color:${(props) => props.theme.font.color.primary};
    marginLeft:5px;
   
`;
