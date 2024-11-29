import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';

import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { PAGES } from '@navigation/constant';

export default function BaseHeader({ left, center, right }) {
  const LeftWrapper = styled(View)`
    position: absolute;
    width:25%;
    marginTop:30px;
    marginLeft:5%;
  `;

  const CenterWrapper = styled(View)`
    position: absolute;
    marginTop:30px;
    width:25%;
    marginLeft:42%;
    align-items: center;
  `;

  const RightWrapper = styled(View)`
    position: absolute;
    marginTop:30px;
    width:25%;
    marginLeft:80%;
  `;

  const HeaderWrapper = styled(View)`
    width: 100%;
    height: 60px;
    background-color: white;
    padding-top: ${Constants.statusBarHeight + 30}px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${(props) => props.theme.colors.grey.light};
  `;

  return (
    <HeaderWrapper>
      <LeftWrapper>{left}</LeftWrapper>
      <CenterWrapper>{center}</CenterWrapper>
      <RightWrapper>{right}</RightWrapper>
    </HeaderWrapper>
  );
}
