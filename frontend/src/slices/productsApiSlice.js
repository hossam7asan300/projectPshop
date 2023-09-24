import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getProducts: builder.query({
         query: () => ({
            url: PRODUCTS_URL,
         }),
         keepUnusedDataFor: 1,
         providesTags: ["Products"],
      }),
      getMyProducts: builder.query({
         query: () => ({
            url: `${PRODUCTS_URL}/myproducts`,
         }),
         keepUnusedDataFor: 5,
      }),
      getProductDetails: builder.query({
         query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`,
         }),
         keepUnusedDataFor: 5,
         //what mean keepUnusedDataFor: 5?
         //https://redux-toolkit.js.org/rtk-query/usage/queries#keepunuseddatafor
      }),
      createProduct: builder.mutation({
         query: () => ({
            url: `${PRODUCTS_URL}`,
            method: "POST",
         }),
         invalidatesTags: ["Product"],
      }),
      updateProduct: builder.mutation({
         query: (data) => ({
            url: `${PRODUCTS_URL}/${data.productId}`,
            method: "PUT",
            body: data,
         }),
         invalidatesTags: ["Products"],
      }),
      uploadProductImage: builder.mutation({
         query: (data) => ({
            url: `/api/upload`,
            method: "POST",
            body: data,
         }),
      }),
      updateProductQty: builder.mutation({
         query: (data) => ({
            url: `${PRODUCTS_URL}/${data.productId}/qty`,
            method: "PUT",
            body: data,
         }),
         invalidatesTags: ["Products"],
      }),
      deleteProduct: builder.mutation({
         query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`,
            method: "DELETE",
         }),
         providesTags: ["Product"],
      }),
      createReview: builder.mutation({
         query: (data) => ({
            url: `${PRODUCTS_URL}/${data.productId}/reviews`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["Product"],
      }),
      getTopProducts: builder.query({
         query: () => `${PRODUCTS_URL}/top`,
         keepUnusedDataFor: 5,
      }),
   }),
});

export const {
   useGetProductsQuery,
   useGetMyProductsQuery,
   useGetProductDetailsQuery,
   useCreateProductMutation,
   useUpdateProductMutation,
   useUploadProductImageMutation,
   useUpdateProductQtyMutation,
   useDeleteProductMutation,
   useCreateReviewMutation,
   useGetTopProductsQuery,
} = productsApiSlice;
