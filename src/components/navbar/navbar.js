// Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ categories }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Pepil e-commerce</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-button">
            Categories
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              {categories.map((category, index) => (
                <Link key={index} to={`/${category.toLowerCase()}`}>
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link to="/underconstruction">Cart</Link>
        <Link to="/underconstruction">Profile</Link>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>
    </nav>
  );
}

export default Navbar;
