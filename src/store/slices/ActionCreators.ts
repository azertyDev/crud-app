import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICart } from 'src/models/IProduct';

export const fetchCart = createAsyncThunk(
    'cart/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await axios.get<ICart[]>(
                'http://localhost:5000/cart',
            );
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Failed to load products!');
        }
    },
);


export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product, thunkApi) => {
        try {
            const response = await axios.post<ICart[]>(
                'http://localhost:5000/cart', {
                    product
                }
            );
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Failed to add product!');
        }
    },
);
