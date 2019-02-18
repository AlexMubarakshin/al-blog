import axios from "axios";

import { Dispatch } from "redux";

import { makeActionCreator } from "src/utils/common";

import { PROFILE_GET } from "src/types/actions";
import { ROOT_API_URL } from "src/utils/constants";

const profileGetRequest = makeActionCreator(PROFILE_GET.REQUEST);
const profileGetSuccess = makeActionCreator(PROFILE_GET.SUCCESS, "user");
const profileGetFailure = makeActionCreator(PROFILE_GET.FAILURE, "error");

export const getProfile = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(profileGetRequest());

        try {
            const response = await axios({
                method: "GET",
                url: `${ROOT_API_URL}/profile`
            });

            dispatch(profileGetSuccess(response.data.user));
        } catch (error) {
            dispatch(profileGetFailure(error));
        }

    };
};