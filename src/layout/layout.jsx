import { PAGES } from '@navigation/constant';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { CreateHeader, ProfileHeader, BoardHeader, MainHeader, DetailHeader } from '@layout/header';
import Appbar from '@layout/appbar/Appbar';

export default function Layout({ screen, title = '', children, navigation, RightComponent }) {
  var Header = <View />;
  const useAppbar =
    screen == PAGES.MAIN ||
    screen == PAGES.RECOMMEND ||
    screen == PAGES.MEETING_BOARD ||
    screen == PAGES.MYPROFILE;

  if (screen == PAGES.MEETING_BOARD) {
    Header = <BoardHeader FilterComponent={RightComponent} />;
  } else if (screen == PAGES.MEETING) {
    Header = <DetailHeader title={title} />;
  } else if (screen == PAGES.MEETING_CREATE || screen == PAGES.MEETING_HISTORY_CREATE) {
    Header = <CreateHeader />;
  } else if (screen == PAGES.MAIN || screen == PAGES.RECOMMEND) {
    Header = <MainHeader />;
  } else if (screen == PAGES.MYPROFILE) {
    Header = <ProfileHeader isMe={true} />;
  } else if (screen == PAGES.PROFILE) {
    Header = <ProfileHeader />;
  }

  const Wrapper = styled.View`
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
          {children}
        </Body>
      {useAppbar && <Appbar navigation={navigation} />}
    </Wrapper>
  );
}
