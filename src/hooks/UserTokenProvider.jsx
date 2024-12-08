// UserTokenProvider.js
import React, { useState } from 'react';
import UserTokenContext from './UserTokenContext';

const UserTokenProvider = ({ children }) => {
  const { accessToken, setUserToken } = useAuth();

  return (
    <UserTokenContext.Provider value={{ accessToken, setUserToken }}>
      {children}
    </UserTokenContext.Provider> 
  );
};

export default UserTokenProvider;
