import { AnyAction } from "redux";

import { ADMIN_USERS_GET, ADMIN_USERS_DELETE } from "src/types/actions";
import { IAdminUserStore } from "src/types/store";

const initialState: IAdminUserStore = {
    isFetching: false,
    users: []
};

export function userReducer(state = initialState, action: AnyAction): IAdminUserStore {
    switch (action.type) {
        case ADMIN_USERS_GET.REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case ADMIN_USERS_GET.FAILURE:
            return {
                ...state,
                isFetching: false
            };
        case ADMIN_USERS_GET.SUCCESS:
            return {
                users: action.users,
                isFetching: false
            };
        case ADMIN_USERS_DELETE.REQUEST:
        case ADMIN_USERS_DELETE.FAILURE:
        case ADMIN_USERS_DELETE.SUCCESS:
            return state;

        default:
            return state;
    }
}