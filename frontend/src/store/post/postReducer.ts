import { AnyAction } from "redux";
import { POST_CREATE, POST_EDIT, POST_DELETE, POSTS_GET } from "src/types/actions";

import { IPostStore } from "src/types/store";
// import { IPost } from "src/types/model";

function onGetPost(currentState: IPostStore, action: AnyAction): IPostStore {
    const nextState = Object.assign({}, currentState);
    
    nextState.page = action.data.page;
    nextState.totalLength = action.data.totalLength;
    nextState.isFetching = false;

    if (action.data.page <= currentState.page) {
        nextState.posts = action.data.posts;
        return nextState;
    }

    nextState.posts = nextState.posts.concat(action.data.posts);

    return nextState;
}

const initialState: IPostStore = {
    posts: [],
    isFetching: false,
    page: 1,
    totalLength: 0
};

export function postReducer(state = initialState, action: AnyAction): IPostStore {
    switch (action.type) {
        case POST_CREATE.FAILURE:
        case POST_CREATE.SUCCESS:
        case POST_CREATE.REQUEST:
            return state;

        case POST_EDIT:
            return state;

        case POST_DELETE:
            return state;

        case POSTS_GET.REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case POSTS_GET.FAILURE:
            return {
                ...state,
                isFetching: false
            };

        case POSTS_GET.SUCCESS:
            return onGetPost(state, action);

        default:
            return state;
    }
}