import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER } from './endPoint';

const getUser = async () => {
    console.log("getUser");
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log("accessToken: ", accessToken);
        const response = await fetch(`${USER}`, {
            headers: {'Authorization': `Bearer ${accessToken}`} 
        });
        return response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserById = async (id) => {
    console.log("getUserById");
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log("accessToken: ", accessToken);
    try {
        const response = await fetch(`${USER}/${id}`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${accessToken}`} 
        });
        return response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default getUser;