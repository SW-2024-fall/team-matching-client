import { View, Text, Pressable } from "react-native"
import MemberComponent from "./MemberComponent"
import styled from "styled-components";

export default function TeamMemberList({ id, memberList, userRole , re, setRe}) {
  console.log("memberlist = "+JSON.stringify(memberList));
  return (
    <Container>
      <Header>구성원</Header>
      {memberList && memberList.map((member, index) => (
        <MemberComponent key={index} id={id} memberData={member} re={re} setRe={setRe} userRole={userRole}></MemberComponent>
      ))}
    </Container>
  )
}
const Container = styled.View`
`;
const Header = styled.Text`
  fontSize:${(props) => props.theme.font.size.large};
  fontWeight:${(props) => props.theme.font.weight.bold};
`;