import { IPost } from "./model";

export interface IPostStore {
    posts: IPost[];
}

export interface ISiteConfigStore {
    siteName: string;
}

export interface IApplicationStore {
    postReducer: IPostStore;
    siteReducer: ISiteConfigStore;
}