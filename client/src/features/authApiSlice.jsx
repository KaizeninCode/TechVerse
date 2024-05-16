import { apiSlice } from "../api/Authapi";
import { logout } from "./AuthSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials // Assuming credentials include username and password
            })
        }),
        logout
    })
});
export const {useLoginMutation}=authApiSlice

