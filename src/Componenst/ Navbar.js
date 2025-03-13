import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        {/* <Link to="/admin">Admin</Link> */}
        {/* <Link to="/add-discount">Add Discount</Link>
        <Link to="/get-discount">Get Discount</Link>
        <Link to="/all-discounts">All Discount</Link> */}
      </div>
    </div>
  );
};

export default Navbar;