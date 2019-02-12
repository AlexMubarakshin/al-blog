import { Dispatch } from "redux";
import { POST_CREATE, POST_EDIT, POST_DELETE } from "src/types/actions";
import { IPost } from "src/types/model";

export function createPost(post: IPost) {
    return (dispatch: Dispatch<any>) => {
        dispatch({
            post,
            type: POST_CREATE
        });
    };
}

export function editPost(post: IPost) {
    return (dispatch: Dispatch<any>) => {
        dispatch({
            post,
            type: POST_EDIT
        });
    };
}

export function deletePost(postID: number) {
    return (dispatch: Dispatch<any>) => {
        dispatch({
            postID,
            type: POST_DELETE
        });
    };
}