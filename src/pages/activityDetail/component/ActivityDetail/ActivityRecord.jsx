
import { View, Text } from "react-native"
import styled from "styled-components"
import ActivityRecorder from "./ActivityRecorder"
import menu from '../../assets/menu.svg';
import { WithLocalSvg } from "react-native-svg/css";

export default function ActivityRecord() {
 
    const name = "홍길동"
    return (
        <Container>
            <Header><HeaderText>시대생 첫 모임 활동이다! 야호!!</HeaderText></Header>
            <Body><BodyText>활동 세부 기록 전체 내용~ 활동 세부 기록 전체 내용~ 활동 세부 기록 전체 내용~ 활동 세부 기록 전체 내용~ 활동 세부 기록 전체 내용~ 활동 세부 기록 전체 내용~ </BodyText></Body>
           <ActivityRecorder name="홍길동" meetingName="수요일 저녁 런닝 모임"></ActivityRecorder>
            <Footer>
                <WithLocalSvg asset={menu}/>
            </Footer>
        </Container>
    )
}
const Container = styled.View`
    margin:20px;
`;
const Header = styled.View``;
const HeaderText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.bold};
    fontSize:${(props) => props.theme.font.size.large};
    color:${(props) => props.theme.font.color.primary};
`;
const Body = styled.View``;
const BodyText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.medium};
    fontSize:${(props) => props.theme.font.size.primary};
    color:${(props) => props.theme.font.color.primary};`;
const Footer = styled.View`
    flexDirection:row;
    justifyContent:flex-end;
`;