import React from 'react';
import './Search.css';

export default function Search({ setSearchQuery }) {
  return (
    <input
      className="search"
      type="text"
      name="search"
      placeholder="Search"
      onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
    />
  );
}
