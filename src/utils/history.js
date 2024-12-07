import { MEETING_HISTORY } from "./endPoint";

export const getHistories = async (userToken) => {
    const response = await fetch(MEETING_HISTORY, { 
        method: 'GET' ,
        headers: {
            'Authorization': `Bearer ${userToken}`, // JWT 포함
        }
    });
    return response;
}