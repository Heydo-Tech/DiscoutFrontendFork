import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import UserManagement from './Components/UserManagement';
import AddDiscount from './Components/AddDiscount';
import GetDiscount from './Components/GetDiscount';
import AllDiscounts from './Components/AllDiscounts';

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/admin" element={<UserManagement />} />
        <Route path="/add-discount" element={<AddDiscount />} />
        <Route path="/get-discount" element={<GetDiscount />} />
        <Route path="/all-discounts" element={<AllDiscounts />} />
      </Routes>
    </Router>
  );
};

export default App;