// File: client/src/pages/MixAndMatch.jsx
import React, { useEffect, useState } from 'react';

export default function MixAndMatch() {
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [dresses, setDresses] = useState([]);
  const [shoes, setShoes] = useState([]);

  const [currentTop, setCurrentTop] = useState(0);
  const [currentBottom, setCurrentBottom] = useState(0);
  const [currentDress, setCurrentDress] = useState(0);
  const [currentShoe, setCurrentShoe] = useState(0);
  const [outfitName, setOutfitName] = useState('');

  const [mode, setMode] = useState('top-bottom'); // or 'dress'

  useEffect(() => {
    fetch('/api/clothing')
      .then(res => res.json())
      .then(data => {
        setTops(data.filter(item => item.category === 'top'));
        setBottoms(data.filter(item => item.category === 'bottom'));
        setDresses(data.filter(item => item.category === 'dress'));
        setShoes(data.filter(item => item.category === 'shoes'));
      });
  }, []);

  const next = (list, setter, current) => setter((current + 1) % list.length);
  const prev = (list, setter, current) => setter((current - 1 + list.length) % list.length);

  const handleSave = async () => {
    const selected = [];
    if (mode === 'top-bottom') {
      if (!tops.length || !bottoms.length || !shoes.length) return alert("Please complete your outfit.");
      selected.push(tops[currentTop].id, bottoms[currentBottom].id, shoes[currentShoe].id);
    } else {
      if (!dresses.length || !shoes.length) return alert("Please complete your outfit.");
      selected.push(dresses[currentDress].id, shoes[currentShoe].id);
    }

    const res = await fetch('/api/outfits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: outfitName || `Outfit ${Date.now()}`,
        items: selected.map(id => id.toString())
      })
    });

    if (res.ok) {
      alert("Outfit saved!");
      setOutfitName('');
    } else {
      alert("Failed to save outfit.");
    }
  };

  return (
    <div className="text-center text-white">
      <h2 className="text-2xl mb-4">Mix and Match</h2>

      <div className="mb-4">
        <label className="mr-2">Choose mode:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="text-white p-2 rounded"
        >
          <option value="top-bottom">Top + Bottom + Shoes</option>
          <option value="dress">Dress + Shoes</option>
        </select>
      </div>

      {mode === 'top-bottom' ? (
        <>
          <div className="flex justify-center items-center mb-4">
            <button onClick={() => prev(tops, setCurrentTop, currentTop)} className="mx-2">⬅️</button>
            {tops.length > 0 && (
              <img src={`http://localhost:4000/uploads/${tops[currentTop].image}`} alt="Top"
                style={{ width: '120px', height: '140px', objectFit: 'cover', borderRadius: '6px' }} />
            )}
            <button onClick={() => next(tops, setCurrentTop, currentTop)} className="mx-2">➡️</button>
          </div>

          <div className="flex justify-center items-center mb-4">
            <button onClick={() => prev(bottoms, setCurrentBottom, currentBottom)} className="mx-2">⬅️</button>
            {bottoms.length > 0 && (
              <img src={`http://localhost:4000/uploads/${bottoms[currentBottom].image}`} alt="Bottom"
                style={{ width: '120px', height: '140px', objectFit: 'cover', borderRadius: '6px' }} />
            )}
            <button onClick={() => next(bottoms, setCurrentBottom, currentBottom)} className="mx-2">➡️</button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mb-4">
          <button onClick={() => prev(dresses, setCurrentDress, currentDress)} className="mx-2">⬅️</button>
          {dresses.length > 0 && (
            <img src={`http://localhost:4000/uploads/${dresses[currentDress].image}`} alt="Dress"
              style={{ width: '120px', height: '140px', objectFit: 'cover', borderRadius: '6px' }} />
          )}
          <button onClick={() => next(dresses, setCurrentDress, currentDress)} className="mx-2">➡️</button>
        </div>
      )}

      <div className="flex justify-center items-center mb-4">
        <button onClick={() => prev(shoes, setCurrentShoe, currentShoe)} className="mx-2">⬅️</button>
        {shoes.length > 0 && (
          <img src={`http://localhost:4000/uploads/${shoes[currentShoe].image}`} alt="Shoes"
            style={{ width: '120px', height: '140px', objectFit: 'cover', borderRadius: '6px' }} />
        )}
        <button onClick={() => next(shoes, setCurrentShoe, currentShoe)} className="mx-2">➡️</button>
      </div>

      <input
        type="text"
        placeholder="Name your outfit"
        value={outfitName}
        onChange={(e) => setOutfitName(e.target.value)}
        className="mb-4 px-3 py-2 rounded border border-gray-300 text-white"
      />

      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Outfit
      </button>
    </div>
  );
}

