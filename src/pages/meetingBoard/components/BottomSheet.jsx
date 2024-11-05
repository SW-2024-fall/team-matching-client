import React, { useRef, useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { BottomSheet, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Checkbox from 'expo-checkbox';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BottomSheet = () => {
    const BottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(()=> ['25%', '50%'], []);
    
    const handleSheetChanges = useCallback((index : number) => {

    },[]);
    return (
        <View>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
            <View>
                <Text>Awesome 🎉</Text>
            </View>
            </BottomSheet>
        </View>
    );
};
export default BottomSheet;