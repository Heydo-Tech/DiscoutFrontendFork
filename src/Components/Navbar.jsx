import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddDiscount from './AddDiscount';
import AllDiscounts from './AllDiscounts';

const Navbar = () => {
  const [activeComponent, setActiveComponent] = useState('add-discount');
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add-discount':
        return <AddDiscount />;
      case 'all-discounts':
        return <AllDiscounts />;
      default:
        return <AddDiscount />;
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-orange-400 p-4 flex justify-between items-center text-white sticky top-0 z-10">
        <div className="flex justify-center">
          <img
            src="/favicon.png"
            alt="Apni Mandi Logo"
            className="h-10 w-auto mr-4"
          />
        </div>
        <div className="space-x-4">
          <button
            onClick={() => setActiveComponent('add-discount')}
            className={`font-semibold transition-all ${activeComponent === 'add-discount' ? 'text-green-600' : 'hover:text-green-600'}`}
          >
            Add Discount
          </button>
          <button
            onClick={() => setActiveComponent('all-discounts')}
            className={`font-semibold transition-all ${activeComponent === 'all-discounts' ? 'text-green-600' : 'hover:text-green-600'}`}
          >
            View Discounts
          </button>
          <button
            onClick={handleLogout}
            className="font-semibold text-red-600 hover:text-red-700 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex-grow">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Navbar;