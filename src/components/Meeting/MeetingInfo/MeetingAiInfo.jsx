import { View, Text } from "react-native";
import styled from "styled-components";

export default function MeetingAiInfo(){
    return(
        <Container><Text>시대AI가 예측한 이 모임은...</Text></Container>
    );
}

const Container = styled.View`
    backgroundColor:white;
    padding:10px;
    borderRadius:${(props) => props.theme.border.radius.medium};
`;