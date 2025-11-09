import React from 'react';
import '../App.css';
import "../Style/Theme.css";


const FoodPartnerRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
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
