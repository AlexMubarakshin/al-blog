import { POST_CREATE, POST_EDIT, POST_DELETE, POSTS_GET } from "src/types/actions";

import { IPostStore } from "src/types/store";
// import { IPost } from "src/types/model";

const initialState: IPostStore = {
    posts: [],
    isFetching: false
};

export function postReducer(state = initialState, action: any): IPostStore {
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
            return {
                posts: action.posts,
                isFetching: false
            };


        default:
            return state;
    }
}