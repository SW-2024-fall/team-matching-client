import React, { createContext, useContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

// 인증 상태를 관리하는 Context 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkLoginStatus();
  }, []);

  const doLogin = async (token) => {
    await AsyncStorage.setItem('userToken', token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };
  const getToken = async() => {
	const token = await AsyncStorage.getItem('userToken');
	return token;
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, doLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
