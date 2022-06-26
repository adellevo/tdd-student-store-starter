import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import Search from "../Search/Search";
import NotFound from "../NotFound/NotFound";
import About from "../About/About";
import Contact from "../Contact/Contact";

export default function ProductGrid({
  products,
  handleAddItemToCart,
  handleRemoveItemToCart,
  findQuantity,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredProducts = products.filter((product) => {
    if (category == "all") {
      return product.name.toLowerCase().includes(searchQuery);
    } else {
      return (
        product.category == category &&
        product.name.toLowerCase().includes(searchQuery)
      );
    }
  });

  return (
    <div className="product-grid">
      <div className="filters">
        <Search setSearchQuery={setSearchQuery} />
        <CategoryMenu setCategory={setCategory} />
      </div>
      {/* <h1 className="header">Best Selling Products</h1> */}
      <div className="product-container">
        {filteredProducts.length == 0 ? (
          <NotFound />
        ) : (
          filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              productId={product.id}
              quantity={findQuantity(product.id)}
              handleAddItemToCart={handleAddItemToCart}
              handleRemoveItemToCart={handleRemoveItemToCart}
              showDescription={false}
            />
          ))
        )}
      </div>
      <About />
      <Contact />
    </div>
  );
}
