export interface IPost {
    _id: string;
    title: string;
    subtitle: string;
    content: string;
}

export interface IUser {
    _id: string;
    role: "user" | "admin";
    email: string;
    name: string;
}

export interface ISiteConfig {
    siteName: string;
    siteDescription: string;

    ownerName: string;
    ownerSiteURL: string;
}