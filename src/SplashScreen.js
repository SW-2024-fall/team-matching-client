import React, { useState, useEffect } from 'react';
import Splash from '.@pages/auth/containers/Splash'
import { View} from 'react-native';
import {UserContext} from '@context/userContext';

function SplashScreen({ navigation }) {
    const { isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        setTimeout(() => {
            if (isLoggedIn) {
                navigation.replace('Main');
            } else {
                navigation.replace('Auth');
            }
        }, 3000);
    }, [isLoggedIn]);

    return (
        <View >
            <Splash navigation={navigation} />
        </View>
    )
}

export default SplashScreen;