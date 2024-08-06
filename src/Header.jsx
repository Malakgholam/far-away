// src/Header.jsx
import React, { useState } from 'react';
import './Header.css';

function Header({ addItem }) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      addItem(quantity, name);
      setName('');
      setQuantity(1);
    }
  };

  return (
    <header className="header">
      <div className="title">
        <h1>🌴FAR AWAY👜</h1>
      </div>
      <div className="add-item">
        <p>What do you need for your 🤩 trip?  </p>
        <form onSubmit={handleSubmit}>
        <select
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          className="quantity-select"
        >
          {[...Array(100).keys()].map(i => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item..."
          />
          <button class="add-btn" type="submit">ADD</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
