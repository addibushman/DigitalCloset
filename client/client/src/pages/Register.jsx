import React, { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration successful!');
      } else {
        alert('Registration failed: ' + data.error);
      }
    } catch (err) {
      console.error('Register error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="text-white d-flex justify-content-center align-items-center vh-100 bg-pink-500">
      <form onSubmit={handleRegister} className="w-75 bg-dark p-4 rounded" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Register</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="form-control mb-3"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="form-control mb-4"
        />
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success">Register</button>
        </div>
      </form>
    </div>
  );
}
