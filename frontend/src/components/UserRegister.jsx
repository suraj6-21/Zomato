import React from 'react';
import '../App.css';
import "../Style/Theme.css";


const UserRegister = () => {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">User Register</h2>
          <form>
            <input type="text" placeholder="Full Name" className="auth-input" />
            <input type="email" placeholder="Email" className="auth-input" />
            <input type="password" placeholder="Password" className="auth-input" />
            <button type="button" className="auth-btn">Register</button>
            <a href="/user/login" className="auth-link">Already have an account?</a>
          </form>
        </div>
      </div>
    );
  };
  
  export default UserRegister;