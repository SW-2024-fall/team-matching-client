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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MemberComponent({ id, memberData, re, setRe, userRole}) {
    const nav = useNavigation();
    useEffect(() => {
        const fetchData = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
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
        const accessToken = await AsyncStorage.getItem('accessToken');
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
        const accessToken = await AsyncStorage.getItem('accessToken');
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
            <StyledImage
                source={{uri:memberData.profileUrl}}/>
            <InfoContainer>
                    <HeaderContainer>
                        <HeaderLeft>
                            <Pressable onPress={onPressProfile}><Name>{memberData.name}</Name></Pressable>
                            {(userRole === "LEADER" || userRole === "CO_LEADER") &&
                            (memberData.role !== "CO_LEADER" && memberData.role !== "LEADER")&&
                                <OutPressable onPress={onPressUpgrade}>
                                    <OutText> 부모임장 승급 </OutText>
                                </OutPressable>}
                            {(userRole === "LEADER" || userRole === "CO_LEADER") &&
                            (memberData.role !== "LEADER")&&
                                <OutPressable onPress={onPressOut}>
                                    <OutText>내보내기</OutText>
                                </OutPressable>}
                        </HeaderLeft>
                        <HeaderRight>
                            <Score>{memberData.attendenceScore}점</Score>
                        </HeaderRight>
                </HeaderContainer>
                <DetailContainer>
                    <DetailLeft>
                        <DetailText>{memberData.studentId.substr(0, 2)}학번</DetailText>
                        <DetailText>{memberData.phoneNumber}</DetailText>
                    </DetailLeft>
                    <DetailRight>
                        {memberData.features &&
                        <DetailText>#{memberData.features[0]} </DetailText>
                    }
                    {memberData.features &&
                        <DetailText>#{memberData.features[1]}</DetailText>
                    }
                    </DetailRight>
                </DetailContainer>
            </InfoContainer>
        </Container>
    )
}
const StyledImage = styled.Image`
width:50px;
height:50px;
borderRadius:25px;
marginRight:10px;
`;
const Container = styled.View`
    flex:1;
    flexDirection:row;
    alignItems:center;
    marginTop:20px;
`;

const InfoContainer = styled.View`
    flex:1;
    justifyContent:center;
    gap:8px;
`;

const HeaderContainer = styled.View`
    flexDirection:row;
    justifyContent:space-between;
    alignItems:center;
`;

const HeaderLeft = styled.View`
    flexDirection:row;
    gap:10px;
    alignItems:center;
`;

const HeaderRight = styled.Text`
    color:${(props) => props.theme.font.color.primary};
    fontSize:${(props) => props.theme.font.size.primary};
    fontWeight:${(props) => props.theme.font.weight.semiBold};
`;

const DetailContainer = styled.View`
    flexDirection:row;
    justifyContent:space-between;
    alignItems:center;
`;

const DetailLeft = styled.View`
    flexDirection:row;
    gap:4px;
`;

const DetailRight = styled.View`
    flexDirection:row;
    gap:4px;
`;

const DetailText = styled.Text`
    color:${(props) => props.theme.font.color.primary};
    fontSize:${(props) => props.theme.font.size.small};
    fontWeight:${(props) => props.theme.font.weight.regular};
`;

const OutPressable = styled.Pressable`
    backgroundColor:${(props) => props.theme.colors.blue.primary};
    borderRadius:${(props) => props.theme.border.radius.xSmall};
    padding: 2px 8px;
`;
const OutText = styled.Text`
    color:white;
    fontSize:${(props) => props.theme.font.size.small};
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