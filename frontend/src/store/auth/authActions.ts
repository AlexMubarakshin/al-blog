import { Dispatch } from "redux";

import axios from "axios";

import { IApplicationStore } from "src/types/store";
import { AUTH_REGISTER, AUTH_SIGN_IN, AUTH_LOGOUT } from "src/types/actions";
import { makeActionCreator } from "src/utils/common";

const ROOT_URL = location.href.indexOf("localhost") > 0 ? "http://localhost:8080/api" : "/api";

const userRegisterRequest = makeActionCreator(AUTH_REGISTER.REQUEST);
const userRegisterSuccess = makeActionCreator(AUTH_REGISTER.SUCCESS);
const userRegisterFailure = makeActionCreator(AUTH_REGISTER.FAILURE, "error");

const userSignInRequest = makeActionCreator(AUTH_SIGN_IN.REQUEST);
const userSignInSuccess = makeActionCreator(AUTH_SIGN_IN.SUCCESS, "token");
const userSignInFailure = makeActionCreator(AUTH_SIGN_IN.FAILURE, "error");

const logoutAction = makeActionCreator(AUTH_LOGOUT);

export const signIn = (email: string, password: string, onLogin: () => void) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(userSignInRequest());

            const response = await axios({
                method: "POST",
                data: {
                    email,
                    password
                },
                url: `${ROOT_URL}/auth/login`
            });

            if (response.data.token) {
                dispatch(userSignInSuccess(response.data.token));
                onLogin();
            } else {
                console.warn(response);
                dispatch(userSignInFailure(response));
            }

        } catch (err) {
            console.warn(err);
            let payload = !!err.response ? err.response.data.errors : { message: "Wtf error :(" };
            dispatch(userSignInFailure(payload));
        }

    };
};

export const register = (name: string, email: string, password: string, onRegister: () => void) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(userRegisterRequest());
            const response = await axios({
                method: "POST",
                data: {
                    email,
                    name,
                    password
                },
                url: `${ROOT_URL}/auth/register`
            });

            if (response.status === 200) {
                dispatch(userRegisterSuccess());
                onRegister();
            } else {
                console.warn(response);
                dispatch(userRegisterSuccess(response));
            }

        } catch (err) {
            debugger;
            const payload = !!err.response ? err.response.data.errors.errors : [{ message: "Wtf error :(" }];
            dispatch(userRegisterFailure(payload));
        }
    };
};

export const logout = () => (logoutAction());

export const checkAuthorization = () => {
    return async (dispatch: Dispatch<any>, getState: () => IApplicationStore) => {
        const { globalReducer } = getState();
        if (globalReducer.token) {
            try {
                const response = await axios({
                    url: "http://localhost:8080/api/auth/secret1",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${globalReducer.token}`
                    }
                });

                if (response.status !== 200) {
                    dispatch(logout());
                }

            } catch (err) {
                dispatch(logout());
            }
        }
    };
};