import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import './Login.css';

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    console.log(`Logging in now with ${email} and ${password}`);
    navigate("/tasks");
  }

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <h1 className="LoginHeader">Login</h1>
        <form className="LoginForm" onSubmit={handleLogin}>
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
          <button className="LoginButton" type="submit">Login!</button>
        </form>
        <div className="SignupRouteContainer">
          <p>Don't have an account?</p>
          <button className="SignupRouteButton" onClick={() => navigate("/signup")}>Signup!</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
