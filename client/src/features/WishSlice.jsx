import { createSlice } from "@reduxjs/toolkit";

const wishSlice=createSlice({
    name:'wish',
    initialState:[],
    reducers:{
        addWish:(state,action)=>{
            state.push(action.payload)
        },
        removeWish:(state,action)=>{
            const index=state.indexOf(action.payload)
            state.splice(index,1)
        }
    }
})