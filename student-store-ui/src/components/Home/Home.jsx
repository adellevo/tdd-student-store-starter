import * as React from "react";
import Hero from "../Hero/Hero";
import ProductGrid from "../ProductGrid/ProductGrid";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
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
