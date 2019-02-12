import { POST_CREATE, POST_EDIT, POST_DELETE } from "src/types/actions";

import { IPostStore } from "src/types/store";
import { IPost } from "src/types/model";

const initialState: IPostStore = {
    posts: []
};

const onPostCreate = (state: IPostStore, post: IPost) => {
    const currentState = Object.assign({}, state);
    currentState.posts.push(post);

    return currentState;
};

const onPostEdit = (state: IPostStore, post: IPost) => {
    const currentState = Object.assign({}, state);

    const searchedPost = state.posts.findIndex((existedPost) => existedPost.id === post.id);
    currentState.posts[searchedPost].title = post.title;
    currentState.posts[searchedPost].content = post.content;

    return currentState;
};

const onPostDelete = (state: IPostStore, postID: number) => {
    const currentState = Object.assign({}, state);

    const searchedPostIndex = state.posts.findIndex((existedPost) => existedPost.id === postID);
    currentState.posts.splice(searchedPostIndex, 1);

    return currentState;
};

export function postReducer(state = initialState, action: any): IPostStore {
    switch (action.type) {
        case POST_CREATE:
            return onPostCreate(state, action.post);

        case POST_EDIT:
            return onPostEdit(state, action.post);

        case POST_DELETE:
            return onPostDelete(state, action.postID);

        default:
            return state;
    }
}