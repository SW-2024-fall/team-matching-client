import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
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
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';
import { Image } from 'react-native';
import Profile from '../../profile/Profile';
const interests = [
    "인문학/사회/글", "사진/영상","운동","외국/언어","음악/악기","댄스/무용","공연/축제","캠핑/여행","봉사활동","학술/연구","면접/취준","게임"
]
export default function Register() {
    const [image, setImage] = useState(null);
    const [pressedInterest, setPressedInterest] = useState(null);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [studentId, setStudentId] = useState('');
    const [major, setMajor] = useState('');
    const addImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('사진 라이브러리에 접근할 수 없습니다.');
            return;
        }

        // 이미지 선택
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            selectionLimit: 1, // 최대 5장 선택 가능
        });

        if (!result.cancelled) {
            const newImage = result.assets.map(asset => asset.uri);
            console.log("newImage = " + newImage);
            setImage(newImage)
        }
    };
    const onPressSignUp= ()=>{
        //api구현되면 구현하기
    }
    return (
        <Container>
            <ScrollView>
                <InputContainer>
                    <InputLable>이메일</InputLable>
                    <BaseTextInput
                        value={email}
                        onChangeText={setEmail}></BaseTextInput>
                </InputContainer>
                <InputContainer>
                    <InputLable>비밀번호를 설정해주세요.</InputLable>
                    <BaseTextInput
                        value={pwd}
                        onChangeText={setPwd}></BaseTextInput>
                </InputContainer>
                <InputContainer>
                    <InputLable>비밀번호를 다시 한 번 입력해주세요.</InputLable>
                    <BaseTextInput
                        value={pwd2}
                        onChangeText={setPwd2}></BaseTextInput>
                </InputContainer>
                <InputContainer>
                    <InputLable>기본 정보를 입력해주세요.</InputLable>
                    <View style={{ borderWidth: 1, borderRadius: 12, marginTop: 10 }}>
                        <ProfileTextInput placeholder="이름(실명)"
                            value={name}
                            onChangeText={setName} ></ProfileTextInput>
                        <ProfileTextInput placeholder="전화번호"
                            value={phoneNo}
                            onChangeText={setPhoneNo} ></ProfileTextInput>
                        <ProfileTextInput placeholder="학번(ex.20)"
                            value={studentId}
                            onChangeText={setStudentId}></ProfileTextInput>
                        <TextInput placeholder="학과"
                            style={{ height: 35, paddingHorizontal: 10 }}
                            value={major}
                            onChangeText={setMajor}></TextInput>
                    </View>

                </InputContainer>
                <InputContainer>
                    <InputLable>프로필 사진을 등록해주세요(선택)</InputLable>
                    {image === null ?
                        <PlusBlankWrapper>
                            <Pressable onPress={addImage}>
                                <WithLocalSvg asset={plusBlank} />
                            </Pressable>
                        </PlusBlankWrapper>
                        : <ProfileImg
                            source={image} />}

                </InputContainer>

                <InputContainer>
                    <InputLable>선호 모임을 골라주세요.</InputLable>
                    <InterestContainer>
                        <Interest pressed={pressedInterest === 1}>
                            <Pressable onPress={() => setPressedInterest(1)}>
                                <WithLocalSvg asset={ex1} />
                                <InterestText>인문학/책/글</InterestText>
                            </Pressable>
                        </Interest>
                        <Interest pressed={pressedInterest === 2}>
                            <Pressable onPress={() => setPressedInterest(2)}>

                                <WithLocalSvg asset={ex2} />
                                <InterestText>사진/영상</InterestText>
                            </Pressable>
                        </Interest>
                        <Interest pressed={pressedInterest === 3}>
                            <Pressable onPress={() => setPressedInterest(3)}>
                                <WithLocalSvg asset={ex3} />
                                <InterestText>운동</InterestText>
                            </Pressable>

                        </Interest>
                        <Interest pressed={pressedInterest === 4}>
                            <Pressable onPress={() => setPressedInterest(4)}>
                                <WithLocalSvg asset={ex4} />
                            </Pressable>
                            <InterestText>외국/언어</InterestText>
                        </Interest>
                        <Interest pressed={pressedInterest === 5}>
                            <Pressable onPress={() => setPressedInterest(5)}>
                                <WithLocalSvg asset={ex5} />
                            </Pressable>
                            <InterestText>음악/악기</InterestText>
                        </Interest>
                        <Interest pressed={pressedInterest === 6}>
                            <Pressable onPress={() => setPressedInterest(6)}>
                                <WithLocalSvg asset={ex6} />
                            </Pressable>
                            <InterestText>댄스/무용</InterestText>
                        </Interest>
                        <Interest pressed={pressedInterest === 7}>
                            <Pressable onPress={() => setPressedInterest(7)}>
                                <WithLocalSvg asset={ex7} />
                            </Pressable>
                            <InterestText>공연/축제</InterestText>
                        </Interest>
                        <Interest pressed={pressedInterest === 8}>
                            <Pressable onPress={() => setPressedInterest(8)}>
                                <WithLocalSvg asset={ex8} />
                            </Pressable>
                            <InterestText>캠핑/여행</InterestText>
                        </Interest>
                        <Interest pressed={pressedInterest === 9}>
                            <Pressable onPress={() => setPressedInterest(9)}>
                                <WithLocalSvg asset={ex9} />
                            </Pressable>
                            <InterestText>봉사활동</InterestText>
                        </Interest>
                        <Interest pressed={pressedInterest === 10}>
                            <Pressable onPress={() => setPressedInterest(10)}>
                                <WithLocalSvg asset={ex10} />
                            </Pressable>
                            <InterestText>학술/연구</InterestText>
                        </Interest>
                        <Interest pressed={pressedInterest === 11}>
                            <Pressable onPress={() => setPressedInterest(11)}>
                                <WithLocalSvg asset={ex11} />
                            </Pressable>
                            <InterestText>면접/취준</InterestText>
                        </Interest>
                        <Interest pressed={pressedInterest === 12}>
                            <Pressable onPress={() => setPressedInterest(12)}>
                                <WithLocalSvg asset={ex12} />
                            </Pressable>
                            <InterestText>게임</InterestText>
                        </Interest>

                    </InterestContainer>
                    <View>
                        <NextBtn onPress={onPressSignUp}>
                            <NextText>다음</NextText>
                        </NextBtn>
                    </View>
                </InputContainer>
                <StatusBar style="auto" />
            </ScrollView>
        </Container >
    );
}

const ProfileImg = styled.Image`
    width:50px;
    height:50px;
    borderRadius:10px;
`;
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
    margin: ${(props) => (props.pressed ? '1px' : '3px')};
    alignItems: center;
    border: ${(props) => (props.pressed ? '2px solid black' : 'none')};
    borderRadius:5px;
`;
const InterestText = styled.Text`
    marginHorizontal: 0px;
    marginVertical: 0px;
    fontWeight:${(props) => props.theme.font.weight.medium};
  fontSize:${(props) => props.theme.font.size.xSmall};
  color:${(props) => props.theme.font.color.primary};
`;
const NextBtn = styled.Pressable`

    borderRadius: 10px;
    alignItems: center;
    paddingBottom: 7px;
    marginTop:5px;
    backgroundColor: #0082FF;
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