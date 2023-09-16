import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   filter: localStorage.getItem("filter")
      ? JSON.parse(localStorage.getItem("filter"))
      : { category: "", brand: "", Rating: "" },
};

const filterSlice = createSlice({
   name: "filter",
   initialState,
   reducers: {
      setFilter(state, action) {
         state.filter = action.payload;
         localStorage.setItem("filter", JSON.stringify(action.payload));
      },
      clearFilter(state) {
         state.filter = initialState.filter;
         localStorage.removeItem("filter");
         return state;
      },
   },
});

export const { setFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
