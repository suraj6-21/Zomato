import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
  const [isFoodPartner, setIsFoodPartner] = useState(false);
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
      // 1. Make sure this points to your LOGIN endpoint, NOT register
      const response = await axios.post('http://localhost:8000/api/user/login', {
        email,
        password
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        console.log(response.data);

        // 3. Navigate to home/dashboard
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert("Login failed!");
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
        <h2 className="auth-title">User Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            name="email"
          />
          <input type="password"
            placeholder="Password"
            className="auth-input"
            name="password"
          />
          <button type="submit" className="auth-btn">Login</button>
          <a href="/user/register" className="auth-link">Create an account</a>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;

