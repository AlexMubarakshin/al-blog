import { AnyAction } from "redux";

import { AUTH_REGISTER, AUTH_SIGN_IN } from "src/types/actions";

import { IAuthStore } from "src/types/store";

const authStoreInitialState: IAuthStore = {
    registerError: undefined,
    authError: undefined
};

export function authReducer(state = authStoreInitialState, action: AnyAction): IAuthStore {
    switch (action.type) {
        case AUTH_REGISTER.REQUEST:
        case AUTH_SIGN_IN.REQUEST:
            return state;

        case AUTH_REGISTER.FAILURE:
            return {
                ...state,
                registerError: action.error
            };

        case AUTH_REGISTER.SUCCESS:
            return {
                ...state,
                authError: undefined,
                registerError: undefined
            };



        case AUTH_SIGN_IN.FAILURE:
            return {
                ...state,
                authError: (action as any).error
            };

        case AUTH_SIGN_IN.SUCCESS:
            return {
                ...state,
                authError: undefined,
                registerError: undefined
            };

        default:
            return state;
    }
}