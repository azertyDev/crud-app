import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { productApi } from '../services/ProductService';
import cartReducer from './slices/CartSlice';

const rootReducer = combineReducers({
    cartReducer,
    [productApi.reducerPath]: productApi.reducer,
});

export const store = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(productApi.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
