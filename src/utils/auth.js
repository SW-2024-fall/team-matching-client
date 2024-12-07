import { Alert } from "react-native";
import { AUTH } from "./endPoint";
import { PAGES } from "../navigation/constant";

export const login = async (email, password, navigation, setUserToken) => {
    try {
        console.log(email, password);
        console.log(`${AUTH}/login`);
        const response = await fetch(`${AUTH}/login`, { 
            method: 'POST',
            headers: {
            'Content-Type': 'application/json', // JSON 형식으로 전송
            },
                body: JSON.stringify({
                email: email + "@uos.ac.kr",
                password: password,
            })
        })
        .then(response =>{
            console.log(response);
            if (!response.ok) {
                Alert.alert("아이디 또는 비밀번호를 확인하세요.");
            }
            return response.json()
        })
        .then(data =>{
            console.log(data.data.accessToken);
            setUserToken(data.data.accessToken);
            navigation.navigate(PAGES.MAIN,{});
        })
    } catch (error) {
        console.log(error);
    }
};    