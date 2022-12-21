import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import transectionReducer from "./transectionSlice";
import softwareReducer from "./softwareSlice";
import orderReducer from "./orderSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from "redux";


const persistConfig = {
    key: 'root',
    storage,
  }
  const rootReducer = combineReducers({ 
    product: productReducer,
        category: categoryReducer,
        modal: modalReducer,
        cart: cartReducer,
        auth: authReducer,
        user:userReducer,
        transection:transectionReducer,
        software :softwareReducer,
        order: orderReducer
  })
  const persistedReducer = persistReducer(persistConfig,rootReducer )
    export const store = configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: [thunk]
      })
      
      export const persistor = persistStore(store)