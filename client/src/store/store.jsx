import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from '../features/AuthSlice'
import { apiSlice } from '../api/Authapi'
 export const store=configureStore({
    reducer:{
        auth:AuthReducer,
        api:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)

});