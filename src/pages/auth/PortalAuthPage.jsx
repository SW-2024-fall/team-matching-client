import { View } from 'react-native';
import styled from 'styled-components';


export default function PortalAuthPage() {
    return (
        <Container> 
            <Title>시대생모여라</Title>
            <InputLable>이메일을 입력해주세요</InputLable>
            
            <BaseTextInput placeholder='이메일'></BaseTextInput>
            <AuthBtnWrapper>
                <AuthBtn>
                    <AuthBtnText>인증하기</AuthBtnText>
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
const Title = styled.Text`
    color:blue;
    fontSize:30px;
    fontWeight:700;
    margin:10px;
`;
const TextInputWrapper = styled.View`
    backgroundColor:green;
`;
const BaseTextInput = styled.TextInput`
    borderColor: "#000";
    borderWidth: 1px;
    paddingHorizontal: 10px;
    borderRadius: 10px;
    height: 35px;
    marginTop: 8px;
    marginRight: 5px;
    width:100%;
    
`;
const InputLable = styled.Text`
    fontSize:15px;
    fontWeight:700;
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

const AuthBtn = styled.View`
    backgroundColor: blue;
    alignItems: center;
    justifyContent:center;
    borderRadius:13px;
    width: 100%;
    marginTop:7px;
`;
