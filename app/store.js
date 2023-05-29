import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from './features/shoppingCart/shoppingCartSlice';

const saveToLocalStorage = () => (next) => (action) => {
    if (action.type === 'productsInCart/addToCart') {
        let productsInCart = JSON.parse(localStorage.getItem('products-in-cart'));

        if (productsInCart !== null) {
            productsInCart.push(action.payload);
            localStorage.setItem('products-in-cart', JSON.stringify(productsInCart));
        }
        else {
            localStorage.setItem('products-in-cart', JSON.stringify([action.payload]));
        }
    } 
    return next(action);
};

const removeFromLocalStorage = () => (next) => (action) => {
    if (action.type === 'productsInCart/removeFromCart') {
        let productsInCart = JSON.parse(localStorage.getItem('products-in-cart'));

        if (productsInCart !== null) {
            productsInCart = productsInCart.filter(item => item.id !== action.payload.id);
            localStorage.setItem('products-in-cart', JSON.stringify(productsInCart));
        }
    } 
    return next(action);
};

export const store = configureStore({
    reducer: {
        productsInCart: shoppingCartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveToLocalStorage, removeFromLocalStorage),
});