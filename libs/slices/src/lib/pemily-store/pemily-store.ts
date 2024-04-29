import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
import logger from "redux-logger";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
// import storage from 'redux-persist/lib/storage';

import modalReducer from '../modal-slice/modal-slice';
import snackbarReducer from '../snackbar/snackbar-slice';
import layoutReducer from '../layout/layout-slice';

// const persistConfig = {
//     key: "auth",
//     storage: storage,
//     whitelist: [""],
// };

const rootReducer = combineReducers({
    modal: modalReducer,
    snackbar: snackbarReducer,
    layout: layoutReducer,
});

export const pemilyStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => process.env.NODE_ENV === "development" ?
        getDefaultMiddleware({ serializableCheck: false }).concat(logger) :
        getDefaultMiddleware({ serializableCheck: false })
});

export type PemilyRootState = ReturnType<typeof pemilyStore.getState>;
export type PemilyAppDispatch = typeof pemilyStore.dispatch;

export const usePemilyAppDispatch = () => useDispatch<PemilyAppDispatch>();
export const usePemilyAppSelector: TypedUseSelectorHook<PemilyRootState> = useSelector;
