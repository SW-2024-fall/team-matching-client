import { View, Text } from "react-native"
import WaitingMemberComponent from "./WaitingMemberComponent";
import styled from "styled-components";

export default function WatingMembetList({ memberList ,id, re, setRe, userRole}) {

  return (
    <Container>
      {memberList.length !== 0 && <Header>참가 신청 목록</Header>}
      {memberList && memberList.map((member, index) => (
        <WaitingMemberComponent key={index} memberData={member} id={id} re={re} setRe={setRe} userRole={userRole}></WaitingMemberComponent>
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