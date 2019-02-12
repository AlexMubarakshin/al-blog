import { ISiteConfigStore } from "src/types/store";
import { Action } from "redux";

const defaultState: ISiteConfigStore = {
    siteName: "Alm-Blog",

    ownerName: "Alex Mubarakshin",
    ownerSiteURL: "https://github.com/AlexMubarakshin"
};

export function siteReducer(state = defaultState, action: Action<any>): ISiteConfigStore {
    switch (action.type) {
    
        default:
            return state;
    }
}