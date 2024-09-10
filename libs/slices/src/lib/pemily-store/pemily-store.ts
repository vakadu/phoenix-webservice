import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';

import modalReducer from '../modal/modal.slice';
import snackbarReducer from '../snackbar/snackbar.slice';
import layoutReducer from '../layout/layout.slice';
import authReducer from '../pemilyy-auth/pemilyy-auth.slice';

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['auth'],
};

const rootReducer = combineReducers({
	modal: modalReducer,
	snackbar: snackbarReducer,
	layout: layoutReducer,
	auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const pemilyStore = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		process.env.NODE_ENV === 'development'
			? getDefaultMiddleware({ serializableCheck: false }).concat(logger as any)
			: getDefaultMiddleware({ serializableCheck: false }),
});

export const pemilyPersistor = persistStore(pemilyStore);

export type PemilyRootState = ReturnType<typeof rootReducer>;
export type PemilyAppDispatch = typeof pemilyStore.dispatch;

export const usePemilyAppDispatch = () => useDispatch<PemilyAppDispatch>();
export const usePemilyAppSelector: TypedUseSelectorHook<PemilyRootState> = useSelector;
