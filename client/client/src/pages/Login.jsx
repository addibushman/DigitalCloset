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
      const data = await res.json();
      localStorage.setItem('user', JSON.stringify({ id: data.user_id, username }));
      setIsAuthenticated(true);
      alert('Login successful!');
      navigate('/');
    } else {
      alert('Login failed.');
    }
  };

  return (
    <div className="text-white d-flex justify-content-center align-items-center vh-100 bg-pink-500">
      <form
        onSubmit={handleLogin}
        className="w-75 bg-dark p-4 rounded"
        style={{ maxWidth: '400px' }}
      >
        <h2 className="mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="form-control mb-3"
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
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

