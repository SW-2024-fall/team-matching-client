import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEETING } from './endPoint';

export const getMeetingById = async (id) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
        const response = await fetch(`${MEETING}/${id}`,
            {
                method: 'GET',
                headers: {'Authorization': `Bearer ${accessToken}`}
            }
        );
        return response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}