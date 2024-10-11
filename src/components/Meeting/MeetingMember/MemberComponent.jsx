import { View, Text, Pressable } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import styled from "styled-components";

export default function MemberComponent({ name, studentId, phoneNo, attendanceScore, department, tags }) {
    return (
        <Container>
            <BaseInfoContainer>
                <BaseInfoHeader>
                    <Name>{name}</Name>
                    <OutPressable>
                        <OutText>내보내기</OutText>
                    </OutPressable>
                </BaseInfoHeader>

                <DetailInfoContainer>
                    <SmallFont>{department}</SmallFont>
                    <SmallFont>{studentId}학번</SmallFont>
                    <SmallFont>{phoneNo}</SmallFont>
                </DetailInfoContainer>

            </BaseInfoContainer>
            <AdditionalInfoContainer>
                <Score>{attendanceScore}점</Score>
                <TagContainer>
                    <Text>#{tags[0]}</Text>
                    <Text>#{tags[1]}</Text>
                </TagContainer>
            </AdditionalInfoContainer>


        </Container>
    )
}

const Container = styled.View`
    flex:1;
    flexDirection:row;
    alignItems:center;
    height:50px;
    marginLeft:10px;
    marginRight:10px;
    marginBottom:5px;
`;
const BaseInfoContainer = styled.View`
    flex:3;
    marginLeft:10px;
    height:25px;
`;
const BaseInfoHeader = styled.View`
    flexDirection:row;
    alignItmes:flex-end;
    height:20px;
`;
const DetailInfoContainer = styled.View`
    height:20px;
    flexDirection:row;
`;
const SmallFont = styled.Text`
    fontSize:${(props) => props.theme.font.size.small};
    fontWeight:${(props) => props.theme.font.weight.regular};
    margin:1px;
    `;
const AdditionalInfoContainer = styled.View`
    flex:1;
`;
const TagContainer = styled.View`
    height:20px;
    flexDirection:row;
`;

const OutPressable = styled.Pressable`
    backgroundColor:${(props)=>props.theme.colors.blue.primary};
    borderRadius:${(props)=>props.theme.border.radius.small};
    justifyContent:center;
    alignItems:center;
    width:53px;
    height:20px;
`;
const OutText = styled.Text`
    color:white;
    fontSize:${(props)=>props.theme.font.size.xSmall};

`;
const Name = styled.Text`
    fontWeight:${(props)=>props.theme.font.weight.semiBold};
    marginRight:5px;
`;
const Score = styled.Text`
    height:20px;
    fontSize:${(props)=>props.theme.font.size.primary};
    fontWeight:${(props)=>props.theme.font.weight.semiBold};
`;