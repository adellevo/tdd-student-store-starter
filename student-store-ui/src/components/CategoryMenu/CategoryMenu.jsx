import React from "react";

export default function CategoryMenu({ setCategory }) {
  return (
    <div className="category-menu">
      <div>
        <p onClick={() => setCategory("all")}>All Categories</p>
        <p onClick={() => setCategory("clothing")}>Clothing</p>
        <p onClick={() => setCategory("food")}>Food</p>
        <p onClick={() => setCategory("accessories")}>Accessories</p>
        <p onClick={() => setCategory("tech")}>Tech</p>
      </div>
    </div>
  );
}
