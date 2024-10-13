import styled from 'styled-components/native';
import homeIcon from '@assets/homeIcon.svg';
import boardIcon from '@assets/boardIcon.svg';
import meetingIcon from '@assets/meetingIcon.svg';
import profileIcon from '@assets/profileIcon.svg';
import { WithLocalSvg } from 'react-native-svg/css';
import { PAGES } from '@navigation/constant';
import { useNavigation } from '@react-navigation/native';

export default function Appbar() {
  const navigation = useNavigation();

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

  const goRecommend = () => {
    navigation.navigate(PAGES.RECOMMEND);
  };

  const goProfile = () => {
    navigation.navigate(PAGES.MYPROFILE);
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
