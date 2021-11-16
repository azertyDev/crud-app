import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart } from 'src/models/IProduct';
import { fetchCart, addToCart } from './ActionCreators';

interface CartState {
    data: ICart[];
    isLoading: boolean;
    error: string;
}

const initialState: CartState = {
    data: [],
    isLoading: false,
    error: '',
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCart.fulfilled.type]: (state, action: PayloadAction<ICart[]>) => {
            state.isLoading = false;
            state.error = '';
            state.data = action.payload;
        },
        [fetchCart.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchCart.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
});

export default cartSlice.reducer;
