import { combineReducers, Reducer } from "redux";

import { userReducer } from "./users/usersReducer";
import { IAdminStore } from "src/types/store";

export const adminReducer: Reducer<IAdminStore> = combineReducers({
    usersStore: userReducer
});