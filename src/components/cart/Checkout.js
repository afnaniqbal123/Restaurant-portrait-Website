import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform payment processing here...

    // Clear cart in local storage
    dispatch({ type: 'RESET_CART' });

    // Navigate back to home
    navigate('/');
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input type="text" name="cardNumber" placeholder="Card Number" value={form.cardNumber} onChange={handleChange} required />
        <input type="text" name="expiration" placeholder="Expiration Date" value={form.expiration} onChange={handleChange} required />
        <input type="text" name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} required />
        <button type="submit">Order Now</button>
      </form>
    </div>
  );
};

export default Checkout;
