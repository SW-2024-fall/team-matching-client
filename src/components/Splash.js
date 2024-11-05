import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

function Splash(props) {

    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem('user')
                .then((value) => {
                    console.log(value)
                    if (value != null) {
                        props.goMain(value)

                        props.navigation.replace('Main');

                    } else {
                        props.navigation.replace('Auth');
                        console.log(value);

                    }
                }
                );

        }, 3000);
    }, []);

    return (
        <View >
            <Text>스플래쉬 화면</Text>
        </View>
    )
}


export default Splash;