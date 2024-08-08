import React, { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.findIndex(item => item.title === action.payload.title);
      if (existingItemIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to local storage
        return updatedCart;
      }
      const newCart = [...state, { ...action.payload, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart)); // Save to local storage
      return newCart;
    case 'INCREMENT_QUANTITY':
      const incrementedCart = state.map(item =>
        item.title === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(incrementedCart)); // Save to local storage
      return incrementedCart;
    case 'DECREMENT_QUANTITY':
      const decrementedCart = state
        .map(item =>
          item.title === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(decrementedCart)); // Save to local storage
      return decrementedCart;
    case 'RESET_CART':
      localStorage.removeItem('cart'); // Clear local storage
      return initialState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to local storage on update
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
