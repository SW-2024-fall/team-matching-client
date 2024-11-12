import React, { useEffect, useState } from 'react';
import { Text, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import styled from 'styled-components/native';
import { WithLocalSvg } from 'react-native-svg/css';
import runningPhoto from '../../assets/runningPhoto.svg';
import ActivityDatailInfo from './component/ActivityDetailInfo';
import ActivityMemberList from './component/ActivityMemberList';
import ActivityRecord from './component/ActivityRecord';

const screenWidth = Dimensions.get('window').width;

export default function MeetingHistory() {
  const route = useRoute();
  const { historyId, title } = route.params;
  const [activeTab, setActiveTab] = useState(0); // 0: 모임 정보, 1: 구성원, 2: 활동 내역
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        ; const response = await fetch(`http://192.168.219.101:8080/api/histories/${historyId}`, { method: "GET" });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <ActivityIndicator size="large" color="#000000" />; // 로딩 중일 때 인디케이터 표시
  }

  if (error) {
    return <Text style={{ fontSize: 20 }}>Error: {error}</Text>; // 에러 메시지 표시
  }
  return (
    <Layout screen={PAGES.MEETING_HISTORY}>
      {data &&
        <Container>
          <Header>
            <WithLocalSvg
              asset={runningPhoto}
            />
          </Header>
          <TabContainer>
            <TabWrapper
              isActive={activeTab === 0}
              onPress={() => handleTabPress(0)}>
              <Tab isActive={activeTab === 0}>활동기록</Tab>
            </TabWrapper>
            <TabWrapper
              isActive={activeTab === 1}
              onPress={() => handleTabPress(1)}>
              <Tab isActive={activeTab === 1}>참여자</Tab>
            </TabWrapper>
            <TabWrapper
              isActive={activeTab === 2}
              onPress={() => handleTabPress(2)}>
              <Tab isActive={activeTab === 2}>세부 정보</Tab>
            </TabWrapper>
          </TabContainer>
          {activeTab === 0 && <ActivityRecord data={data}></ActivityRecord>}
          {activeTab === 1 && <ActivityMemberList data={data}></ActivityMemberList>}
          {activeTab === 2 && <ActivityDatailInfo data={data}></ActivityDatailInfo>}
          <Pressable onPress={() => navigation.navigate(PAGES.MAIN)}></Pressable>
        </Container>
      }
    </Layout>
  );
}

const Container = styled.ScrollView`
  width:100%;
`;
const Header = styled.View`
  width:100%;
  aspectRatio: ${screenWidth} / 230,
`;

const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TabWrapper = styled(Pressable)`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-left-width: 1px;
  border-right-width:1px;
  border-color: white;
  padding:7px;
  margin:0;
  background-color: ${({ isActive, theme }) => (isActive ? 'white' : theme.colors.blue.primary)};
`;

const Tab = styled.Text`
  color: ${({ isActive, theme }) => (isActive ? theme.font.color.primary : 'white')};
`;




