import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { ContactSlice } from "./ContactReducer";

const rootReducer = combineReducers({
    ContactReducer:ContactSlice.reducer
})

const persistConfig = {
  key: 'root',
  storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const ReduxStore = configureStore ({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistedstore = persistStore(ReduxStore)