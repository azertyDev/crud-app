import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICart, IProduct } from '../models/IProduct';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  tagTypes: ['Products', 'Cart'],
  endpoints: (build) => ({
    fetchAllProducts: build.query<
      IProduct[],
      { currentPage: number; limit: number; searchResult?: string }
    >({
      query: (arg) => {
        const { currentPage: _page, limit: _limit, searchResult } = arg;
        return {
          url: '/products',
          params: { _page, _limit, title: searchResult },
        };
      },
      providesTags: ['Products'],
    }),
    getProductById: build.query<IProduct, string>({
      query: (id) => `/products/${id}`,
    }),
    createProduct: build.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: build.mutation<IProduct, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: build.mutation<IProduct, any>({
      query: (args) => {
        const { id, ...product } = args;
        return {
          url: `/products/${id}`,
          method: 'PUT',
          body: product,
        };
      },
      invalidatesTags: ['Products'],
    }),
    fetchCart: build.query<ICart[], void>({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    addToCart: build.mutation<IProduct, any>({
      query: (args) => {
        const { inCart, ...product } = args;
        return {
          url: `/cart`,
          method: 'POST',
          body: product,
        };
      },
    }),
    deleteFromCart: build.mutation<void, string>({
      query: (args) => {
        return {
          url: `/cart/${args}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useFetchCartQuery,
  useAddToCartMutation,
  useDeleteFromCartMutation,
} = productApi;
