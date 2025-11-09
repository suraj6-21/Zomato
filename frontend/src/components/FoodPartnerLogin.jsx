import React from 'react';
import '../App.css';
import "../Style/Theme.css";


const FoodPartnerLogin = () => {
    return (
      <div className="auth-container">
        <div className="auth-card">
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