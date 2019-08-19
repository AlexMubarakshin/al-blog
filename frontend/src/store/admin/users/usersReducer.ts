import { AnyAction } from "redux";

import { ADMIN_USERS_GET, ADMIN_USERS_DELETE } from "src/types/actions";
import { IAdminUserStore } from "src/types/store";

const initialState: IAdminUserStore = {
    isLoading: false,
    users: []
};

export function userReducer(state = initialState, action: AnyAction): IAdminUserStore {
    switch (action.type) {
        case ADMIN_USERS_GET.REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case ADMIN_USERS_GET.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case ADMIN_USERS_GET.SUCCESS:
            return {
                users: action.users,
                isLoading: false
            };
        case ADMIN_USERS_DELETE.REQUEST:
        case ADMIN_USERS_DELETE.FAILURE:
        case ADMIN_USERS_DELETE.SUCCESS:
            return state;

        default:
            return state;
    }
}