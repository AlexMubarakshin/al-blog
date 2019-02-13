import { Action } from "redux";

import { ADMIN_USERS_GET } from "src/types/actions";

const initialState = {

};

export function userReducer(state = initialState, action: Action<any>) {
    switch (action.type) {
        case ADMIN_USERS_GET.REQUEST:
        case ADMIN_USERS_GET.FAILURE:
        case ADMIN_USERS_GET.SUCCESS:
            return state;

        default:
            return state;
    }
}