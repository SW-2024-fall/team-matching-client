import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import styled from 'styled-components/native';
import { theme } from '@styles/ThemeStyles';
import { useState } from 'react';

const Body = styled.View`
  padding: 30px 20px;
  gap: 20px;
  align-items: center;
`;

const RecommendTitleWrapper = styled.View`
  padding: 0 20px;
  gap: 10px;
  align-items: center;
`;

const RecommendTitle = styled.Text`
  font-size: ${theme.font.size.large};
  font-weight: ${theme.font.weight.semiBold};
`;

const UserFeatureWrapper = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const UserFeature = styled.View`
  padding: 8px 12px;
  border: solid 1px ${theme.colors.blue.primary};
  border-radius: ${theme.border.radius.primary};
`;

const UserFeatureText = styled.Text`
  color: ${theme.colors.blue.primary};
  font-size: ${theme.font.size.large};
  font-weight: ${theme.font.weight.semiBold};
`;

const RecommendCard = styled.TouchableOpacity`
  width: 100%;
  padding: 30px;
  gap: 10px;
  border-radius: ${theme.border.radius.xLarge};
  background-color: ${theme.colors.blue.primary};
`;

const MeetingThumbnail = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: ${theme.border.radius.medium};
`;

const meeting = {
  title: '시대짱',
  features: ['컴과', '나를_이겨봐'],
  categories: ['운동/스포츠'],
  content:
    '시대짱인 나를 이길 수 있는 자들이 모인 모임! 근데 나를 이긴 사람은 아무도 없지 우하하하하!시대짱인 나를 이길 수 있는 자들이 모인 모임! 근데 나를 이긴 사람은 아무도 없지 우하하하하!시대짱인 나를 이길 수 있는 자들이 모인 모임! 근데 나를 이긴 사람은 아무도 없지 우하하하하!',
  thumbnailUrl:
    'http://images.munto.kr/production-feed/1684212255476-photo-dj0pc-443076-0?s=1920x1920',
};

const user = {
  name: '홍길동',
};

const UserFeatureList = ['승부욕', '열정', '행복', '고양이'];

export default function Recommend({ navigation }) {
  return (
    <Layout screen={PAGES.RECOMMEND}>
      <Body>
        <RecommendTitleWrapper>
          <RecommendTitle>시대AI가 분석한 김혜님의 추천 목록</RecommendTitle>
          <UserFeatureWrapper>
            {UserFeatureList.map((feature) => (
              <UserFeature>
                <UserFeatureText># {feature}</UserFeatureText>
              </UserFeature>
            ))}
          </UserFeatureWrapper>
          <RecommendTitle>에 맞게 추천드려요!</RecommendTitle>
        </RecommendTitleWrapper>
        <RecommendCard>
          <MeetingThumbnail source={{ uri: meeting.thumbnailUrl }} />
        </RecommendCard>
      </Body>
    </Layout>
  );
}
