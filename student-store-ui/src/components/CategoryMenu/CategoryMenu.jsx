import React from 'react';
import './CategoryMenu.css';

export default function CategoryMenu({ setCategory }) {
  return (
    <div className="category-menu">
      <p onClick={() => setCategory('all')}>All Categories</p>
      <p onClick={() => setCategory('clothing')}>Clothing</p>
      <p onClick={() => setCategory('food')}>Food</p>
      <p onClick={() => setCategory('accessories')}>Accessories</p>
      <p onClick={() => setCategory('tech')}>Tech</p>
    </div>
  );
}
