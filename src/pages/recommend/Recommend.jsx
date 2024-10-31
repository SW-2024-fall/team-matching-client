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

export default function Recommend({ navigation }) {
  return (
    <Layout screen={PAGES.RECOMMEND}>
      <Body>
        <RecommendTitleWrapper>
          <RecommendTitle>시대AI가 분석한 김혜주님의 추천 목록</RecommendTitle>
          <UserFeatureWrapper>
            <UserFeature>
              <UserFeatureText># 영화</UserFeatureText>
            </UserFeature>
          </UserFeatureWrapper>
          <RecommendTitle>에 맞게 추천드려요!</RecommendTitle>
        </RecommendTitleWrapper>
      </Body>
    </Layout>
  );
}
