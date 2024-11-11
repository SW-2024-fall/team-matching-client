import { View, Text, Pressable } from "react-native"
import MemberComponent from "./MemberComponent"
import styled from "styled-components";

export default function TeamMemberList({ id, memberList, userRole }) {
  return (
    <Container>
      <Header>구성원</Header>
      {memberList && memberList.map((member, index) => (
        <MemberComponent key={index} id={id} memberData={member}></MemberComponent>
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