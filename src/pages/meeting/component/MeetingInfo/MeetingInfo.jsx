import { View, Text } from "react-native"
import styled from "styled-components"
import MeetingAiInfo from "./MeetingAiInfo";
import hand from '../../../../assets/hand.svg';
import { WithLocalSvg } from 'react-native-svg/css';
import location from '../../../../assets/location.svg';
import calendar from '../../../../assets/calendar.svg';
import o from '../../../../assets/o.svg'

import { meetingData } from "../../Meeting";
const daysToKoreanText = (days) => {
    // 요일 약어와 한글 요일명을 매핑한 객체 생성
    const dayMap = {
      MON: '월',
      TUE: '화',
      WED: '수',
      THU: '목',
      FRI: '금',
      SAT: '토',
      SUN: '일',
    };
  
    // 주어진 days 배열을 한글 요일명으로 변환하고 '/'로 연결
    const koreanDays = days.map(day => dayMap[day]).join('/');
  
    return `매주 ${koreanDays}`;
  };

export default function MeetingInfo({ title }) {

    return (
        <Container>

            <Header>
                <HeaderTitle>{meetingData.name}</HeaderTitle>
                <HeaderContent>{meetingData.content}</HeaderContent>
                <HeaderFooter>
                    <HeaderFooterLeft>
                        <HeaderFootText>♡ {meetingData.likeCount}    </HeaderFootText>
                        <HeaderFootText>☆ {meetingData.scrapCount}</HeaderFootText>
                    </HeaderFooterLeft>
                    <HeaderFooterRight>
                        <WithLocalSvg
                            asset={hand}
                        />
                        <HeaderFootText>  {meetingData.currentParticipant}/{meetingData.maxParticipant}</HeaderFootText>
                    </HeaderFooterRight>
                </HeaderFooter>
            </Header>
            <Body>
                <MeetingAiInfo></MeetingAiInfo>
                <BodyTextWarraper>
                    <WithLocalSvg asset={calendar}/>
                    <BodyText> {meetingData.startDate}~{meetingData.endDate} {daysToKoreanText(meetingData.days)} {meetingData.startTime}~{meetingData.endTime}</BodyText>
                </BodyTextWarraper>
                <BodyTextWarraper>
                    <WithLocalSvg asset={location}/>
                    <BodyText>  {meetingData.location}</BodyText>
                </BodyTextWarraper>
                <BodyTextWarraper>
                    <WithLocalSvg asset={o}/>
                    <BodyText>    {meetingData.meta} </BodyText>
                </BodyTextWarraper>
                <BodyTextWarraper>
                    <WithLocalSvg asset={o}/>
                    <BodyText>    참가비: 20000원  </BodyText>
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
   
`;
