import { createRequestTypes } from "src/utils/common";

const BASE_ACTION = "@al-blog";

//#region PROFILE ACTIONS
export const PROFILE_GET = createRequestTypes(`${BASE_ACTION}/PROFILE_GET`);
//#endregion

//#region POST ACTIONS
export const POSTS_GET = createRequestTypes(`${BASE_ACTION}/POSTS_GET`);

export const POST_CREATE = createRequestTypes(`${BASE_ACTION}/POST_CREATE`);
export const POST_DELETE = createRequestTypes(`${BASE_ACTION}/POST_DELETE`);
export const POST_EDIT = createRequestTypes(`${BASE_ACTION}/POST_EDIT`);
//#endregion

//#region AUTH ACTIONS
export const AUTH_LOGOUT = `${BASE_ACTION}/AUTH_SIGN_IN_LOGOUT`;

export const AUTH_SIGN_IN = createRequestTypes(`${BASE_ACTION}/AUTH_SIGN_IN`);
export const AUTH_REGISTER = createRequestTypes(`${BASE_ACTION}/AUTH_REGISTER_REQUEST`);
//#endregion


//#region ADMIN ACTIONS
export const ADMIN_USERS_GET = createRequestTypes(`${BASE_ACTION}/ADMIN/USERS_GET`);
export const ADMIN_USERS_DELETE = createRequestTypes(`${BASE_ACTION}/ADMIN/USERS_DELETE`);
//#endregion