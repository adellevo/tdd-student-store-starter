import React from "react";
import Receipt from "../Receipt/Receipt";
import "./ShoppingCart.css";

export default function ShoppingCart(props) {
  return (
    <div className="shopping-cart">
      <div className="cart-table">
        <div>
          <h3>Shopping Cart</h3>
        </div>
        <div className="header">
          <span>Name</span>
          <span>Quantity</span>
          <span>Unit Price</span>
          <span>Cost</span>
        </div>
        {props.shoppingCart?.map((item, index) => (
          <div className="product-row" key={index}>
            <div className="values">
              <span className="cart-product-name">
                {props.getProductName(item.itemId)}
              </span>
              <span className="cart-product-quantity">{item.quantity}</span>
              <span className="cart-product-unit-price">
                {props.getProductPrice(item.itemId).toFixed(2)}
              </span>
              <span className="cart-product-cost">
                {props.calculateCost(item.quantity, item.itemId).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Receipt
        calculateSubtotal={props.calculateSubtotal}
        calculateTaxes={props.calculateTaxes}
        calculateTotal={props.calculateTotal}
      />
    </div>
  );
}
