// src/components/Item.js
import React from 'react';

function Item({ item, togglePacked, deleteItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => togglePacked(item.id)}
      />
      <span style={{ textDecoration: item.packed ? 'line-through' : 'none' }}>
        {item.quantity} x {item.name}
      </span>
      <button onClick={() => deleteItem(item.id)}>x</button>
    </li>
  );
}

export default Item;
