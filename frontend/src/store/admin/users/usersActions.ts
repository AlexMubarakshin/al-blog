import { Dispatch } from "redux";
import axios from "axios";

import { ROOT_API_URL } from "src/utils/constants";

import { makeActionCreator } from "src/utils/common";

import { ADMIN_USERS_GET, ADMIN_USERS_DELETE } from "src/types/actions";
import { IApplicationStore } from "src/types/store";
import { logout } from "src/store/auth/authActions";

const usersGetRequest = makeActionCreator(ADMIN_USERS_GET.REQUEST);
const usersGetSuccess = makeActionCreator(ADMIN_USERS_GET.SUCCESS, "users");
const usersGetFailure = makeActionCreator(ADMIN_USERS_GET.FAILURE, "error");

const usersDeleteRequest = makeActionCreator(ADMIN_USERS_DELETE.REQUEST);
const usersDeleteSuccess = makeActionCreator(ADMIN_USERS_DELETE.SUCCESS, "users");
const usersDeleteFailure = makeActionCreator(ADMIN_USERS_DELETE.FAILURE, "error");

export const getUsersList = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(usersGetRequest());

            const response = await axios({
                method: "GET",
                url: `${ROOT_API_URL}/admin/users`
            });

            dispatch(usersGetSuccess(response.data.users));

        } catch (err) {

            dispatch(usersGetFailure(err));
        }
    };
};

export const deleteUser = (userID: string) => {
    return async (dispatch: Dispatch<any>, getState: () => IApplicationStore) => {
        try {
            dispatch(usersDeleteRequest());

            const { user } = getState().profileStore;
            const currentUserId = user && user._id;

            const response = await axios({
                method: "DELETE",
                url: `${ROOT_API_URL}/admin/users/${userID}`
            });

            dispatch(usersDeleteSuccess(response.data.users));

            if (currentUserId === userID) {
                dispatch(logout());
            } else {
                dispatch(getUsersList());
            }

        } catch (err) {

            dispatch(usersDeleteFailure(err));
        }
    };
};