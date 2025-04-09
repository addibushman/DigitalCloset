// File: client/src/pages/MixAndMatch.jsx
import React, { useEffect, useState } from 'react';

export default function MixAndMatch() {
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [currentTop, setCurrentTop] = useState(0);
  const [currentBottom, setCurrentBottom] = useState(0);

  useEffect(() => {
    fetch('/api/clothing')
      .then(res => res.json())
      .then(data => {
        setTops(data.filter(item => item.category === 'top'));
        setBottoms(data.filter(item => item.category === 'bottom'));
      });
  }, []);

  const nextTop = () => {
    setCurrentTop((prev) => (prev + 1) % tops.length);
  };

  const prevTop = () => {
    setCurrentTop((prev) => (prev - 1 + tops.length) % tops.length);
  };

  const nextBottom = () => {
    setCurrentBottom((prev) => (prev + 1) % bottoms.length);
  };

  const prevBottom = () => {
    setCurrentBottom((prev) => (prev - 1 + bottoms.length) % bottoms.length);
  };

  const handleSave = async () => {
    if (!tops.length || !bottoms.length) return alert("Please select both a top and a bottom.");

    const selectedTop = tops[currentTop];
    const selectedBottom = bottoms[currentBottom];

    const res = await fetch('/api/outfits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Outfit ${Date.now()}`,
        items: [selectedTop.id.toString(), selectedBottom.id.toString()]
      })
    });

    if (res.ok) {
      alert("Outfit saved!");
    } else {
      alert("Failed to save outfit.");
    }
  };

  return (
    <div className="text-center text-white">
      <h2 className="text-2xl mb-4">Mix and Match</h2>

      <div className="flex justify-center items-center mb-4">
        <button onClick={prevTop} className="mx-2">⬅️</button>
        {tops.length > 0 && (
          <img
            src={`http://localhost:4000/uploads/${tops[currentTop].image}`}
            alt="Top"
            style={{ width: '120px', height: '140px', objectFit: 'cover', borderRadius: '6px' }}
          />
        )}
        <button onClick={nextTop} className="mx-2">➡️</button>
      </div>

      <div className="flex justify-center items-center mb-4">
        <button onClick={prevBottom} className="mx-2">⬅️</button>
        {bottoms.length > 0 && (
          <img
            src={`http://localhost:4000/uploads/${bottoms[currentBottom].image}`}
            alt="Bottom"
            style={{ width: '120px', height: '140px', objectFit: 'cover', borderRadius: '6px' }}
          />
        )}
        <button onClick={nextBottom} className="mx-2">➡️</button>
      </div>

      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Outfit
      </button>
    </div>
  );
}
