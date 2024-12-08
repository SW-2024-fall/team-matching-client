import { View, Text, Pressable, Alert } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import styled from "styled-components";
import profile2 from '../../../../assets/profileExample2.svg';
import UserContext from "../../hooks/UserContext";
import { WithLocalSvg } from "react-native-svg/css";
import { useContext, useState } from "react";
import UserTokenContext from "../../../../hooks/UserTokenContext";
import { Image } from "react-native-svg";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { PAGES } from "../../../../navigation/constant";
export default function MemberComponent({ id, memberData, re, setRe}) {
    const myContext = useContext(UserContext);
    const { accessToken, setUserToken } = useContext(UserTokenContext);
    const [role, setRole] = useState(null);
    const nav = useNavigation();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/meetings/${id}`, { method: "GET",headers: {'Authorization': `Bearer ${accessToken}`} });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const json = await response.json();
            const memberRes = await fetch(`http://localhost:8080/api/meetings/${id}/members/my-role`, { method: "GET",headers: {'Authorization': `Bearer ${accessToken}`}});
            const memberJson = await memberRes.json()
            setData(json.data.info);
          } catch (error) {
            setError(error.message);
          } finally {
          }
        };
        fetchData();
      }, []);
    const onPressOut = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/meetings/${id}/members/leave`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ targetUserId: memberData.id }), // JSON 형식으로 데이터 설정
            });
            if (!response.ok) { throw new Error("Failed to 모임원 내보내기"); }
            else{Alert.alert('성공','모임원을 내보내었습니다.'); setRe(!re)}
        } catch (error) { console.error("Error 모임원 내보내기", error); }
    };
    const onPressUpgrade = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/meetings/${id}/members/upgrade`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ targetUserId: memberData.id }), // JSON 형식으로 데이터 설정
            });
            if (!response.ok) { throw new Error("Failed to 부모임장 승급"); }
            else{Alert.alert('성공','부모임장 승급이 완료되었습니다.'); setRe(!re)}
        } catch (error) { console.error("Error 부모임장 승급", error); }
    };
    const onPressProfile= async()=>{
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
                if(myUserId === memberData.id){
                    nav.navigate(PAGES.PROFILE);
                }
                else {
                    nav.navigate(PAGES.EXTERNAL_PROFILE,{id:memberData.id});
                }
            }
        } catch (error) { console.error("Error go profile", error); }
    }

    return (
        <Container>
            <BaseInfoContainer>
                <StyledImage
                source={{uri:memberData.profileUrl}}
               
            />
                <View>
                    <BaseInfoHeader>
                    <Pressable onPress={onPressProfile}><Name>{memberData.name}</Name></Pressable>
                        {(myContext.userRole === "LEADER" || myContext.userRole === "CO_LEADER") &&
                        (memberData.role !== "CO_LEADER" && memberData.role !== "LEADER")&&
                            <OutPressable onPress={onPressUpgrade}>
                                <OutText> 부모임장 승급 </OutText>
                            </OutPressable>}
                        {(myContext.userRole === "LEADER" || myContext.userRole === "CO_LEADER") &&
                        (memberData.role !== "LEADER")&&
                            <OutPressable onPress={onPressOut}>
                                <OutText>내보내기</OutText>
                            </OutPressable>}
                    </BaseInfoHeader>
                    <DetailInfoContainer>
                        <SmallFont>{memberData.department}   </SmallFont>
                        <SmallFont>{memberData.studentId.substr(0, 2)}학번   </SmallFont>
                        <SmallFont>{memberData.phoneNumber}   </SmallFont>
                    </DetailInfoContainer>
                </View>


            </BaseInfoContainer>
            <AdditionalInfoContainer>
                <Score>{memberData.attendenceScore}점</Score>
                <TagContainer>
                    {memberData.features &&
                        <Text>#{tags[0]} </Text>
                    }
                    {memberData.features &&
                        <Text>#{tags[1]}</Text>
                    }
                </TagContainer>
            </AdditionalInfoContainer>


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

const OutPressable = styled.Pressable`
    backgroundColor:${(props) => props.theme.colors.blue.primary};
    borderRadius:${(props) => props.theme.border.radius.small};
    justifyContent:center;
    alignItems:center;
    width:65px;
    marginRight:5px;
    paddingBottom:2px;
`;
const OutText = styled.Text`
    color:white;
    fontSize:${(props) => props.theme.font.size.xSmall};
    fontWeight:${(props) => props.theme.font.weight.medium};
`;
const Name = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.semiBold};
    marginRight:5px;
`;
const Score = styled.Text`
    fontSize:${(props) => props.theme.font.size.primary};
    fontWeight:${(props) => props.theme.font.weight.semiBold};
`;