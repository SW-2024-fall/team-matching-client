import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { greyBlueColors, blueColors, greyColors } from '../../../styles/ThemeStyles';
import { WithLocalSvg } from 'react-native-svg/css';
import logo from '../../../assets/logo.svg';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PAGES } from '../../../navigation/constant';
export default function VerifyEmail() {
    const [inputValue, setInputValue] = useState('');
    const nav = useNavigation();
    const handleInputChange = (text) => {
        setInputValue(text);
    };
    return (
        <Container>
            <WithLocalSvg
                width={147}
                height={24}
                asset={logo}
            />
            <InputLable>이메일을 입력해주세요</InputLable>

            <BaseTextInput placeholder='이메일' onChangeText={handleInputChange}>{inputValue}</BaseTextInput>
            <AuthBtnWrapper>
                <AuthBtn onPress={()=>nav.navigate(PAGES.REGISTER)}>
                    <AuthBtnText>다음</AuthBtnText>
                </AuthBtn>
            </AuthBtnWrapper>
        </Container>
    );
}

const Container = styled.View`
    padding: 20px;
    flex: 1;
    justifyContent:center;
    
    alignItems:center;
`;

const TextInputWrapper = styled.View`
    backgroundColor:green;
`;
const BaseTextInput = styled.TextInput`
    borderColor: ${(props) => props.theme.border.color};
    borderWidth: 1px;
    paddingHorizontal: 10px;
    borderRadius: ${(props) => props.theme.border.radius.small};
    height: 35px;
    marginTop: 8px;
    marginRight: 5px;
    width:100%;
    
`;
const InputLable = styled.Text`
    fontSize:${(props) => props.theme.font.size.primary};
    fontWeight:700;
    color:${(props) => props.theme.font.color.primary};
    marginTop:10px;
    marginBottom:10px;
`;
const AuthBtnWrapper = styled.View`
    width:100%;
`;
const AuthBtnText = styled.Text`
    fontSize:20px;
    color:white;
    fontWeight:600;
    marginBottom:8px;
    marginTop:3px;
`;

const AuthBtn = styled.Pressable`
    backgroundColor: ${(props) => props.theme.colors.blue.primary};
    alignItems: center;
    justifyContent:center;
    borderRadius:13px;
    width: 100%;
    marginTop:7px;
`;

