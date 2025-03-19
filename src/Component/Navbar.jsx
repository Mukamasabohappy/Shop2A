import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo"><Link to="/">FashionStore</Link></div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/men">Men</Link></li>
        <li><Link to="/women">Women</Link></li>
        <li><Link to="/kids">Kids</Link></li>
        
        
        <li><Link to="/login" className="login-btn">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
