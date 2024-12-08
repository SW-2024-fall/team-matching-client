import { View } from 'react-native';

import styled from 'styled-components/native';
import Constants from 'expo-constants';

export default function BaseHeader({ left, center, right, backgroundColor = null }) {
  const LeftWrapper = styled(View)`
    position: absolute;
    left: 15px;
    bottom: 15px;
    justify-content: center;
    align-items: center;
  `;

  const CenterWrapper = styled(View)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 15px;
    align-items: center;
    justify-content: center;
  `;

  const RightWrapper = styled(View)`
    position: absolute;
    right: 15px;
    bottom: 15px;
    justify-content: center;
    align-items: center;
  `;

  const HeaderWrapper = styled(View)`
    width: 100%;
    height: 48px;
    background-color: ${backgroundColor};
    padding-top: 30px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${(props) => props.theme.colors.grey.light};
    color: ${(props) => (backgroundColor ? 'white' : props.theme.colors.grey.dark)};
  `;

  return (
    <HeaderWrapper>
      <LeftWrapper>{left}</LeftWrapper>
      <CenterWrapper>{center}</CenterWrapper>
      <RightWrapper>{right}</RightWrapper>
    </HeaderWrapper>
  );
}
