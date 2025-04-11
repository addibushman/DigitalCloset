// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Outfits from './pages/Outfits';
import MixAndMatch from './pages/MixandMatch';
import ViewMatches from './pages/ViewMatches';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100 px-4">
          <Link className="navbar-brand fw-bold" to="/">Digital Closet</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
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
            </ul>
          </div>
        </nav>

        <main className="container mt-5 pt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/outfits" element={<Outfits />} />
            <Route path="/mix" element={<MixAndMatch />} />
            <Route path="/matches" element={<ViewMatches />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}