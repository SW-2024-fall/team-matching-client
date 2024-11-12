import { View, Text, Pressable } from "react-native"
import ActivityMemberComponent from "./ActivityMemberComponent";
import styled from "styled-components";

export default function ActivityMemberList({data}) {
    return (
        <Container>
            
            {data && data.attendees && data.attendees.map((member, index) => (
                <ActivityMemberComponent key={index} member={member}></ActivityMemberComponent>
            ))}
        </Container>
    )
}
const Container = styled.View`
  marginTop:20px;
`;
