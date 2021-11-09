import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productApi } from "../services/ProductService";
import userReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({
  userReducer,
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
export type AppDispatch = AppStore["dispatch"];
