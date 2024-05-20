
//create a slice 

import { createSlice } from "@reduxjs/toolkit"
//initialize items
const initialState={
    items:[],
    status:null
}
const contentSlice=createSlice({
    name:"contents",
    initialState,
    reducers:{}
})

export default contentSlice.reducer