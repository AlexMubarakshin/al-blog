import axios from "axios";

import { Dispatch } from "redux";

import { makeActionCreator } from "src/utils/common";

import { SITE_INFO_GET, SITE_INFO_UPDATE } from "src/types/actions";
import { ROOT_API_URL } from "src/utils/constants";
import { ISiteConfig } from "src/types/model";

const siteInfoGetRequest = makeActionCreator(SITE_INFO_GET.REQUEST);
const siteInfoGetSuccess = makeActionCreator(SITE_INFO_GET.SUCCESS, "site");
const siteInfoGetFailure = makeActionCreator(SITE_INFO_GET.FAILURE, "error");

const siteInfoUpdateRequest = makeActionCreator(SITE_INFO_UPDATE.REQUEST);
const siteInfoUpdateSuccess = makeActionCreator(SITE_INFO_UPDATE.SUCCESS, "site");
const siteInfoUpdateFailure = makeActionCreator(SITE_INFO_UPDATE.FAILURE, "error");

export const getSiteInfo = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(siteInfoGetRequest());

        try {
            const response = await axios({
                method: "GET",
                url: `${ROOT_API_URL}/site`
            });

            dispatch(siteInfoGetSuccess(response.data.config));
        } catch (error) {
            dispatch(siteInfoGetFailure(error));
        }

    };
};

export const updateSiteInfo = (data: Partial<ISiteConfig>, onComplete: (e?: any, data?: ISiteConfig) => void) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(siteInfoUpdateRequest());

            const response = await axios({
                method: "PUT",
                url: `${ROOT_API_URL}/site`,
                data
            });

            dispatch(siteInfoUpdateSuccess(response.data.site));
            onComplete(undefined, response.data.site);
        } catch (err) {
            dispatch(siteInfoUpdateFailure(err));
            onComplete(err);
        }
    };
};
