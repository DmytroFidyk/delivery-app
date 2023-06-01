import { createSlice } from '@reduxjs/toolkit';

let productsInCart = [];

if (typeof window !== 'undefined') {
    productsInCart = JSON.parse(window.localStorage.getItem('products-in-cart')) || [];
}

export const productsInCartSlice = createSlice({
    name: 'productsInCart',
    initialState: {
        value: productsInCart,
    },
    reducers: {
        addToCart: (state, action) => {
            state.value.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.value = state.value.filter(item => item.id != action.payload.id);
        },
    }
});

export const { addToCart, removeFromCart } = productsInCartSlice.actions;

export default productsInCartSlice.reducer;