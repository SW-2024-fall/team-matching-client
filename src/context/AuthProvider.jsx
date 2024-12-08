import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi } from '@utils/auth';
import getUser from '@utils/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 인증 상태를 관리하는 Context 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        const userData = await getUser();
        if (userData) {
          setUser(userData.data);
        }
      } else {
        setUser(null);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    console.log("login");
    const data = await loginApi(email, password);

    if (data === null) {
      return false;
    }

    await AsyncStorage.setItem('accessToken', data.data.accessToken);
    await AsyncStorage.setItem('refreshToken', data.data.refreshToken);

    console.log("AsyncStorage.getItem('accessToken'): ", await AsyncStorage.getItem('accessToken'));
    const userData = await getUser();
    if (userData) {
      setUser(userData.data);
    }

    return true;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
