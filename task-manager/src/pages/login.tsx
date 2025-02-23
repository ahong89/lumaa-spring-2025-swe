import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { type JwtPayload } from "jwt-decode";

import './login.css';
import { loginAPI } from '../api/auth'

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken: string | null = localStorage.getItem('accessToken');
    if(savedToken) {
      const decoded: JwtPayload = jwtDecode<JwtPayload>(savedToken);
      if(decoded.exp && decoded.exp > Math.floor(Date.now() / 1000)) {
        navigate("/tasks");
        return;
      }
    }
    navigate("/login");
  }, [navigate])

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await loginAPI(username, password);
    if(response?.status == 200) {
      navigate("/tasks");
    } else {
      setError(response?.data?.error || "Unknown Error");
    }
  }

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <h1 className="LoginHeader">Login</h1>
        <form className="LoginForm" onSubmit={handleLogin}>
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
          <button className="LoginButton" type="submit">Login!</button>
          {error && <p>Error: {error}</p>}
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
