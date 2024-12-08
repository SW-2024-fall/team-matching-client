import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEETING } from './endPoint';

export const getMeetingById = async (id) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log("accessToken: ", accessToken);
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
        throw error;
    }
}

export const getMeetingMemberRole = async (id) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
        const response = await fetch(`${MEETING}/${id}/members/my-role`, { method: "GET",headers: {'Authorization': `Bearer ${accessToken}`}});
        return response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteMeeting = async (id) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
        const response = await fetch(`${MEETING}/${id}`,
            {
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
        if (!response.ok) { throw new Error("Failed to delete the meeting"); }
    } catch (error) {
        console.log("Error deleting the meeting:", error);
        throw error;
    }
}

export const postMeetingApplication = async (id) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
        const response = await fetch(`${MEETING}/${id}/members/application`,
            {
                method: "POST",
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
        if (!response.ok) { throw new Error("Failed to 모임신청"); }
        else{Alert.alert('성공','모임 신청되었습니다'); setRe(!re)}
    } catch (error) {
        console.log("Error 모임신청", error);
        throw error;
    }
}

export const leaveMeeting = async (id) => {
    const accessToken = await AsyncStorage.getItem('accessToken');  
    try {
        const response = await fetch(`${MEETING}/${id}/members`,
            {
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
        if (!response.ok) { throw new Error("Failed to 모임탈퇴"); }
        else{Alert.alert('성공','모임 탈퇴되었습니다'); setRe(!re)}
    } catch (error) {
        console.log("Error 모임탈퇴:", error);
        throw error;
    }
}

export const deleteMeetingApplication = async (id) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
        const response = await fetch(`${MEETING}/${id}/members/application`, { method: "DELETE" ,headers: {'Authorization': `Bearer ${accessToken}`}});
        if (!response.ok) {
          throw new Error("Failed to 모인 신청 해제");
        }
        else{Alert.alert('성공','모임신청이 취소되었습니다'); setRe(!re)}
    } catch (error) {
        console.log("Error 모임신청 해제:", error);
        throw error;
    }
}