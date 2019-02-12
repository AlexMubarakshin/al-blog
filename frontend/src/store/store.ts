import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { postReducer } from "./post/postReducer";
import { siteReducer } from "./site/siteReducer";

const rootReducer = combineReducers({
    postReducer,
    siteReducer
});


const middlewares = [logger, thunk];

export const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
);