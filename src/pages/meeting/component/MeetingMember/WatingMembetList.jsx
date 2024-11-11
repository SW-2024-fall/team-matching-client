import { View, Text } from "react-native"
import WaitingMemberComponent from "./WaitingMemberComponent";
import styled from "styled-components";

export default function WatingMembetList({ memberList }) {

  return (
    <Container>
      {memberList.length !== 0 && <Header>참가 신청 목록</Header>}
      {memberList && memberList.map((member, index) => (
        <WaitingMemberComponent key={index} memberData={member}></WaitingMemberComponent>
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