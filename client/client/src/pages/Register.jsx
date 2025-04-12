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
    <div className="text-white text-center">
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleRegister} className="d-flex flex-column align-items-center gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
