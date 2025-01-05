import React, { useState } from 'react';


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAdminClick = () => {
    window.open('http://127.0.0.1:8000/admin/', '_blank');
  };

  return (
    <div className="navbar">
      <img className='logo'
      src='./public/logo.jpg'></img> {/* Replace with your actual logo */}
      
      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      {/* Dropdown Menu */}
      <div className={`dropdown-menu ${menuOpen ? 'active' : ''}`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      
      {/* Regular Navbar for larger screens */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/">Home</a>
        </li>
        <li className="nav-item">
          <a href="/about">About</a>
        </li>
        <li className="nav-item">
          <a href="/contact">Contact</a>
        </li>
      </ul>
      <button
      className='login-btn'
      onClick={handleAdminClick}
      >LogIn</button>
    </div>
  );
};

export default NavBar;
