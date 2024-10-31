import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import styled from 'styled-components';
import { blueColors } from '../../../styles/ThemeStyles';
import plusBlank from '../../../assets/plusBlank.svg';
import { WithLocalSvg } from 'react-native-svg/css';
import ex1 from '../../../assets/registerEx1.svg';
import ex2 from '../../../assets/registerEx2.svg';
import ex3 from '../../../assets/registerEx3.svg';
import ex4 from '../../../assets/registerEx4.svg';
import ex5 from '../../../assets/registerEx5.svg';
import ex6 from '../../../assets/registerEx6.svg';
import ex7 from '../../../assets/registerEx7.svg';
import ex8 from '../../../assets/registerEx8.svg';
import ex9 from '../../../assets/registerEx9.svg';
import ex10 from '../../../assets/registerEx10.svg';
import ex11 from '../../../assets/registerEx11.svg';
import ex12 from '../../../assets/registerEx12.svg';



export default function Register() {
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
                    <View style={{ borderWidth: 1, borderRadius: 12, marginTop: 10 }}>
                        <ProfileTextInput placeholder="이름(실명)" ></ProfileTextInput>
                        <ProfileTextInput placeholder="전화번호" ></ProfileTextInput>
                        <ProfileTextInput placeholder="학번(ex.20)"></ProfileTextInput>
                        <TextInput placeholder="학과" style={{ height: 35, paddingHorizontal: 10 }}></TextInput>
                    </View>

                </InputContainer>
                <InputContainer>
                    <InputLable>프로필 사진을 등록해주세요(선택)</InputLable>
                    <PlusBlankWrapper>

                        <WithLocalSvg asset={plusBlank} />
                    </PlusBlankWrapper>
                </InputContainer>

                <InputContainer>
                    <InputLable>선호 모임을 골라주세요.</InputLable>
                    <InterestContainer>
                        <Interest>
                            <WithLocalSvg asset={ex1} />
                            <InterestText>인문학/책/글</InterestText>
                        </Interest>
                        <Interest>
                            <WithLocalSvg asset={ex2} />
                            <InterestText>사진/영상</InterestText>
                        </Interest>
                        <Interest>
                            <WithLocalSvg asset={ex3} />
                            <InterestText>운동</InterestText>
                        </Interest>
                        <Interest>
                            <WithLocalSvg asset={ex4} />
                            <InterestText>외국/언어</InterestText>
                        </Interest>
                        <Interest>
                            <WithLocalSvg asset={ex5} />
                            <InterestText>음악/악기</InterestText>
                        </Interest>
                        <Interest>
                            <WithLocalSvg asset={ex6} />
                            <InterestText>댄스/무용</InterestText>
                        </Interest>
                        <Interest>
                            <WithLocalSvg asset={ex7} />
                            <InterestText>공연/축제</InterestText>
                        </Interest>
                        <Interest>
                            <WithLocalSvg asset={ex8} />
                            <InterestText>캠핑/여행</InterestText>
                        </Interest>
                        <Interest>
                            <WithLocalSvg asset={ex9} />
                            <InterestText>봉사활동</InterestText>
                        </Interest>
                        <Interest>
                            <WithLocalSvg asset={ex10} />
                            <InterestText>학술/연구</InterestText>
                        </Interest>
                        <Interest>
                            <WithLocalSvg asset={ex11} />
                            <InterestText>면접/취준</InterestText>
                        </Interest>
                        <Interest>
                            <WithLocalSvg asset={ex12} />
                            <InterestText>게임</InterestText>
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
    marginBottom:10px;
  
`;
const BaseTextInput = styled.TextInput`
    borderColor: "#000";
    borderWidth: 1px;
    paddingHorizontal: 10px;
    borderRadius: 10px;
    height: 35px;
    marginTop: 5px;
    
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
    fontWeight:${(props) => props.theme.font.weight.bold};
  fontSize:${(props) => props.theme.font.size.primary};
  color:${(props) => props.theme.font.color.primary};
  marginBottom:5px;
`;
const InterestContainer = styled.View`
    flexDirection: row;
    flexWrap: wrap;
`;
const Interest = styled.View`
    marginHorizontal: 1px;
    alignItems: center;
`;
const InterestText = styled.Text`
    marginHorizontal: 0px;
    marginVertical: 0px;
    fontWeight:${(props) => props.theme.font.weight.medium};
  fontSize:${(props) => props.theme.font.size.xSmall};
  color:${(props) => props.theme.font.color.primary};
`;
const NextBtn = styled.TouchableHighlight`

    borderRadius: 10px;
    alignItems: center;
    paddingBottom: 7px;
    marginTop:5px;
    backgroundColor: ${blueColors[500]};
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
    alignItems: start;
    justifyContent: start;
    margin:20px;
`;

const PlusBlankWrapper = styled.View`
    padding:30px;
    backgroundColor:#E5E8EB;
    width:75px;
    height:75px;
    borderRadius:12px;
`;