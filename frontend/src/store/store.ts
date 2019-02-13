import { createStore, applyMiddleware, combineReducers, Reducer, Store } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { postReducer } from "./post/postReducer";
import { siteReducer } from "./site/siteReducer";
import { authReducer } from "./auth/authReducer";
import { globalReducer } from "./global/globalReducer";
import { IApplicationStore } from "src/types/store";


const persistConfig: PersistConfig = {
    key: "root",
    keyPrefix: "",
    storage,
    blacklist: ["postReducer", "authReducer"]
};

export function configureStore(onComplete: () => void): Store<IApplicationStore> {

    const rootReducer: Reducer<IApplicationStore> = combineReducers({
        postReducer,
        siteReducer,
        authReducer,
        globalReducer
    });

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const middlewares = [logger, thunk];

    const store = createStore(
        persistedReducer,
        applyMiddleware(...middlewares)
    );

    persistStore(store, undefined, onComplete);

    return store;
}