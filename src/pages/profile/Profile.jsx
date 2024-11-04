import React, { useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import Foundation from '@expo/vector-icons/Foundation';
import Layout from '../../layout/layout';
import { PAGES } from '@navigation/constant';
export default function Profile({ navigation }) {
    return (
        <Layout screen={PAGES.PROFILE} navigation={navigation}>
            <View></View>
        </Layout>
    );
}
