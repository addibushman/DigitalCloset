// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Outfits from './pages/Outfits';
import MixAndMatch from './pages/MixandMatch';


export default function App() {
  return (
    <Router>
      <div className="p-4 max-w-4xl mx-auto text-white">
        <nav className="mb-4 flex gap-4">
          <Link to="/" className="font-bold">Home</Link>
          <Link to="/upload">Upload Clothing</Link>
          <Link to="/outfits">View Outfits</Link>
          <Link to="/mix">Mix & Match</Link>
          
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/mix" element={<MixAndMatch />} />
        </Routes>
      </div>
    </Router>
  );
}
