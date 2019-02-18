import { AnyAction } from "redux";

import { IProfileStore } from "src/types/store";
import { PROFILE_GET, AUTH_LOGOUT } from "src/types/actions";

const initialState: IProfileStore = {
    isFetching: false,
    user: undefined
};

export function userReducer(state = initialState, action: AnyAction): IProfileStore {
    switch (action.type) {
        case PROFILE_GET.FAILURE:
            return {
                ...state,
                isFetching: false
            };
        case PROFILE_GET.REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case PROFILE_GET.SUCCESS:
            return {
                ...state,
                user: action.user,
                isFetching: false
            };

        case AUTH_LOGOUT:
            return initialState;

        default:
            return state;
    }

} 