import React, { createContext, useState, useContext } from 'react';

//Context 생성
const UserContext = createContext(null);

// Context Provider 컴포넌트 생성
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

   // user와 setUser를 value로 전달
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => useContext(UserContext);
