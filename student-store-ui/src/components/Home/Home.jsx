import * as React from "react";
import Contact from "../Contact/Contact";
import Hero from "../Hero/Hero";
import ProductGrid from "../ProductGrid/ProductGrid";
import About from "../About/About";
import "./Home.css";

export default function Home({
  products,
  handleAddItemToCart,
  handleRemoveItemToCart,
  shoppingCart,
  findQuantity,
  setProducts,
  setCategory,
  category,
}) {
  return (
    <div className="home">
      <Hero />
      <ProductGrid
        products={products}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemToCart={handleRemoveItemToCart}
        shoppingCart={shoppingCart}
        findQuantity={findQuantity}
        setProducts={setProducts}
        setCategory={setCategory}
        category={category}
      />
    </div>
  );
}
