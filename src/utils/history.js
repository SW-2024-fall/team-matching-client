import { MEETING_HISTORY } from "./endPoint";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getHistories = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(MEETING_HISTORY, { 
        method: 'GET' ,
        headers: {
            'Authorization': `Bearer ${accessToken}`, // JWT 포함
        }
    });
    return await response.json();
}