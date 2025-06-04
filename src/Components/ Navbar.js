import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-purple-600 p-4 flex justify-between items-center text-white">
      <div className="space-x-4">
        <Link to="/" className="font-bold hover:underline">Home</Link>
        <Link to="/login" className="font-bold hover:underline">Login</Link>
        {/* Uncomment if needed */}
        {/* <Link to="/admin" className="font-bold hover:underline">Admin</Link> */}
        {/* <Link to="/add-discount" className="font-bold hover:underline">Add Discount</Link> */}
        {/* <Link to="/get-discount" className="font-bold hover:underline">Get Discount</Link> */}
        {/* <Link to="/all-discounts" className="font-bold hover:underline">All Discount</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;