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

// const daysToKoreanText = (days) => {
//     const dayMap = {
//       MON: '월',
//       TUE: '화',
//       WED: '수',
//       THU: '목',
//       FRI: '금',
//       SAT: '토',
//       SUN: '일',
//     };
//     const koreanDays = days.map(day => dayMap[day]).join('/');
//     return `매주 ${koreanDays}`;
//   };

export default function MeetingInfo({ meetingData, isLike, isScrap }) {
    const onPressLike = async () => {
        if (isLike) {
            try {
                const response = await fetch(`http://192.168.219.101:8080/api/meetings/${id}/likes`, { method: "DELETE" });
                if (!response.ok) { throw new Error("Failed to 좋아요 취소"); }
                nav.navigate(PAGES.MAIN);
            } catch (error) { console.error("Error 좋아요 취소:", error); }
        }
        else {
            try {
                const response = await fetch(`http://192.168.219.101:8080/api/meetings/${id}/likes`, { method: "POST" });
                if (!response.ok) { throw new Error("Failed to 좋아요 추가"); }
                nav.navigate(PAGES.MAIN);
            } catch (error) { console.error("Error 좋아요 추가:", error); }
        }

    }
    const onPressScrap = async () => {
        if (isScrap) {
            try {
                const response = await fetch(`http://192.168.219.101:8080/api/meetings/${id}/scraps`, { method: "DELETE" });
                if (!response.ok) { throw new Error("Failed to 스크랩 취소"); }
                nav.navigate(PAGES.MAIN);
            } catch (error) { console.error("Error 스크랩 취소:", error); }
        }
        else {
            try {
                const response = await fetch(`http://192.168.219.101:8080/api/meetings/${id}/scraps`, { method: "DELETE" });
                if (!response.ok) { throw new Error("Failed to 스크랩 추가"); }
                nav.navigate(PAGES.MAIN);
            } catch (error) { console.error("Error 스크랩 추가:", error); }
        }

    }
    return (
        <Container>

            <Header>
                <HeaderTitle>{meetingData.title}</HeaderTitle>
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
                        <WithLocalSvg
                            asset={hand}
                        />
                        <HeaderFootText>  {meetingData.currentParticipant}/{meetingData.maxParticipant}</HeaderFootText>
                    </HeaderFooterRight>
                </HeaderFooter>
            </Header>
            <Body>
                <MeetingAiInfo data={meetingData}></MeetingAiInfo>
                <BodyTextWarraper>
                    <WithLocalSvg asset={calendar} />
                    {/* <BodyText> {meetingData.startDate}~{meetingData.endDate} {daysToKoreanText(meetingData.days)} {meetingData.startTime}~{meetingData.endTime}</BodyText> */}
                </BodyTextWarraper>
                <BodyTextWarraper>
                    <WithLocalSvg asset={location} />
                    <BodyText>  {meetingData.location}</BodyText>
                </BodyTextWarraper>
                <BodyTextWarraper>
                    <WithLocalSvg asset={o} />
                    <BodyText>    {meetingData.meta} </BodyText>
                </BodyTextWarraper>
                <BodyTextWarraper>
                    <WithLocalSvg asset={o} />
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
