// UserTokenProvider.js
import React, { useState } from 'react';
import UserTokenContext from './UserTokenContext';

const UserTokenProvider = ({ children }) => {
  const [accessToken, setUserToken] = useState('초기 토큰'); // 초기값 설정

  return (
    <UserTokenContext.Provider value={{ accessToken, setUserToken }}>
      {children}
    </UserTokenContext.Provider>
  );
};

export default UserTokenProvider;
