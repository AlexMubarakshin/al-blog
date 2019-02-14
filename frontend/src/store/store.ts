import { createStore, applyMiddleware, combineReducers, Reducer, Store } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import axios from "axios";

import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { postReducer } from "./post/postReducer";
import { siteReducer } from "./site/siteReducer";
import { authReducer } from "./auth/authReducer";
import { globalReducer } from "./global/globalReducer";
import { adminReducer } from "./admin/";

import { IApplicationStore } from "src/types/store";


const persistConfig: PersistConfig = {
    key: "root",
    keyPrefix: "",
    storage,
    blacklist: ["postReducer", "authReducer"]
};

function configureNetwork(store: Store<IApplicationStore>) {
    const { token } = store.getState().globalStore;

    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
}

export function configureStore(onComplete: () => void): Store<IApplicationStore> {

    const rootReducer: Reducer<IApplicationStore> = combineReducers({
        adminStore: adminReducer,
        authStore: authReducer,
        globalStore: globalReducer,
        postStore: postReducer,
        siteStore: siteReducer
    });

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const middlewares = [logger, thunk];

    const store = createStore(
        persistedReducer,
        applyMiddleware(...middlewares)
    );

    persistStore(store, undefined, () => {
        configureNetwork(store);
        onComplete();
    });


    return store;
}