import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  // Function to calculate the total price
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart__items">
          {cart.map((item) => (
            <div key={item.title} className="cart__item">
              <div className="cart__item-details">
                <h2>{item.title}</h2>
                <p>${item.price}</p>
                <p>{item.tags}</p>
              </div>
              <div className="cart__item-quantity">
                <button onClick={() => dispatch({ type: 'DECREMENT_QUANTITY', payload: item.title })}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch({ type: 'INCREMENT_QUANTITY', payload: item.title })}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="cart__total">
          <h2>Total: ${calculateTotal().toFixed(2)}</h2>
        </div>
      )}
      <Link to="/checkout" className="cart__checkout-button">Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;
