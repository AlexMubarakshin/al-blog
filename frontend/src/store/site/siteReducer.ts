import { ISiteConfigStore } from "src/types/store";
import { AnyAction } from "redux";

import { SITE_INFO_GET, SITE_INFO_UPDATE } from "src/types/actions";

const defaultState: ISiteConfigStore = {
    siteName: "Alm-Blog",
    siteDescription: "Simple blog",

    ownerName: "Alex Mubarakshin",
    ownerSiteURL: "https://github.com/AlexMubarakshin",

    isLoading: false,
    isUpdating: false,

    infoError: undefined,
};

export function siteReducer(state = defaultState, action: AnyAction): ISiteConfigStore {
    switch (action.type) {

        case SITE_INFO_UPDATE.REQUEST:
            return {
                ...state,
                infoError: undefined,
                isUpdating: true,
            };
        case SITE_INFO_GET.REQUEST:
            return {
                ...state,
                infoError: undefined,
                isLoading: true,
            };

        case SITE_INFO_UPDATE.FAILURE:
            return {
                ...state,
                infoError: (action as any).error,
                isUpdating: false,
            };
        case SITE_INFO_GET.FAILURE:
            return {
                ...state,
                infoError: (action as any).error,
                isLoading: false,
            };

        case SITE_INFO_UPDATE.SUCCESS:
            return {
                ...action.site,
                infoError: undefined,
                isUpdating: false
            };

        case SITE_INFO_GET.SUCCESS:
            return {
                ...action.site,
                infoError: undefined,
                isLoading: false
            };

        default:
            return state;
    }
}