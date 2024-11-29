import { View, Text, Pressable } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import styled from "styled-components";
import profile2 from '../../../assets/profileExample2.svg';

import { WithLocalSvg } from "react-native-svg/css";

export default function ActivityRecorder({ name, meetingName, profileUrl}) {
    console.log(profileUrl)
    return (
        <Container>
            <BaseInfoContainer>
                
             
                
                  <StyledImage source={{ uri: profileUrl }} />
                
              
                <View>
                    <BaseInfoHeader>
                        <Name>{name}</Name>
                    </BaseInfoHeader>
                    <DetailInfoContainer>
                        <SmallFont>{meetingName}</SmallFont>
                    </DetailInfoContainer>
                </View>
            </BaseInfoContainer>
        </Container>
    )
}

const StyledImage = styled.Image`
    width:30px;
    height:30px;
    borderRadius:15px;
`;
const Container = styled.View`
    flex:1;
    flexDirection:row;
    alignItems:center;
    marginBottom:5px;
`;
const BaseInfoContainer = styled.View`
    flex:3;
    marginTop:10px;
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
const Name = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.semiBold};
    marginRight:5px;
`;