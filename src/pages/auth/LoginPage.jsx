import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'; // CheckBox 라이브러리 추가

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');


  const handleLogin = () => {
    // 로그인 처리 로직 추가
    // 예: 이메일 유효성 검사
    if (!email || !password) {
      setEmailError('이메일 또는 비밀번호를 확인해주세요.');
      return;
    }
    // 이메일과 비밀번호가 유효할 경우 로그인 처리
    console.log('로그인 시도:', { email, password });
  };


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, marginBottom: 10}}> 대충 로고 </Text>
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
          <TouchableOpacity>
            <Text style={styles.detailedText}>회원가입하기</Text>
          </TouchableOpacity>
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
