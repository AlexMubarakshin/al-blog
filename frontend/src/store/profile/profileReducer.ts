import { AnyAction } from "redux";

import { IProfileStore } from "src/types/store";
import { PROFILE_GET, AUTH_LOGOUT } from "src/types/actions";

const initialState: IProfileStore = {
    isLoading: false,
    user: undefined
};

export function userReducer(state = initialState, action: AnyAction): IProfileStore {
    switch (action.type) {
        case PROFILE_GET.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case PROFILE_GET.REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case PROFILE_GET.SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoading: false
            };

        case AUTH_LOGOUT:
            return initialState;

        default:
            return state;
    }

} 