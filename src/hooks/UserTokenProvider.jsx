// UserTokenProvider.js
import React, { useState } from 'react';
import UserTokenContext from './UserTokenContext';

const UserTokenProvider = ({ children }) => {
  const [userToken, setUserToken] = useState('초기 토큰'); // 초기값 설정

  return (
    <UserTokenContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserTokenContext.Provider>
  );
};

export default UserTokenProvider;
