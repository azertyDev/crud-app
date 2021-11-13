import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../models/IProduct";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    fetchAllProducts: build.query<
      IProduct[],
      { currentPage: number; limit: number; searchResult?: string }
    >({
      query: (arg) => {
        const { currentPage: _page, limit: _limit, searchResult } = arg;
        return {
          url: "/products",
          params: { _page, _limit, title: searchResult },
        };
      },
      providesTags: ["Products"],
    }),
    getProductById: build.query<IProduct, string>({
      query: (id) => `/products/${id}`,
    }),
    createProduct: build.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation<IProduct, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation<IProduct, any>({
      query: (args) => {
        const { id, product } = args;
        return {
          url: `/products/${id}`,
          method: "PUT",
          body: product,
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
