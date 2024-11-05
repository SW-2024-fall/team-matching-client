import * as types from '../types';

const initialState = {
    uniqueId: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            AsyncStorage.multiSet([
                ['accessToken', action.payload.accessToken],
                ['refreshToken', action.payload.refreshToken],
                ['uniqueId', action.uniqueId],
            ]);
            return {
                ...state,
                uniqueId: action.uniqueId,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                isLoggedIn: true,
            };

        case types.LOGOUT:
            return {
                ...initialState,
                isLoggedIn: false,
            };

        case types.AUTO_LOGIN:
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
            };

        default:
            return state;
    }
}
