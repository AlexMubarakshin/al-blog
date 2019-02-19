import { Dispatch } from "redux";

import axios from "axios";

import { POST_CREATE, POST_EDIT, POST_DELETE, POSTS_GET } from "src/types/actions";
import { IPost } from "src/types/model";

import { ROOT_API_URL } from "src/utils/constants";
import { makeActionCreator } from "src/utils/common";

const postsRequest = makeActionCreator(POSTS_GET.REQUEST);
const postsSuccess = makeActionCreator(POSTS_GET.SUCCESS, "posts");
const postsFailure = makeActionCreator(POSTS_GET.FAILURE, "error");

const postCreateRequest = makeActionCreator(POST_CREATE.REQUEST);
const postCreateSuccess = makeActionCreator(POST_CREATE.SUCCESS, "posts");
const postCreateFailure = makeActionCreator(POST_CREATE.FAILURE, "error");

const postDeleteRequest = makeActionCreator(POST_DELETE.REQUEST);
const postDeleteSuccess = makeActionCreator(POST_DELETE.SUCCESS);
const postDeleteFailure = makeActionCreator(POST_DELETE.FAILURE, "error");

const postUpdateRequest = makeActionCreator(POST_EDIT.REQUEST);
const postUpdateSuccess = makeActionCreator(POST_EDIT.SUCCESS);
const postUpdateFailure = makeActionCreator(POST_EDIT.FAILURE, "error");

export const getPosts = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(postsRequest());

        try {

            const response = await axios({
                method: "GET",
                url: `${ROOT_API_URL}/posts`
            });

            if (response.data.posts) {
                dispatch(postsSuccess(response.data.posts));
            } else {
                console.warn(response);
                dispatch(postsFailure(response));
            }
        } catch (err) {
            dispatch(postsFailure(err));
        }
    };
};

export const createPost = (post: { title: string, content: string, subtitle: string }, onComplete: (e?: any) => void) => {
    return async (dispatch: Dispatch<any>) => {
        try {

            dispatch(postCreateRequest());

            const response = await axios({
                method: "POST",
                url: `${ROOT_API_URL}/post/save`,
                data: {
                    title: post.title,
                    subtitle: post.subtitle,
                    content: post.content
                }
            });

            if (response.data.status === 200) {
                dispatch(postCreateSuccess());
                onComplete();
            } else {
                console.warn(response);
                dispatch(postCreateFailure(response));
                onComplete(response);
            }
        } catch (err) {
            dispatch(postCreateFailure(err));
            onComplete(err);

        }
    };
};

export const editPost = (post: IPost, onComplete: (e?: any) => void) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(postUpdateRequest());

            await axios({
                method: "PUT",
                url: `${ROOT_API_URL}/post/${post._id}`,
                params: {
                    id: post._id
                },
                data: {
                    title: post.title,
                    content: post.content
                }
            });

            dispatch(postUpdateSuccess());
            dispatch(getPosts());
            onComplete();
        } catch (err) {
            dispatch(postUpdateFailure(err));
            onComplete(err);
        }
    };
};

export const deletePost = (postID: string) => {
    return async (dispatch: Dispatch<any>) => {
        try {

            dispatch(postDeleteRequest());

            const response = await axios({
                method: "DELETE",
                url: `${ROOT_API_URL}/post/${postID}`,
                params: {
                    id: postID
                }
            });

            if (response.data.status === 200) {
                dispatch(postDeleteSuccess());
                dispatch(getPosts());
            } else {
                console.warn(response);
                dispatch(postDeleteFailure(response));
            }
        } catch (err) {
            dispatch(postDeleteFailure(err));
        }
    };
};