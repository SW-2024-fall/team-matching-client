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

export default function Recommend({ navigation }) {
  return (
    <Layout screen={PAGES.RECOMMEND}>
      <Body></Body>
    </Layout>
  );
}
