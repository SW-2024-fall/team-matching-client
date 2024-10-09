import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'; // CheckBox 라이브러리 추가

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isChecked, setIsChecked] = useState(false); // 체크 상태 


  const handleLogin = () => {
    // 로그인 처리 로직 추가
    // 예: 이메일 유효성 검사
    if (!email.includes('@')) {
      setEmailError('이메일을 확인해주세요.');
      return;
    }
    // 이메일과 비밀번호가 유효할 경우 로그인 처리
    console.log('로그인 시도:', { email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>시대생모여라</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

	  <View style={styles.checkboxContainer}>
        <CheckBox
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
          containerStyle={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>로그인 상태 유지</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

    {/* 아이디, 비밀번호 찾기 생략 */}

      {/* <View style={styles.linkContainer}>
        <TouchableOpacity>
          <Text style={styles.linkText}>아이디 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View> */}

    
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#0082FF',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    backgroundColor: 'transparent', // 배경색 투명
    borderWidth: 0, // 테두리 없애기
	padding: 0, // 패딩 없애기
    margin: 0, // 마진 없애기
  },
  checkboxLabel: {
    marginLeft: 0,
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  linkText: {
    color: '#0082FF',
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
