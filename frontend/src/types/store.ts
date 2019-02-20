import { IPost, IUser } from "./model";

export interface IPostStore {
    posts: IPost[];
    totalLength: number;
    page: number;
    isFetching: boolean;
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

export interface IAdminUserStore {
    isFetching: boolean;
    users: IUser[];
}

export interface IAdminStore {
    usersStore: IAdminUserStore;
}

export interface IProfileStore {
    isFetching: boolean;
    user?: IUser;
}

export interface IApplicationStore {
    adminStore: IAdminStore;
    authStore: IAuthStore;
    globalStore: IGlobalStore;
    postStore: IPostStore;
    siteStore: ISiteConfigStore;
    profileStore: IProfileStore;
}
