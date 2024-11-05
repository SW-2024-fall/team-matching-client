import * as types from '../types';
import AsyncStorage from '@react-native-community/async-storage';
//import { request } from './api'; // request 함수는 API 요청을 보낼 때 사용할 유틸리티 함수로 가정

export function login(dataToSubmit) {
    const data = request("POST", "/login", dataToSubmit);
    return {
        type: types.LOGIN,
        payload: data,
        uniqueId: dataToSubmit.id
    };
}

export function logout() {
    AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'uniqueId']);
    return { type: types.LOGOUT };
}

export function autoLogin(data) {
    return { type: types.AUTO_LOGIN, payload: data };
}

export function signup(dataToSubmit) {
    const data = request("POST", "/signup", dataToSubmit);  // '/signup' 엔드포인트로 API 요청
    return {
        type: types.SIGNUP,
        payload: data,
    };
}