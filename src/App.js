import React, { useState, useEffect } from 'react';
import Header from './Header';
import ItemList from './ItemList';
import './App.css';

function App() {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [sortOption, setSortOption] = useState('inputOrder');

  useEffect(() => {
    console.log('Saving items to local storage:', items);
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = (quantity, name) => {
    const newItem = { id: Date.now(), quantity, name, packed: false };
    setItems([...items, newItem]);
  };

  const togglePacked = (id) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearList = () => {
    setItems([]);
  };

  const sortItems = (option) => {
    let sortedItems = [...items];
    if (option === 'packedStatus') {
      sortedItems = sortedItems.sort((a, b) => a.packed - b.packed);
    } else if (option === 'description') {
      sortedItems = sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === 'amount') {
      sortedItems = sortedItems.sort((a, b) => b.quantity - a.quantity);
    }
    setItems(sortedItems);
  };

  const toggleSortOption = () => {
    const options = ['inputOrder', 'packedStatus', 'description', 'amount'];
    const newSortOption = options[(options.indexOf(sortOption) + 1) % options.length];
    setSortOption(newSortOption);
    sortItems(newSortOption);
  };

  const packedItemsCount = items.filter(item => item.packed).length;
  const totalItemsCount = items.length;
  const packedPercentage = totalItemsCount === 0 ? 0 : Math.round((packedItemsCount / totalItemsCount) * 100);

  return (
    <div className="App">
      <Header addItem={addItem} />
      <div className="list-container">
        <ItemList items={items} togglePacked={togglePacked} deleteItem={deleteItem} />
        <div className="footer">
          <button onClick={toggleSortOption}>
            Sort by {sortOption === 'inputOrder' ? 'Packed Status' : sortOption === 'packedStatus' ? 'Description' : sortOption === 'description' ? 'Amount' : 'Input Order'}
          </button>
          <button onClick={clearList}>Clear List</button>
        </div>
        <div className="status-message">
          {totalItemsCount === 0
            ? "Start adding some items to your packing list🚀"
            : `💼You have ${totalItemsCount} items in your list, and you already packed ${packedItemsCount} (${packedPercentage}%)`}
        </div>
      </div>
    </div>
  );
}

export default App;
