import React, { useState, useEffect } from 'react';
import Splash from '.@pages/auth/containers/Splash'
import { View} from 'react-native';

function SplashScreen({ navigation }) {
    return (
        <View >
            <Splash navigation={navigation} />
        </View>
    )
}

export default SplashScreen;