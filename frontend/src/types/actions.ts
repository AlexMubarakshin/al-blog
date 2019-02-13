import { createRequestTypes } from "src/utils/common";

export const POSTS_GET = createRequestTypes("@al-blog/POSTS_GET");

export const POST_CREATE = createRequestTypes("@al-blog/POST_CREATE");
export const POST_DELETE = createRequestTypes("@al-blog/POST_DELETE");
export const POST_EDIT = createRequestTypes("@al-blog/POST_EDIT");

export const AUTH_LOGOUT = "@al-blog/AUTH_SIGN_IN_LOGOUT";

export const AUTH_SIGN_IN = createRequestTypes("@al-blog/AUTH_SIGN_IN");
export const AUTH_REGISTER = createRequestTypes("@al-blog/AUTH_REGISTER_REQUEST");


export const ADMIN_USERS_GET = createRequestTypes("@al-blog/ADMIN/AUTH_REGISTER_REQUEST");