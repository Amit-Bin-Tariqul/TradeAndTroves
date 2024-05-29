import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavbarStyles.css';
import { useAuth } from '../Context/context';
import UserProfile from './UserProfile';

function Navbar() {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [name, setName] = useState('');
  const { LogOut, usermail } = useAuth();
  const navigate = useNavigate();

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  const Profile = () => {
    navigate('/UserProfile');
  };

  const handleSearch = () => {
    navigate('/UserDetails', { state: { nam: name } });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/TradeTrove.png" alt="eAgri Logo" />
      </div>
      <div className={`navbar-toggler ${showNavLinks ? 'active' : ''}`} onClick={toggleNavLinks}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`navbar-links ${showNavLinks ? 'active' : ''}`}>
        <li className="nav-item">
          <Link className="nav-link" to="/Home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Buy
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Sell">
            Sell
          </Link>
        </li>
        <li className="nav-item">
          <form className="search-form">
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="search-button mx-2 my-2 " type="button" onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass fa-bounce fa-xl" style={{ color: '#134474' }}></i>
            </button>
          </form>
        </li>
        <li className="nav-item">
          {usermail ? (
            <div className="profile-logout">
              <Link className="cart-button" to="/CartInfo">
                <i className="fa-solid fa-shopping-cart fa-xl" style={{ color: '#134474' }}></i>
              </Link>
              <button className="profile-button" onClick={Profile}>
                <i className="fa-solid fa-user fa-flip" style={{ color: '#134474' }}></i>
              </button>
            </div>
          ) : (
            <button className="login-buttone mx-4 my-1" onClick={() => navigate('/TogglePage')}>
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
