import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import "../Style/Theme.css";

const UserRegister = () => {
  const [isFoodPartner, setIsFoodPartner] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsFoodPartner(!isFoodPartner);
    navigate(isFoodPartner ? '/user/register' : '/food-partner/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    

    await axios.post("http://localhost:3000/api/auth/user/register", {
      fullName,
      email,
      password,
    });


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
        <h2 className="auth-title">User Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="auth-input"
          />
          <input
            type="email"
            name='email'
            placeholder="Email"
            className="auth-input"
          />
          <input
            type="password"
            name='password'
            placeholder="Password"
            className="auth-input"
          />

          <button
            type="submit" className="auth-btn cursor-pointer">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;