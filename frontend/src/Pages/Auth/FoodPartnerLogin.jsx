import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodPartnerLogin = () => {
  const [isFoodPartner, setIsFoodPartner] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsFoodPartner(!isFoodPartner);
    navigate(isFoodPartner ? '/user/login' : '/food-partner/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        // ✅ Use full backend URL
        'http://localhost:3000/api/auth/food-partner/login', { email, password },
        { withCredentials: true }
      );
      console.log('✅ Login response:', response.data);
      alert(response.data.message || 'Login successful!');
      navigate('/create-food');

    }
    catch (error) {
      console.error('❌ Login error:', error);
      if (error.response && error.response.status === 404) {
        alert('Server route not found (404). Check your backend endpoint.');
      } else {
        alert('Login failed. Please try again.');
      }
    }
  }

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
        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            name='password'
          />

          <button type="submit" className="auth-btn">
            Login
          </button>

          <a href="/food-partner/register" className="auth-link">
            Create an account
          </a>

        </form>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;