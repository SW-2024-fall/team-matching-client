import styled from 'styled-components/native';
import homeIcon from '@assets/homeIcon.svg';
import boardIcon from '@assets/boardIcon.svg';
import meetingIcon from '@assets/meetingIcon.svg';
import profileIcon from '@assets/profileIcon.svg';
import { WithLocalSvg } from 'react-native-svg/css';
import { PAGES } from '@navigation/constant';

export default function Appbar({ navigation }) {
  const Wrapper = styled.View`
    width: 100%;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.colors.background.appbar};
  `;

  const IconBtnWrapper = styled.Pressable`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 36px;
  `;

  const Label = styled.Text`
    font-size: ${(props) => props.theme.font.size.xSmall};
    color: ${(props) => props.theme.font.color.primary};
  `;

  const goHome = () => {
    navigation.navigate(PAGES.MAIN);
  };

  const goBoard = () => {
    navigation.navigate(PAGES.MEETING_BOARD);
  };

  const goMeetingFeed = () => {
    // navigation.navigate(PAGES.MEETING_FEED);
    // 당장에는 모임 피드가 없기 때문에 메인으로 이동
    navigation.navigate(PAGES.MAIN);
  };

  const goProfile = () => {
    navigation.navigate(PAGES.PROFILE, {access: "me"});
  };

  return (
    <Wrapper>
      <IconBtnWrapper onPress={goHome}>
        <WithLocalSvg asset={homeIcon} />
        <Label>홈</Label>
      </IconBtnWrapper>
      <IconBtnWrapper onPress={goBoard}>
        <WithLocalSvg asset={boardIcon} />
        <Label>게시판</Label>
      </IconBtnWrapper>
      <IconBtnWrapper onPress={goMeetingFeed}>
        <WithLocalSvg asset={meetingIcon} />
        <Label>모임 피드</Label>
      </IconBtnWrapper>
      <IconBtnWrapper onPress={goProfile}>
        <WithLocalSvg asset={profileIcon} />
        <Label>프로필</Label>
      </IconBtnWrapper>
    </Wrapper>
  );
}
