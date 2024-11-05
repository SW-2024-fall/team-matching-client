import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Context 생성
const UserContext = createContext();

// Context Provider 컴포넌트 생성
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setsLoggedIn] =useState(false);

    // AsyncStorage에서 로그인 상태 불러오기
    useEffect(() => {
        const loadUserData = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (storedUser && accessToken) {
                setUser(JSON.parse(storedUser));
                setIsLoggedIn(true);
            }
        };
        loadUserData();
    }, []);

    // 로그인 함수
    const login = async (userData, accessToken, refreshToken) => {
        // 유저 정보와 토큰을 AsyncStorage에 저장
        await AsyncStorage.multiSet([
            ['user', JSON.stringify(userData)],
            ['accessToken', accessToken],
            ['refreshToken', refreshToken]
        ]);

        setUser(userData);
        setIsLoggedIn(true);
    };

    // 로그아웃 함수
    const logout = async () => {
        await AsyncStorage.multiRemove(['user', 'accessToken', 'refreshToken']);
        setUser(null);
        setIsLoggedIn(false);
    };

   // user와 setUser를 value로 전달
    return (
        <UserContext.Provider value={{ user, isLoggedIn, login, logout, }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
