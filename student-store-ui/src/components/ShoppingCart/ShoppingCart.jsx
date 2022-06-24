import React from "react";
import Receipt from "../Receipt/Receipt";
import "./ShoppingCart.css";

export default function ShoppingCart(props) {
  return (
    <div className="shopping-cart">
      {props.shoppingCart.length > 0 ? (
        <>
          <h3 className="shopping-header">Shopping Cart</h3>
          <div className="cart-table">
            <div className="cart-header">
              <p>Name</p>
              <p className="spacer"></p>
              <p>Quantity</p>
              <p className="spacer"></p>
              <p>Unit Price</p>
              <p className="spacer"></p>
              <p>Cost</p>
            </div>
            {props.shoppingCart?.map((item, index) => (
              <div className="product-row" key={index}>
                {item.quantity > 0 && (
                  <div className="values">
                    <p className="cart-product-name">
                      {props.getProductName(item.itemId)}
                    </p>
                    <p className="spacer"></p>
                    <p className="cart-product-quantity">{item.quantity}</p>
                    <p className="spacer-2"></p>
                    <p className="cart-product-unit-price">
                      ${props.getProductPrice(item.itemId).toFixed(2)}
                    </p>
                    <p className="spacer-3"></p>
                    <p className="cart-product-cost">
                      $
                      {props
                        .calculateCost(item.quantity, item.itemId)
                        .toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Receipt
            calculateSubtotal={props.calculateSubtotal}
            calculateTaxes={props.calculateTaxes}
            calculateTotal={props.calculateTotal}
          />
        </>
      ) : (
        <p>No items added to cart yet. Start shopping now!</p>
      )}
    </div>
  );
}
