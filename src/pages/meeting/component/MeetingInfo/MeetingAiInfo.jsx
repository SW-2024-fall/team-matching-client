import { View, Text } from "react-native";
import styled from "styled-components";

export default function MeetingAiInfo({data}) {
    return (
        <Container>
            <MeetingAiIntroduction>
                    <Header>
                        <HeaderText>시대AI가 예측한 이 모임은...</HeaderText>
                </Header>
                <Body>
                    <BodyText>{data.analyzedIntroduction}</BodyText>
                </Body>
            </MeetingAiIntroduction>
            <Footer1>
                {data.features && data.features.map((item,index)=>
                    <Footer1Tag key={index}># {item} </Footer1Tag>)}
            </Footer1>
            <Footer2>
                {data.analyzedFeatures && data.analyzedFeatures.map((item,index)=>
                <Footer2TagWrraper key={index}><Footer2Tag>{item}</Footer2Tag></Footer2TagWrraper>)}
            </Footer2>
        </Container>
    );
}

const Container = styled.View`
    backgroundColor:white;
    padding:10px;
    borderRadius:${(props) => props.theme.border.radius.medium};
    gap: 6px;
`;

const MeetingAiIntroduction = styled.View`
    gap: 2px;
    alignItems:center;
`;

const Header = styled.View`
    alignItems:center;
`;
const HeaderText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.small};
    color:${(props) => props.theme.font.color.primary};
`;
const Body = styled.View`
    alignItems:center;
`;
const BodyText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.semiBold};
    fontSize:${(props) => props.theme.font.size.primary};
    color:${(props) => props.theme.font.color.primary};
    textAlign:center;
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
    gap: 10px;
`; 
const Footer2TagWrraper = styled.View`  
    borderRadius:6px;
    backgroundColor:${(props) => props.theme.colors.blue.primary};
    padding: 4px 12px;
`;
const Footer2Tag = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.small};
    color:white;
`;