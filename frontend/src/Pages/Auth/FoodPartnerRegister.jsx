import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodPartnerRegister = () => {
  const [isFoodPartner, setIsFoodPartner] = useState(true);
  const navigate = useNavigate();

  // ✅ Toggle between Food Partner and User registration
  const handleToggle = () => {
    setIsFoodPartner(!isFoodPartner);
    navigate(isFoodPartner ? '/user/register' : '/food-partner/register');
  };

  // ✅ Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const contactName = e.target.contactName.value;
    const contactNumber = e.target.contactNumber.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    try {
      const response = await axios.post(
        // ✅ Use full backend URL
        'http://localhost:3000/api/auth/food-partner/register',
        {
          name,
          contactName,
          contactNumber,
          email,
          password,
          address,
        },
        { withCredentials: true }
      );

      console.log('✅ Registration response:', response.data);
      alert('Registration successful!');
      navigate('/');
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      if (error.response && error.response.status === 404) {
        alert('Server route not found (404). Check your backend endpoint.');
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Toggle */}
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Business Name"
            className="auth-input"
            name="name"
            required
          />
          <input
            type="text"
            placeholder="Contact Name"
            className="auth-input"
            name="contactName"
            required
          />
          <input
            type="tel"
            placeholder="Contact Phone"
            className="auth-input"
            name="contactNumber"
            required
          />
          <input
            type="email"
            placeholder="business@example.com"
            className="auth-input"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            name="password"
            required
            minLength={6}
          />
          <input
            type="text"
            placeholder="Business Address"
            className="auth-input"
            name="address"
            required
          />

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
