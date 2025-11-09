import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserRegister from '../components/UserRegister';
import UserLogin from '../components/UserLogin';
import FoodPartnerRegister from '../components/FoodPartnerRegister';
import FoodPartnerLogin from '../components/FoodPartnerLogin';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/user/register" element={<UserRegister/>} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
      <Route path="/food-partner/login" element={< FoodPartnerLogin/>} />
    </Routes>
  );
};

export default AppRoutes;