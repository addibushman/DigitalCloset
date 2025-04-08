// File: src/pages/Outfits.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Outfits() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/clothing')
      .then((res) => res.json())
      .then(setItems)
      .catch((err) => {
        console.error('Error loading wardrobe:', err);
        alert('Could not load clothing items.');
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await fetch(`/api/clothing/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        const error = await res.json();
        alert('Delete failed: ' + error.error);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Could not delete item. Server may not be running.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center mt-10 text-white">
        <p className="mb-4">Your wardrobe is empty.</p>
        <Link to="/upload" className="underline text-blue-400">
          Click here to upload some clothing!
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col items-center text-center">
          <div className="w-[80px] h-[100px] overflow-hidden rounded shadow">
          <img
            src={`http://localhost:4000/uploads/${item.image}`}
            alt={item.category}
            style={{
              width: '80px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          />
          </div>
          <p className="text-sm mt-1">{item.category}</p>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded mt-1"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}


