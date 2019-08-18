import { createStore, applyMiddleware, combineReducers, Reducer, Store, compose } from "redux";
import thunk from "redux-thunk";

import axios from "axios";

import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userReducer } from "./profile/profileReducer";
import { postReducer } from "./post/postReducer";
import { siteReducer } from "./site/siteReducer";
import { authReducer } from "./auth/authReducer";
import { globalReducer } from "./global/globalReducer";
import { adminReducer } from "./admin/";

import { IApplicationStore } from "src/types/store";

const isDebugging = process.env.NODE_ENV === "development";

const persistConfig: PersistConfig = {
    key: "root",
    keyPrefix: "",
    storage,
    blacklist: ["postReducer", "authReducer", "adminReducer"]
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
        siteStore: siteReducer,
        profileStore: userReducer
    });

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const middlewares = [thunk];

    if (!isDebugging) {
        if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
            // tslint:disable-next-line: no-empty
            (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => { };
        }
    }

    const composeEnhancers = isDebugging && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = composeEnhancers(
        applyMiddleware(...middlewares)
    )(createStore)(persistedReducer);

    persistStore(store, undefined, () => {
        configureNetwork(store);
        onComplete();
    });


    return store;
}