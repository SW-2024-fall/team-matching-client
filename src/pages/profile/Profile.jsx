import React, { useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import Foundation from '@expo/vector-icons/Foundation';
import Layout from '../../layout/layout';
import { PAGES } from '@navigation/constant';
export default function Profile({ navigation }) {
    return (
        <Layout screen={PAGES.PROFILE} navigation={navigation}>


            <Container>
                <Header>
                    <HeaderLeft>

                        <Foundation name="photo" size={50}></Foundation>
                        <Text>김세연</Text>
                        <Text>환경원예학과 20</Text>
                    </HeaderLeft>
                    <HeadrRight>
                        <Text>100점</Text>
                        <TagContainer>
                            <Text>#친목</Text>
                            <Text>#번개</Text>
                            <Text>#재미</Text>
                            <Text>#열심</Text>
                        </TagContainer>
                    </HeadrRight>


                </Header>
                <ProfileNavigation>
                    <Text>참여한 모임</Text>
                    <Text>스크랩 모임</Text>
                    <Text>댓글 목록</Text>
                    <Text>좋아요 목록</Text>
                </ProfileNavigation>
                <Body>
                    <BodyHeader>
                        참여한 모임 목록
                    </BodyHeader>
                    <BodyMain>

                    </BodyMain>
                </Body>
            </Container>
        </Layout>
    );
}

const Container = styled.View`
    padding: 20px;
    flex: 1;
`;

const Header = styled.View`
    flex:2;
    flexDirection:row;
    justifyContent:space-between;
`;
const HeaderLeft = styled.View`
`;
const HeadrRight = styled.View``;
const TagContainer = styled.View`
    flexDirection:row;
`;
const ProfileNavigation = styled.View`
    flex:1;
    flexDirection:row;
`;
const Body = styled.View`
    flex:6;
`;
const BodyHeader = styled.Text`

`;
const BodyMain = styled.View`
    
`;
