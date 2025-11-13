import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserRegister from '../Pages/Auth/UserRegister';
import UserLogin from '../Pages/Auth/UserLogin';
import FoodPartnerRegister from '../Pages/Auth/FoodPartnerRegister';
import FoodPartnerLogin from '../Pages/Auth/FoodPartnerLogin';
import Home from '../Pages/General/Home';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/user/register" element={<UserRegister/>} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
      <Route path="/food-partner/login" element={< FoodPartnerLogin/>} />
      <Route path="/food-partner/login" element={< FoodPartnerLogin/>} />
      <Route path="/" element={< Home/>} />
      <Route path="/create-food" element= { <div> hloo</div>} />

    </Routes>
  );
};

export default AppRoutes;