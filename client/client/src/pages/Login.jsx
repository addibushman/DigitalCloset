// File: src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      localStorage.setItem('user', username);
      setIsAuthenticated(true);     // ✅ update state
      alert('Login successful!');
      navigate('/');                // ✅ go home
    } else {
      alert('Login failed.');
    }
  };

  return (
    <div className="text-white d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleLogin} className="w-50 bg-dark p-4 rounded">
        <h2 className="mb-3">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="form-control mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success">Login</button>
      </form>
    </div>
  );
}
