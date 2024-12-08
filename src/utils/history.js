import { HISTORY } from "./endPoint";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getHistories = async () => {
    console.log("getHistories");
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(HISTORY, { 
        method: 'GET' ,
        headers: {
            'Authorization': `Bearer ${accessToken}`, // JWT 포함
        }
    });

    return await response.json();
}

export const getHistoryDetail = async (historyId) => {
    console.log("getHistoryDetail");
    const accessToken = await AsyncStorage.getItem('accessToken');

    try {
        const response = await fetch(`${HISTORY}/${historyId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching history detail:', error);
        throw Error(error);
    }
}

export const deleteHistory = async (historyId) => {
    console.log("deleteHistory");
    const accessToken = await AsyncStorage.getItem('accessToken');

    try {
        const response = await fetch(`${HISTORY}/${historyId}`,
            {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${accessToken}`, // JWT 포함
            } 
        });
        if (!response.ok) { throw new Error("Failed to 히스토리 삭제"); }
    } catch (error) {
        console.error('Error deleting history:', error);
        throw Error(error);
    }
}