// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // 실제 API URL로 변경

export const createMeeting = async (historyData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/histories`, historyData);
        return response.data; // 성공적으로 생성된 모임 데이터 반환
    } catch (error) {
        console.error('Error creating history:', error);
        throw error; // 오류 발생 시 다시 던짐
    }
};
