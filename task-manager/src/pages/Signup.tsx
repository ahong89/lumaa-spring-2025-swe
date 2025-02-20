import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import './Signup.css';

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    console.log(`Logging in now with ${email} and ${password}`);
    navigate("/tasks");
  }

  return (
    <div className="SignupPage">
      <div className="SignupContainer">
        <h1 className="SignupHeader">Signup</h1>
        <form className="SignupForm" onSubmit={handleSignup}>
          <div className="EmailContainer">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="PasswordContainer">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="SignupButton" type="submit">Signup!</button> 
        </form>
        <div className="LoginRouteContainer">
          <p>Have an account?</p>
          <button className="LoginRouteButton" onClick={() => navigate("/login")}>Login!</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
