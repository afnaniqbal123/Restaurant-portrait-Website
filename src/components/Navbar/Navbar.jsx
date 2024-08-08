import React, { useContext } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa'; // Import Cart icon
import { useNavigate, Link } from 'react-router-dom'; // Import Link and useNavigate
import CartContext from '../../contexts/CartContext';
import images from '../../constants/images';
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { cart } = useContext(CartContext); // Get cart from context
  const navigate = useNavigate(); // Initialize navigate hook

  const handleCartClick = () => {
    navigate('/cart'); // Navigate to Cart page
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0); // Calculate total quantity

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="app__logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans"><Link to="/">Home</Link></li>
        <li className="p__opensans"><Link to="/#about">About</Link></li>
        <li className="p__opensans"><Link to="/#menu">Menu</Link></li>
        <li className="p__opensans"><Link to="/#awards">Awards</Link></li>
        <li className="p__opensans"><Link to="/#contact">Contact</Link></li>
      </ul>
      <div className="app__navbar-cart">
        <FaShoppingCart color="#fff" fontSize={27} onClick={handleCartClick} />
        {totalQuantity > 0 && <span className="cart__quantity">{totalQuantity}</span>} {/* Show quantity */}
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li><Link to="/" onClick={() => setToggleMenu(false)}>Home</Link></li>
              <li><Link to="/#about" onClick={() => setToggleMenu(false)}>About</Link></li>
              <li><Link to="/#menu" onClick={() => setToggleMenu(false)}>Menu</Link></li>
              <li><Link to="/#awards" onClick={() => setToggleMenu(false)}>Awards</Link></li>
              <li><Link to="/#contact" onClick={() => setToggleMenu(false)}>Contact</Link></li>
              <li><a onClick={() => { setToggleMenu(false); handleCartClick(); }}>Cart</a></li> {/* Cart in mobile view */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
