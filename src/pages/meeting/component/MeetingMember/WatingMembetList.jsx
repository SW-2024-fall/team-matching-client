import { View,Text } from "react-native"
import WaitingMemberComponent from "./WaitingMemberComponent";
import styled from "styled-components";

export default function WatingMembetList({memberList}){

    return (
        <Container>
            <Header>참가 신청 목록</Header>
            {memberList.map((member, index) => (
                <WaitingMemberComponent key={index} name={member.name} studentId={member.studentId} phoneNo={member.phoneNumber} attendanceScore={member.attendenceScore} department={member.major} tags={member.features} userId={member.id}></WaitingMemberComponent>
            ))}
        </Container>
    )
}

const Container = styled.View`
  marginTop:20px;
`;
const Header = styled.Text`
  fontSize:${(props)=>props.theme.font.size.large};
  fontWeight:${(props)=>props.theme.font.weight.bold};
  marginLeft:20px;
`;