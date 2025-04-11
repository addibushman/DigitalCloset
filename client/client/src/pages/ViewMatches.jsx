// File: client/src/pages/ViewMatches.jsx
import React, { useEffect, useState } from 'react';

export default function ViewMatches() {
  const [outfits, setOutfits] = useState([]);
  const [clothingMap, setClothingMap] = useState({});

  useEffect(() => {
    async function fetchData() {
      const clothingRes = await fetch('/api/clothing');
      const clothing = await clothingRes.json();
      const clothingById = {};
      clothing.forEach(item => clothingById[item.id] = item);
      setClothingMap(clothingById);

      const outfitsRes = await fetch('/api/outfits');
      const savedOutfits = await outfitsRes.json();
      const parsedOutfits = savedOutfits.map(outfit => ({
        ...outfit,
        items: Array.isArray(outfit.items)
          ? outfit.items
          : outfit.items.split(',')
      }));
      setOutfits(parsedOutfits);
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this outfit?')) return;

    const res = await fetch(`/api/outfits/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setOutfits(prev => prev.filter(outfit => outfit.id !== id));
    } else {
      alert('Failed to delete outfit.');
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl mb-4">Your Matched Outfits</h2>
      {outfits.length === 0 ? (
        <p className="text-gray-400">No matches saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {outfits.map((outfit) => (
            <div key={outfit.id} className="border p-4 rounded shadow text-center">
              <h3 className="text-lg font-semibold mb-2">
                {outfit.name || `Outfit #${outfit.id}`}
              </h3>
              <div className="flex justify-center gap-2 mb-2">
                {outfit.items.map((id, i) => (
                  clothingMap[id] ? (
                    <img
                      key={i}
                      src={`http://localhost:4000/uploads/${clothingMap[id].image}`}
                      alt="match-piece"
                      style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  ) : null
                ))}
              </div>
              <button
                onClick={() => handleDelete(outfit.id)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


