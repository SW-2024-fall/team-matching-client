import { View, Text } from "react-native"
import styled from "styled-components"
import MeetingAiInfo from "./MeetingAiInfo";
export default function MeetingInfo({ title }) {
    return (
        <Container>

            <Header>
                <HeaderTitle>{title}</HeaderTitle>
                <HeaderContent>배드민턴 치고 싶은데 혼자 치기는 싫은 사람 모여!</HeaderContent>
                <HeaderFooter>
                    <HeaderFooterLeft>
                        <HeaderFootText>♡ 998    </HeaderFootText>
                        <HeaderFootText>☆ 998</HeaderFootText>
                    </HeaderFooterLeft>
                    <HeaderFootText>2/4</HeaderFootText>
                </HeaderFooter>
            </Header>
            <Body>
                <MeetingAiInfo></MeetingAiInfo>
                <BodyText>24.04.15~24.10.23 매주 월/수/금요일 20:00~21:30</BodyText>
                <BodyText>백주념기념관 나동 990호</BodyText>
                <BodyText>출석점수 60점 이하 참여 불가</BodyText>
                <BodyText>참가비: 20000원</BodyText>   
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
const BodyText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.small};
    color:${(props) => props.theme.font.color.primary};
    marginTop:10px;
`;
