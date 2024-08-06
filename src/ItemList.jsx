// src/ItemList.jsx
import React from 'react';
import './ItemList.css';

function ItemList({ items, togglePacked, deleteItem }) {
  return (
    <div className="item-list">
      {items.map(item => (
        <div key={item.id} className="item">
          <input
            type="checkbox"
            checked={item.packed}
            onChange={() => togglePacked(item.id)}
          />
          <span className={`item-name ${item.packed ? 'packed' : ''}`}>
            {item.quantity} x {item.name}
          </span>
          <button onClick={() => deleteItem(item.id)} className="delete-button">x</button>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
