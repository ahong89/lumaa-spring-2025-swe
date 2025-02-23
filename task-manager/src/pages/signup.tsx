import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './signup.css';
import { signupAPI } from '../api/auth';

function Signup() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();
    const response = await signupAPI(username, password);
    if(response?.status == 200) {
      navigate("/login");
    } else {
      setError(response?.data?.error || "Unknown Error has occured");
    }
  }

  return (
    <div className="SignupPage">
      <div className="SignupContainer">
        <h1 className="SignupHeader">Signup</h1>
        <form className="SignupForm" onSubmit={handleSignup}>
          <div className="EmailContainer">
            <label>Username:</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          {error && <p>Error: {error}</p>}
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
