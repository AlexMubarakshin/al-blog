import { IPost, IUser, ISiteConfig } from "./model";

export interface IPostStore {
    posts: IPost[];
    totalLength: number;
    page: number;
    isLoading: boolean;
}

export interface ISiteConfigStore extends ISiteConfig {
    infoError?: any;
    isUpdating: boolean;
    isLoading: boolean;
}

export interface IGlobalStore {
    token?: string;
}

export interface IAuthStore {
    authError?: any;
    registerError?: any;
}

export interface IAdminUserStore {
    isLoading: boolean;
    users: IUser[];
}

export interface IAdminStore {
    usersStore: IAdminUserStore;
}

export interface IProfileStore {
    isLoading: boolean;
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
