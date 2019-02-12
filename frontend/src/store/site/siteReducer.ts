import { ISiteConfigStore } from "src/types/store";
import { Action } from "redux";

const defaultState: ISiteConfigStore = {
    siteName: "Alm-Blog"
};

export function siteReducer(state = defaultState, action: Action<any>) {
    switch (action.type) {
    
        default:
            return state;
    }
}