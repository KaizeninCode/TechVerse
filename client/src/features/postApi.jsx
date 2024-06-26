import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const postApi=createApi({
    reducerPath:"postApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000"}),
    endpoints:(builder)=>({
        getAllPosts:builder.query({
            query:()=>"contents"
        })
    })
})
export  const {useGetAllPostsQuery}=postApi