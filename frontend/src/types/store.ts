import { IPost } from "./model";

export interface IPostStore {
    posts: IPost[];
}

export interface ISiteConfigStore {
    siteName: string;

    ownerName: string;
    ownerSiteURL: string;
}

export interface IGlobalStore {
    token?: string;
}

export interface IAuthStore {
    authError?: any;
    registerError?: any;
}

export interface IApplicationStore {
    authReducer: IAuthStore;
    globalReducer: IGlobalStore;
    postReducer: IPostStore;
    siteReducer: ISiteConfigStore;
}
