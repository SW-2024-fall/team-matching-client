import { View, Text, Pressable } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import styled from "styled-components";

import { WithLocalSvg } from "react-native-svg/css";
import { Image } from "react-native-svg";
import { Major } from "../../const/Major";
import { useNavigation } from "@react-navigation/native";
import { PAGES } from "../../../navigation/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ActivityMemberComponent({ member }) {
    console.log("member = "+JSON.stringify(member));
    const nav = useNavigation();
    const onPressProfile = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        try {
            const response = await fetch(`http://localhost:8080/api/users`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            });
            if (!response.ok) { throw new Error("Failed to 부모임장 승급"); }
            else{
                const json = await response.json();
                const myUserId = json.data.id;
                if(myUserId === member.id){
                    nav.navigate(PAGES.PROFILE);
                }
                else {
                    nav.navigate(PAGES.EXTERNAL_PROFILE,{id:member.id});
                }
            }
        } catch (error) { console.error("Error go profile", error); }
    }
    return (
        <Container>
            <BaseInfoContainer>
                {/* <WithLocalSvg asset={profile2} /> */}
                <StyledImg source={{uri:member.profileUrl}}></StyledImg>
                <View>
                    <BaseInfoHeader>
                    <Pressable onPress={onPressProfile}>
                        <Name>{member.name}</Name>
                    </Pressable>
                    </BaseInfoHeader>
                    <DetailInfoContainer>
                        <SmallFont>{Major[member.major]}  |  </SmallFont>
                        <SmallFont>{member.studentId.substr(0,2)}학번</SmallFont>
                    </DetailInfoContainer>
                </View>
            </BaseInfoContainer>
            <AdditionalInfoContainer>
                <Score>{member.attendenceScore}점</Score>
                <TagContainer>
                    {member.features && member.features[0] && <Text>#{member.features[0]}</Text>}
                    {member.features && member.features[1] && <Text>#{member.features[1]}</Text>}
                </TagContainer>
            </AdditionalInfoContainer>


        </Container>
    )
}
const StyledImg = styled.Image`
    width:30px;
    height:30px;
    borderRadius:15px;
`;
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