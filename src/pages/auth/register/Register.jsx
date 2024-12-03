import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import { PAGES } from '../../../navigation/constant';
import logo from '../../../assets/logo.svg';
const interests = [
    "인문학/사회/글", "사진/영상","운동","외국/언어","음악/악기","댄스/무용","공연/축제","캠핑/여행","봉사활동","학술/연구","면접/취준","게임"
]
const Major = {
    PUBLIC_ADMINISTRATION: "행정학과",
    INTERNATIONAL_RELATIONS: "국제관계학과",
    ECONOMICS: "경제학부",
    SOCIAL_WELFARE: "사회복지학과",
    TAXATION: "세무학과",
    BUSINESS_ADMINISTRATION: "경영학부",
    ELECTRICAL_AND_COMPUTER_ENGINEERING: "전자전기컴퓨터공학부",
    COMPUTER_SCIENCE: "컴퓨터과학부",
    CHEMICAL_ENGINEERING: "화학공학과",
    MECHANICAL_AND_INFORMATION_ENGINEERING: "기계정보공학과",
    MATERIALS_SCIENCE_AND_ENGINEERING: "신소재공학과",
    CIVIL_ENGINEERING: "토목공학과",
    ARTIFICIAL_INTELLIGENCE: "인공지능학과",
    ENGLISH_LANGUAGE_AND_LITERATURE: "영어영문학과",
    KOREAN_LANGUAGE_AND_LITERATURE: "국어국문학과",
    KOREAN_HISTORY: "국사학과",
    PHILOSOPHY: "철학과",
    CHINESE_LANGUAGE_AND_CULTURE: "중국어문화학과",
    MATHEMATICS: "수학과",
    STATISTICS: "통계학과",
    PHYSICS: "물리학과",
    LIFE_SCIENCE: "생명과학과",
    ENVIRONMENTAL_HORTICULTURE: "환경원예학과",
    APPLIED_CHEMISTRY: "융합응용화학과",
    ARCHITECTURAL_ENGINEERING: "건축학부(건축공학)",
    ARCHITECTURE: "건축학부(건축학)",
    URBAN_ENGINEERING: "도시공학과",
    TRANSPORTATION_ENGINEERING: "교통공학과",
    LANDSCAPE_ARCHITECTURE: "조경학과",
    URBAN_ADMINISTRATION: "도시행정학과",
    URBAN_SOCIOLOGY: "도시사회학과",
    GEOINFORMATICS: "공간정보공학과",
    ENVIRONMENTAL_ENGINEERING: "환경공학부",
    MUSIC: "음악학과",
    DESIGN: "디자인학과",
    SCULPTURE: "조각학과",
    SPORTS_SCIENCE: "스포츠과학과",
    LIBERAL_STUDIES: "자유전공학부",
    CONVERGENCE_STUDIES: "융합전공학부"
};

function translateMajorToEnglish(koreanName) {
    const entries = Object.entries(Major);
    for (const [englishName, name] of entries) {
        if (name === koreanName) {
            return englishName;
        }
    }
    return null; // 이름이 없을 경우 null 반환
}

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
    const nav = useNavigation();
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
            quality: 0,
            selectionLimit: 1, // 최대 5장 선택 가능
        });
        console.log(result);
        if (!result.cancelled) {
            const newImage = result.assets.map(asset => asset.uri);
            console.log("newImage = " + newImage);
            setImage(newImage)
        }
    };
    const onPressSignUp= async ()=>{
    
        const MEETING_CATEGORY = {
            '인문학/책/글': 'LITERATURE',
            '사진/영상': 'PHOTOGRAPHY',
            '학술/연구': 'RESEARCH',
            '운동': 'EXERCISE',
            '외국/언어': 'LANGUAGE',
            '음악/악기': 'MUSIC',
            '댄스/무용': 'DANCE',
            '면접/취준': 'JOB_SEARCH',
            '공연/축제': 'FESTIVAL',
            '캠핑/여행': 'TRAVEL',
            '봉사활동': 'VOLUNTEER',
            '게임/오락': 'ENTERTAINMENT',
            '기타': 'ETC',
          };
        
          const apipressedInterest = MEETING_CATEGORY[pressedInterest];

        if (!email) {
            Alert.alert('필수 입력 항목을 모두 채워주세요');
            return;
          }
      
          const formData = new FormData();
      
            if (image) {
              formData.append('profile', {
                uri: image.uri,
                name: 'profile_image.jpg', // 파일 이름
                type: 'image/jpeg', // MIME 타입
              });
            }
      
        const signupData = {
            username: name,
            email: email,
            password: pwd,
            major: translateMajorToEnglish(major),
            studentId: studentId,
            phoneNumber: phoneNo,
            prefeeredCategories: apipressedInterest,
        };
        formData.append('signupRequest', {"string": JSON.stringify(signupData), type: "application/json"});
      
        try {
          const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formData
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          Alert.alert(
            '성공',
            '회원가입에 성공했습니다.',
            [
              {
                text: '확인',
                onPress: () => {
                  // 여기서 원하는 이벤트를 발생시킵니다.
                  nav.navigate(PAGES.LOGIN);
                  // 추가적인 이벤트 처리 로직을 여기에 작성
                },
              },
            ],
            { cancelable: false } // 배경을 클릭해도 닫히지 않게 설정
          );
        } catch (error) {
          Alert.alert('오류', '회원가입에 실패했습니다. 다시 시도해 주세요.');
        }
    }
    return (
        <Container>
            <ScrollView>
                <InputContainer>
                <Pressable onPress={()=>nav.navigate(PAGES.LOGIN)}>

                    <WithLocalSvg asset={logo}/>
                </Pressable>
                    <InputLable>이메일</InputLable>
                    <BaseTextInput
                        value={email}
                        onChangeText={setEmail}></BaseTextInput>
                </InputContainer>
                <InputContainer>
                    <InputLable>비밀번호를 설정해주세요.</InputLable>
                    <BaseTextInput
                        value={pwd}
                        secureTextEntry
                        onChangeText={setPwd}></BaseTextInput>
                </InputContainer>
                <InputContainer>
                    <InputLable>비밀번호를 다시 한 번 입력해주세요.</InputLable>
                    <BaseTextInput
                        value={pwd2}
                        secureTextEntry
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
    marginTop:0px;
  
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