import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import "../Style/Theme.css";

const FoodPartnerLogin = () => {
  const [isFoodPartner, setIsFoodPartner] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsFoodPartner(!isFoodPartner);
    navigate(isFoodPartner ? '/user/login' : '/food-partner/login');
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
        <h2 className="auth-title">Food Partner Login</h2>
        <form>
          <input type="email" placeholder="Email" className="auth-input" />
          <input type="password" placeholder="Password" className="auth-input" />
          <button type="button" className="auth-btn">Login</button>
          <a href="/food-partner/register" className="auth-link">Create an account</a>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;