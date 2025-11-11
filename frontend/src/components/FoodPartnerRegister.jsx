import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import "../Style/Theme.css";

const FoodPartnerRegister = () => {
  const [isFoodPartner, setIsFoodPartner] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsFoodPartner(!isFoodPartner);
    navigate(isFoodPartner ? '/user/register' : '/food-partner/register');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="modern-toggle-container">
          <span className={`toggle-label ${isFoodPartner ? 'active' : ''}`}>
            Food Partner
          </span>
          <label className="modern-toggle">
            <input
              type="checkbox"
              checked={!isFoodPartner}
              onChange={handleToggle}
            />
            <span className="slider"></span>
          </label>
          <span className={`toggle-label ${!isFoodPartner ? 'active' : ''}`}>
            User
          </span>
        </div>
        <h2 className="auth-title">Food Partner Register</h2>
        <form>
          <input type="text" placeholder="Business Name" className="auth-input" />
          <input type="email" placeholder="Email" className="auth-input" />
          <input type="password" placeholder="Password" className="auth-input" />
          <button type="button" className="auth-btn">Register</button>
          <a href="/food-partner/login" className="auth-link">Already registered?</a>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
