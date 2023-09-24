import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   category: "",
   brand: "",
   rating: "",
   pageNumber: 1,
   keywords: "",
   // priceFrom: 0,
   // priceTo: 0,
   // sort: "p",
};

// const [x, setX] = useState("hello");
// setX("Hossam");

//import setFilter from ../slice/

//useSelector
// const filter=useSelector((state)=>state.filter)
// {filter.brand}

//dispatch
//dispatch(setFilter({rating:5}))

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
         // localStorage.setItem("filter", JSON.stringify(state));

         return state;
      },

      setCategory(state, action) {
         const { category } = action.payload;
         state.category = category;

         return state;
      },

      setBrand(state, action) {
         const { brand } = action.payload;
         state.brand = brand;
         return state;
      },
      setRating(state, action) {
         const { rating } = action.payload;
         state.rating = rating;
         return state;
      },

      setKeywords(state, action) {
         const { keywords } = action.payload;
         state.keywords = keywords;
         return state;
      },
      setPage(state, action) {
         const { pageNumber } = action.payload;
         state.pageNumber = pageNumber;
         // localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },
      setPriceFrom(state, action) {
         const { priceFrom } = action.payload;
         state.priceFrom = priceFrom;
         // localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },
      setPriceTo(state, action) {
         const { priceTo } = action.payload;
         state.priceTo = priceTo;
         // localStorage.setItem("filter", JSON.stringify(state));
         return state;
      },
      // setSort(state, action) {
      //    const { sort } = action.payload;
      //    state.sort = sort;
      //    // localStorage.setItem("filter", JSON.stringify(state));
      //    return state;
      // },

      clearFilter(state) {
         const { category, brand, rating, keywords } = initialState;
         state.category = category;
         state.brand = brand;
         state.rating = rating;
         state.keywords = keywords;
         // localStorage.setItem("filter", JSON.stringify(state));
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
   setKeywords,
   setPage,
   setSort,
   clearFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
