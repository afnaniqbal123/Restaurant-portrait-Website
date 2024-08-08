import React from 'react';
import './MenuItem.css';

const MenuItem = ({ title, price, tags, onAddToCart }) => (
  <div className="app__menuitem">
    <div className="app__menuitem-head">
      <div className="app__menuitem-name">
        <p className="p__cormorant" style={{ color: '#DCCA87' }}>{title}</p>
      </div>
      <div className="app__menuitem-dash" />
      <div className="app__menuitem-price">
        <p className="p__cormorant">${price}</p>
      </div>
    </div>

    <div className="app__menuitem-sub">
      <p className="p__opensans" style={{ color: '#AAAAAA' }}>{tags}</p>
    </div>

    <button className="app__menuitem-add" onClick={() => onAddToCart({ title, price, tags })}>
      Add to Cart
    </button>
  </div>
);

export default MenuItem;
