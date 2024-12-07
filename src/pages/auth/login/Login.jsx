import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PAGES } from '../../../navigation/constant';
import { useAuth } from '../AuthProvider';
import Layout from '../../../layout/layout';
import logo from '../../../assets/logo.svg';
import { WithLocalSvg } from 'react-native-svg/css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserTokenContext from '../../../hooks/UserTokenContext';
import { useContext } from 'react';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const nav = useNavigation();
  const { doLogin } = useAuth(); 
  const { userToken, setUserToken } = useContext(UserTokenContext);
  const handleLogin = () => {
    if (!email || !password) {
      setEmailError('이메일 또는 비밀번호를 확인해주세요.');
      return;
    }
    else tryLogin();
   
  };
  // const [data, setData] = useState(null);
  const tryLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 전송
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
      .then(response =>{
        if (!response.ok) {
          Alert.alert("아이디 또는 비밀번호를 확인하세요.");
        }
        
        return response.json()
      })
      .then(data =>{
        console.log(data.data.accessToken);
        // doLogin(data.data.token);
        setUserToken(data.data.accessToken);
        // AsyncStorage.setItem('userToken', data.data.accessToken).then(nav.navigate(PAGES.MAIN));
        nav.navigate(PAGES.MAIN,{});

      })
      // .then(nav.navigate(PAGES.MAIN,{}));


    } catch (error) {}

    // nav.navigate(PAGES.MAIN, {});

  };

  return (

    <View style={styles.container}>
      <WithLocalSvg asset={logo} width={147} height={24}/>
      <Text style={styles.title}>이메일을 입력해주세요</Text>
      <View style={styles.emailContainer}>
        <TextInput
          style={styles.emailInput}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.emailSuffix}> @uos.ac.kr </Text>
      </View>

      <TextInput
        style={styles.pwInput}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <TouchableOpacity 
        style={email ? styles.loginButton : styles.unActivatedButton} 
        onPress={email ? handleLogin : null}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>

    <View style={styles.signupContainer}>
          <Pressable onPress={()=>nav.navigate(PAGES.REGISTER)}>
            <Text style={styles.detailedText}>회원가입하기</Text>
          </Pressable>
    </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emailInput: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  pwInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    height: 37,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#0082FF',
    paddingVertical: 10,
    borderRadius: 12,
    width: '100%',
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unActivatedButton: {
    backgroundColor: '#B0B8C1',
    paddingVertical: 10,
    borderRadius: 12,
    width: '100%',
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signupContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  detailedText: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    fontSize: 14,
    
  },
  emailSuffix: {
    height: 50,
    lineHeight: 50, // 텍스트를 세로로 중앙 정렬
    fontSize: 12,
    color: '#555',
    margin: 5,
  },
  emailContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
    height: 37,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;