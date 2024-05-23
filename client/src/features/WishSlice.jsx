import { createSlice } from "@reduxjs/toolkit";
import { useToast } from "@chakra-ui/react";
const storedFavItems = JSON.parse(localStorage.getItem('favItems')) || [];

const initialState = {
  favItems: storedFavItems,
};

const wishSlice = createSlice({
  name: 'wish',
  initialState,
  reducers: {
    addWish: (state, action) => {
      const { id, title, description, type, created_at, user_id } = action.payload;
      const existingPost = state.favItems.find(post => post.id === id);
      if (existingPost) {
        console.log('item already exists');
    
      } else {
        state.favItems.push({ id, title, description, type, created_at,user_id });
        localStorage.setItem('favItems', JSON.stringify(state.favItems));
     console.log('item', state.favItems);
      }
    },
    removeWish: (state, action) => {
      const index = state.favItems.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.favItems.splice(index, 1);
        localStorage.setItem('favItems', JSON.stringify(state.favItems));
        console.log('success')
      }
    }
  }
});

export const { addWish, removeWish } = wishSlice.actions;
export default wishSlice.reducer;
