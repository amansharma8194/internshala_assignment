import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../misc/custom-hooks';

const Nav = () => {
  const [state] = useProducts();
  const [cartItems, setCartItems] = useState(state.length);
  const location = useLocation();
  useEffect(() => {
    setCartItems(state.length);
    return () => {
      setCartItems(state.length);
    };
  }, [state.length, location.pathname]);
  return (
    <div className="nav-bar">
      <h5 className="logo">Assignment</h5>
      <ul>
        <li>
          <Link
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`nav-link ${
              location.pathname === '/Cart' ? 'active' : ''
            }`}
            to="/Cart"
          >
            ({<span>{cartItems}</span>}) Cart
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
