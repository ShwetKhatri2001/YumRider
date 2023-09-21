import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  selectedItem: {
    items: [],
    restaurantName: "",
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      if (action.payload.checkboxValue) {
        state.selectedItem = {
          items: [...state.selectedItem.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        state.selectedItem = {
          items: [
            ...state.selectedItem.items.filter(
              (item) => item.title != action.payload.title
            ),
          ],
          restaurantName: action.payload.restaurantName,
        };
      }
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;
