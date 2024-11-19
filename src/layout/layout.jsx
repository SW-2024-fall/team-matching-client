import { PAGES } from '@navigation/constant';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import DefaultHeader from '@layout/header/DefaultHeader';
import TitleHeader from '@layout/header/TitleHeader';
import CreateHeader from '@layout/header/CreateHeader';
import MainHeader from '@layout/header/MainHeader';
import Appbar from '@layout/appbar/Appbar';

export default function Layout({ screen, title = '', children, navigation }) {
  var Header = <DefaultHeader />;
  const useAppbar =
    screen == PAGES.MAIN ||
    screen == PAGES.MEETING_FEED ||
    screen == PAGES.MEETING_BOARD ||
    screen == PAGES.PROFILE;

  if (screen == PAGES.MAIN) {
    Header = <MainHeader />;
  } else if (screen == PAGES.MEETING) {
    Header = <TitleHeader title={title} />;
  } else if (screen == PAGES.MEETING_CREATE || screen == PAGES.MEETING_HISTORY_CREATE) {
    Header = <CreateHeader />;
  } else if (screen == PAGES.AUTH) {
    Header = <View />;
  }

  const Wrapper = styled.SafeAreaView`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background.primary};
    justify-content: space-between;
    font-size: ${(props) => props.theme.font.size.primary};
    font-weight: ${(props) => props.theme.font.weight.primary};
    color: ${(props) => props.theme.font.color.primary};
  `;

  const Body = styled.View`
    flex: 1;
  `;

  return (
    <Wrapper>
      {Header}
      <Body>
        {/* <View>{children}</View> */}
        <ScrollView>{children}</ScrollView>
      </Body>
      {useAppbar && <Appbar navigation={navigation} />}
    </Wrapper>
  );
}
