import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Outfits from './pages/Outfits';
import MixAndMatch from './pages/MixandMatch';
import ViewMatches from './pages/ViewMatches';
import Register from './pages/Register';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100 px-4">
        <Link className="navbar-brand fw-bold" to="/">Digital Closet</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/upload">Upload Clothing</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/outfits">View Outfits</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/mix">Mix & Match</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/matches">View Matches</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <main className="container d-flex flex-column align-items-center justify-content-center mt-5 pt-5 min-vh-100" style={{ maxWidth: '800px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {isAuthenticated && (
            <>
              <Route path="/upload" element={<Upload />} />
              <Route path="/outfits" element={<Outfits />} />
              <Route path="/mix" element={<MixAndMatch />} />
              <Route path="/matches" element={<ViewMatches />} />
            </>
          )}
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </main>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}