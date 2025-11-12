import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const FoodPartnerRegister = () => {
  const [isFoodPartner, setIsFoodPartner] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsFoodPartner(!isFoodPartner);
    navigate(isFoodPartner ? '/user/register' : '/food-partner/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Form submitted');
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

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Business Name"
            className="auth-input"
            required
          />
          <input
            type="text"
            placeholder="Contact Name"
            className="auth-input"
            required
          />
          <input
            type="tel" // Use type="tel" for contact numbers
            placeholder="Contact Phone"
            className="auth-input"
            required
          />
          <input
            type="email"
            placeholder="business@example.com"
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            required
            minLength={6} // Good practice to add min length
          />
          <input
            type="text"
            placeholder="Business Address"
            className="auth-input"
            required
          />

          {/* This MUST be type="submit" to trigger the form's onSubmit */}
          <button type="submit" className="auth-btn">
            Register
          </button>
          
          <a href="/food-partner/login" className="auth-link">
            Already registered? Sign In
          </a>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;