import React, { useState, useEffect } from 'react';
import {
  Routes, Route, Link, useParams,
} from 'react-router-dom';
import axios from 'axios';
import ProductView from '../ProductView/ProductView';

export default function ProductDetail({
  shoppingCart,
  handleAddItemToCart,
  handleRemoveItemToCart,
  setError,
}) {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/store/${params.productId}`,
      );
      setProduct(response.data.product);
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <div className="product-detail">
      {JSON.stringify(product) === '{}' ? (
        <h1 className="loading"> Loading... </h1>
      ) : (
        <ProductView
          product={product}
          productId={params.productId}
          quantity={() => {
            const shoppingCartItem = shoppingCart.find(
              (item) => item.itemId == params.productId,
            );
            return shoppingCartItem ? shoppingCartItem.quantity : 0;
          }}
          handleAddItemToCart={handleAddItemToCart}
          handleRemoveItemToCart={handleRemoveItemToCart}
        />
      )}
    </div>
  );
}
