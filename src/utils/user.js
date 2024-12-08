import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER } from './endPoint';

const getUser = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');

        const response = await fetch(`${USER}`, {
            headers: {'Authorization': `Bearer ${accessToken}`} 
        });
        return response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default getUser;