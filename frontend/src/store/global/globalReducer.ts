import { Action } from "redux";

import { AUTH_SIGN_IN, AUTH_LOGOUT } from "src/types/actions";

import { IGlobalStore } from "src/types/store";

const authStoreInitialState: IGlobalStore = {
    token: undefined,
};

export function globalReducer(state = authStoreInitialState, action: Action<any>): IGlobalStore {
    switch (action.type) {

        case AUTH_SIGN_IN.SUCCESS:
            return {
                token: (action as any).token
            };

        case AUTH_LOGOUT:
            return authStoreInitialState;

        default:
            return state;
    }
}