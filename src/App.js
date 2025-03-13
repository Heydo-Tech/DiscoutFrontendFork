import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Componenst/ Navbar';
import Login from './Componenst/Login';
import UserManagement from './Componenst/UserManagement';
import './styles/styles.css';
import AddDiscount from './Componenst/AddDiscount';
import GetDiscount from './Componenst/GetDiscount';
import AllDiscounts from './Componenst/AllDiscounts';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<UserManagement />} />
        <Route path="/add-discount" element={<AddDiscount />} />
        <Route path="/get-discount" element={<GetDiscount />} />
        <Route path="/all-discounts" element={<AllDiscounts />} />
      </Routes>
    </Router>
  );
};

export default App;