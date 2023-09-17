import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("filter")
   ? JSON.parse(localStorage.getItem("filter"))
   : {
        category: "",
        brand: "",
        rating: "",
        pageNumber: 1,
        priceFrom: 0,
        priceTo: 0,
        //   keyKey: "hello",
     };

const filterSlice = createSlice({
   name: "filter",
   initialState,
   reducers: {
      setFilter(state, action) {
         const { category, brand, rating, pageNumber } = action.payload;
         state.category = category;
         state.brand = brand;
         state.rating = rating;
         state.pageNumber = pageNumber;
         localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },

      setCategory(state, action) {
         const { category } = action.payload;
         state.category = category;
         localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },

      setBrand(state, action) {
         const { brand } = action.payload;
         state.brand = brand;
         localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },
      setRating(state, action) {
         const { rating } = action.payload;
         state.rating = rating;
         localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },

      setKeyword(state, action) {
         const { keyKey } = action.payload;
         state.keyKey = keyKey;
         localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },
      setPage(state, action) {
         const { pageNumber } = action.payload;
         state.pageNumber = pageNumber;
         localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },
      setPriceFrom(state, action) {
         const { priceFrom } = action.payload;
         state.priceFrom = priceFrom;
         localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },
      setPriceTo(state, action) {
         const { priceTo } = action.payload;
         state.priceTo = priceTo;
         localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },

      clearFilter(state) {
         const { category, brand, rating } = initialState;
         state.category = category;
         state.brand = brand;
         state.rating = rating;
         localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },
   },
});

export const {
   setFilter,
   setCategory,
   setBrand,
   setRating,
   setPriceFrom,
   setPriceTo,
   setKeyword,
   setPage,
   clearFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
