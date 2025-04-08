import React, { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log selected file for debugging
    console.log('File:', file);

    const formData = new FormData();
    formData.append('image', file);          
    formData.append('category', category);
    formData.append('color', color);

    try {
      const res = await fetch('/api/clothing', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Clothing item uploaded!');
        setFile(null);
        setCategory('');
        setColor('');
      } else {
        const error = await res.json();
        alert('Upload failed. Reason: ' + error.error); // More helpful error
        console.error('Upload failed:', error);
      }
    } catch (err) {
      alert('Upload failed due to network or server error.');
      console.error('Upload error:', err);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Upload a Clothing Item</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border p-2 rounded"
        >
          <option value="">Select a category</option>
          <option value="dress">Dress</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
        {/* <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        /> */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
}
