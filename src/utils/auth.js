import { Alert } from "react-native";
import { AUTH } from "./endPoint";

export const loginApi = async (email, password) => {
    try {
        const response = await fetch(`${AUTH}/login`, { 
            method: 'POST',
            headers: {
            'Content-Type': 'application/json', // JSON 형식으로 전송
            },
            body: JSON.stringify({
                email: email + "@uos.ac.kr",
                password: password,
            })
        });
        if (!response.ok) {
            Alert.alert("아이디 또는 비밀번호를 확인하세요.");
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};    