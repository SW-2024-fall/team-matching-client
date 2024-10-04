import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import styled from 'styled-components';

export default function SignUpPage() {
    return (
        <Container>
            <ScrollView>
                <InputContainer>
                    <InputLable>이메일</InputLable>
                    <BaseTextInput></BaseTextInput>
                </InputContainer>
                <InputContainer>
                    <InputLable>비밀번호를 설정해주세요.</InputLable>
                    <BaseTextInput></BaseTextInput>
                </InputContainer>
                <InputContainer>
                    <InputLable>비밀번호를 다시 한 번 입력해주세요.</InputLable>
                    <BaseTextInput></BaseTextInput>
                </InputContainer>
                <InputContainer>
                    <InputLable>기본 정보를 입력해주세요.</InputLable>
                    <View style={{borderWidth:1, borderRadius:12, marginTop:10}}>
                        <ProfileTextInput placeholder="이름(실명)" ></ProfileTextInput>
                        <ProfileTextInput placeholder="전화번호" ></ProfileTextInput>
                        <ProfileTextInput placeholder="학번(ex.20)"></ProfileTextInput>
                        <TextInput placeholder="학과" style={{height:35, paddingHorizontal:10}}></TextInput>
                    </View>

                </InputContainer>
                <InputContainer>
                    <InputLable>프로필 사진을 등록해주세요(선택)</InputLable>
                    <Foundation name="photo" size={50} color="black" />
                </InputContainer>

                <InputContainer>
                    <InputLable>선호 모임을 골라주세요.</InputLable>
                    <InterestContainer>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <Foundation name="photo" size={50} color="black" />
                            <InterestText>운동</InterestText>
                        </Interest>
                    </InterestContainer>
                    <View>
                        <NextBtn>
                            <NextText>다음</NextText>
                        </NextBtn>
                    </View>
                </InputContainer>
                <StatusBar style="auto" />
            </ScrollView>
        </Container>
    );
}
const InputContainer = styled.View`
  
`;
const BaseTextInput = styled.TextInput`
    borderColor: "#000";
    borderWidth: 1px;
    paddingHorizontal: 10px;
    borderRadius: 10px;
    height: 35px;
    marginTop: 8px;
    marginRight: 5px;
`;
const ProfileTextInput = styled.TextInput`
    borderColor: "#000";
    borderBottomColor: #000;
    borderBottomWidth: 1px;
    paddingHorizontal: 10px;
    height: 35px;
`;
const InputLable = styled.Text`
    fontSize: 14px;
    fontWeight:700;
`;
const InterestContainer = styled.View`
    flexDirection: row;
    flexWrap: wrap;
`;
const Interest = styled.View`
    marginHorizontal: 2px;
    alignItems: center;
`;
const InterestText = styled.Text`
    marginHorizontal: 10px;
    marginVertical: 5px;
`;
const NextBtn = styled.TouchableHighlight`
    borderColor: "#000";
    borderWidth: 1px;
    borderRadius: 10px;
    alignItems: center;
    paddingBottom: 7px;
    backgroundColor: blue;
    justifyContent:center;
    height:40px;
`;
const NextText = styled.Text`
    fontSize: 14px;
    fontWeight: 500;
    color:white;
`;
const Container = styled.View`
    flex: 1;
    backgroundColor:#fff;
    alignItems: start;
    justifyContent: start;
    padding:20px;
`;
