import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from '../features/AuthSlice'
import { apiSlice } from '../api/Authapi'
import { postApi } from '../features/postApi';
import contentReducer from '../features/contentSlice';
 export const store=configureStore({
    reducer:{
        auth:AuthReducer,
        api:apiSlice.reducer,
        [postApi.reducerPath]:postApi.reducer,
        content:contentReducer
        
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware,postApi.middleware)

});