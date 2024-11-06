import { View, Text } from "react-native";
import styled from "styled-components";
import { meetingData } from "../../Meeting";

export default function MeetingAiInfo() {
    return (
        <Container>
            <Header>
                <HeaderText>시대AI가 예측한 이 모임은...</HeaderText>
            </Header>
            <Body>
                <BodyText>{meetingData.analyzedIntroduction}</BodyText>
            </Body>
            <Footer1>
                {meetingData.features.map((item,index)=>
                    <Footer1Tag># {item} </Footer1Tag>)}
            </Footer1>
            <Footer2>
                {meetingData.analyzedFeatures.map((item,index)=>
                <Footer2TagWrraper><Footer2Tag>{item}</Footer2Tag></Footer2TagWrraper>)}
            </Footer2>
        </Container>
    );
}

const Container = styled.View`
    backgroundColor:white;
    padding:10px;
    borderRadius:${(props) => props.theme.border.radius.medium};
`;
const Header = styled.View`
    alignItems:center;
`;
const HeaderText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.xSmall};
    color:${(props) => props.theme.font.color.primary};
`;
const Body = styled.View`
    alignItems:center;
`;
const BodyText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.semiBold};
    fontSize:${(props) => props.theme.font.size.primary};
    color:${(props) => props.theme.font.color.primary};
    justifyContent:center;
`;
const Footer1 = styled.View`
    flexDirection:row;
    marginTop:5px;
    marginBottom:5px;
    justifyContent:center;
`;
const Footer1Tag = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.small};
    color:${(props) => props.theme.font.color.primary};
`;

const Footer2 = styled.View`
    flexDirection:row;
    justifyContent:center;
`; 
const Footer2TagWrraper = styled.View`  
    borderRadius:6px;
    backgroundColor:${(props) => props.theme.colors.blue.primary};
    marginRight:5px;
    marginLeft:5px;
    paddingRight:5px;
    paddingLeft:5px;
    paddingBottom:3px;
`;
const Footer2Tag = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.xSmall};
    color:white;
`;