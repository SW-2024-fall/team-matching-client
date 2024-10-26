import { View, Text } from "react-native"
import styled from "styled-components"
import location from './../../assets/location.svg';
import calendar from './../../assets/calendar.svg';
import { WithLocalSvg } from "react-native-svg/css";

export default function ActivityDatailInfo() {
    return (
        <Container>
            <Wrapper>
                <WithLocalSvg asset={calendar} />
                <StyledText>  24.04.15 수요일 20:00~21:30</StyledText>
            </Wrapper>
            <Wrapper>
                <WithLocalSvg asset={location} />
                <StyledText>   백주년기념관 나동 990호</StyledText>
            </Wrapper>
        </Container>
    )
}

const Container = styled.View`
    margin:20px;
`;
const Wrapper = styled.View`
    flexDirection:row;
    marginBottom:10px;
`;
const StyledText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.small};
    color:${(props) => props.theme.font.color.primary};
`;