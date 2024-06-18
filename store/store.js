import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// *** middlewares ***
import { thunk } from 'redux-thunk';
import logger from "redux-logger";
// *** reducers ***
import rootReducer from './rootReducer'

const createNoopStorage = () => {
    return {
        getItem(_key) { return Promise.resolve(null); },
        setItem(_key, value) { return Promise.resolve(value); },
        removeItem(_key) { return Promise.resolve(); },
    };
};

const persistConfig = {
    key: "root",
    version: 1,
    storage: typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage(),
    // whitelist: []
    // blacklist: []
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(logger).concat(thunk),
    devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production"
});

store.__persistor = persistStore(store);

const setupStore = (context) => store;
const makeStore = (context) => setupStore(context);

export { store }
export const wrapper = createWrapper(makeStore);