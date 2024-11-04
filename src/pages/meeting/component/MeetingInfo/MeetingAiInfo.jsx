import { View, Text } from "react-native";
import styled from "styled-components";

export default function MeetingAiInfo() {
    return (
        <Container>
            <Header>
                <HeaderText>시대AI가 예측한 이 모임은...</HeaderText>
            </Header>
            <Body>
                <BodyText>승부에 진심인 사람들이 모인 모임이에요!</BodyText>
                <BodyText>열정적으로 참여하고 싶은 분께 적절할 것 같아요!</BodyText>
            </Body>
            <Footer1>

                <Footer1Tag># 모임장이 직접 쓴 특징 </Footer1Tag>
                <Footer1Tag># 번개 </Footer1Tag>
                <Footer1Tag># 가족같은 </Footer1Tag>
            </Footer1>
            <Footer2>
                <Footer2TagWrraper><Footer2Tag>운동/스포츠</Footer2Tag></Footer2TagWrraper>
                <Footer2TagWrraper><Footer2Tag>친목</Footer2Tag></Footer2TagWrraper>
                <Footer2TagWrraper><Footer2Tag>카테고리1</Footer2Tag></Footer2TagWrraper>
                <Footer2TagWrraper><Footer2Tag>카테고리2</Footer2Tag></Footer2TagWrraper>
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