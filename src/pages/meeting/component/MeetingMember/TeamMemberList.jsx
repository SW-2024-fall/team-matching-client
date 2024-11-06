import { View, Text, Pressable } from "react-native"
import MemberComponent from "./MemberComponent"
import styled from "styled-components";

export default function TeamMemberList({ memberList, userRole }) {
  return (
    <Container>
      <Header>구성원</Header>
      {memberList.map((member, index) => (
        <MemberComponent key={index} name={member.name} studentId={member.studentId} phoneNo={member.phoneNumber} attendanceScore={member.attendenceScore} department={member.major} tags={member.features} userRole={userRole}></MemberComponent>
      ))}
    </Container>
  )
}
const Container = styled.View`
  marginTop:20px;
`;
const Header = styled.Text`
  fontSize:${(props) => props.theme.font.size.large};
  fontWeight:${(props) => props.theme.font.weight.bold};
  marginLeft:20px;
`;