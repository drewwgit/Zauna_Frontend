import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import Register from "../pages/Register";

const HamburgerMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen)
    };

    return (
      <div className="hamburger-menu">
        <div className="menu-icon" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      <nav className={isOpen? 'nav-menu active' : 'nav-menu'}>
        <ul>
          <li><Link to="/register" onClick={toggleMenu}>Register</Link></li>
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          <li><Link to="/account/" onClick={toggleMenu}>My Account</Link></li>
          <li><Link to="/contact-us" onClick={toggleMenu}>Contact Us</Link></li>
        </ul>
      </nav>
      </div>
    );
  }
  
  export default HamburgerMenu;