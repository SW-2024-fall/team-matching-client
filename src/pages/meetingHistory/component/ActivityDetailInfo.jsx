import { View, Text } from "react-native"
import styled from "styled-components"
import location from '../../../assets/location.svg';
import calendar from '../../../assets/calendar.svg';
import { WithLocalSvg } from "react-native-svg/css";

export default function ActivityDatailInfo({data}) {
    return (
        <Container>
            <Wrapper>
                <WithLocalSvg asset={calendar} />
                <StyledText>  {data.date}</StyledText>
            </Wrapper>
            <Wrapper>
                <WithLocalSvg asset={location} />
                <StyledText>   {data.location}</StyledText>
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