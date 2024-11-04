import { View, Text, Pressable } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import styled from "styled-components";
import profile2 from '../../assets/profileExample2.svg';

import { WithLocalSvg } from "react-native-svg/css";

export default function ActivityMemberComponent({ name, studentId, phoneNo, attendanceScore, department, tags }) {
    return (
        <Container>
            <BaseInfoContainer>
                <WithLocalSvg asset={profile2} />
                <View>
                    <BaseInfoHeader>
                        <Name>{name}</Name>
                    </BaseInfoHeader>
                    <DetailInfoContainer>
                        <SmallFont>{department}  |  </SmallFont>
                        <SmallFont>{studentId}학번</SmallFont>
                    </DetailInfoContainer>
                </View>
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
    marginLeft:10px;
    marginRight:10px;
    marginBottom:5px;
`;
const BaseInfoContainer = styled.View`
    flex:3;
    marginTop:10px;
    marginLeft:10px;
    flexDirection:row;
    alignItems:center;
`;
const BaseInfoHeader = styled.View`
    flexDirection:row;
    alignItmes:flex-end;
    marginLeft:10px;
`;
const DetailInfoContainer = styled.View`
    marginLeft:10px;
    flexDirection:row;
`;
const SmallFont = styled.Text`
    fontSize:${(props) => props.theme.font.size.small};
    fontWeight:${(props) => props.theme.font.weight.regular};
`;
const AdditionalInfoContainer = styled.View`
    flex:1;
`;
const TagContainer = styled.View`
    height:20px;
    flexDirection:row;
`;

const Name = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.semiBold};
    marginRight:5px;
`;
const Score = styled.Text`
    fontSize:${(props) => props.theme.font.size.primary};
    fontWeight:${(props) => props.theme.font.weight.semiBold};
`;