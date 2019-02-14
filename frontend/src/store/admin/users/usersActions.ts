import { Dispatch } from "redux";
import axios from "axios";

import { makeActionCreator } from "src/utils/common";
import { ADMIN_USERS_GET } from "src/types/actions";
import { ROOT_API_URL } from "src/utils/constants";

const usersGetRequest = makeActionCreator(ADMIN_USERS_GET.REQUEST);
const usersGetSuccess = makeActionCreator(ADMIN_USERS_GET.SUCCESS, "users");
const usersGetFailure = makeActionCreator(ADMIN_USERS_GET.FAILURE, "error");

export const getUsersList = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(usersGetRequest());

            const response = await axios({
                method: "GET",
                url: `${ROOT_API_URL}/users`
            });

            dispatch(usersGetSuccess(response.data.users));

        } catch (err) {

            dispatch(usersGetFailure(err));
        }
    };
};